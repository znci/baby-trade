import { getClockDateFormattedShort, getClockTimeFormatted, isNewHour } from "./clock";
import { sharedState } from "./gameStore";
import { saveData } from "./saving";

let loaded = false;

// collapse this to avoid mental damage
let events = [
  {
    id: 1,
    title: "A global pandemic has caused a baby shortage. Prices are expected to rise.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 2,
    title: "Governments announce a halt to imported goods, making babies 150% more valuable and more in demand.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 3,
    title: "Abortion bans have been put into place. Babies are now becoming less valuable.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 4,
    title: "Following the start of League of Legends Season 14, babies have become 2.5x rarer.",
    type: "news",
    impact: "positive",
    impact_strength: 2.5, // 2.5x
  },
  {
    id: 5,
    title: "GTA6 has been released. All the dads are in their mancaves and more babies are up for sale. Prices are being lowered.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 6,
    title: "National Bubble Blowing Extravaganza! Communities come together for bubble-blowing festivals, raising funds for environmental causes.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 7,
    title: "Elon Musk names another kid after a math formula. Prices expected to rise.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 8,
    title: "Elon Musk just said that babies are cringe. Market expected to drop.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 9,
    title: "Terrorist attack on the NYC Subway kills Baby Market Bell Ringer. Market expected to drop.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 10,
    title: "A new reality TV show about parenting has sparked interest in babies. Prices are expected to rise.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 11,
    title: "A popular celebrity couple has announced they're expecting twins. This has increased the demand for babies.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 12,
    title: "A new study shows that babies can be a lot of work, causing a decrease in demand.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 13,
    title: "A new government policy provides significant tax benefits for families with babies, increasing demand.",
    type: "news",
    impact: "positive",
    impact_strength: 2.0, // 2.0x
  },
  {
    id: 14,
    title: "A popular sci-fi movie has caused a surge in robot baby popularity, decreasing the demand for human babies.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 15,
    title: "A breakthrough in baby food nutrition has made raising babies easier, increasing demand.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 16,
    title: "A new trend of 'baby-free' lifestyle is gaining popularity, causing a decrease in demand.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 17,
    title: "A famous influencer has started a trend of 'baby yoga', causing an increase in demand.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 18,
    title: "A new law has been passed that provides free childcare for working parents, causing an increase in demand.",
    type: "news",
    impact: "positive",
    impact_strength: 2.0, // 2.0x
  },
  {
    id: 19,
    title: "A major company has announced a new line of baby products, causing an increase in demand.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 20,
    title: "A new study shows that babies can cause sleep deprivation, causing a decrease in demand.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 21,
    title: "A popular TV show has portrayed babies in a negative light, causing a decrease in demand.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 22,
    title: "A new viral video of a baby laughing has increased the demand for babies.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 23,
    title: "A new study shows that having a baby can improve mental health, causing an increase in demand.",
    type: "news",
    impact: "positive",
    impact_strength: 2.0, // 2.0x
  },
  {
    id: 24,
    title: "A popular celebrity has announced they do not want children, causing a decrease in demand.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 25,
    title: "A new government policy has made adoption easier, causing an increase in demand for babies.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  },
  {
    id: 26,
    title: "A new trend of 'fur babies' has caused a decrease in demand for human babies.",
    type: "news",
    impact: "negative",
    impact_strength: 0.5, // 0.5x
  },
  {
    id: 27,
    title: "A new study shows that babies can boost creativity, causing an increase in demand.",
    type: "news",
    impact: "positive",
    impact_strength: 1.5, // 1.5x
  }
]

export function updateEvents() {
  const newsBox = document.querySelector(".js-news-box");

  const newDaySplit = document.createElement("div");
  
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  const newsItem = document.createElement("div");
  newsItem.classList.add("news-item");
  
  newsItem.innerHTML = `
    <span class="news-time">[${getClockTimeFormatted(sharedState.clockHours, sharedState.clockMinutes)}]</span>
    <span class="news-content">
      ${randomEvent.title}
    </span>
  `;

  if (sharedState.newDay) {
    newDaySplit.classList.add("news-splitter");
    newDaySplit.textContent = getClockDateFormattedShort(sharedState.clockMonth, sharedState.clockDay);
    newsBox?.appendChild(newDaySplit);
    newsBox?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    newsBox?.appendChild(newsItem);
    newsItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
    sharedState.newsList.push({
      hour: sharedState.clockHours,
      minute: sharedState.clockMinutes,
      day: sharedState.clockDay,
      month: sharedState.clockMonth,
      time: getClockTimeFormatted(sharedState.clockHours, sharedState.clockMinutes),
      title: randomEvent.title,
      newDay: true
    });
    sharedState.newDay = false;

    saveData();
    return;
  }

  if(!isNewHour()) return;

  const random = Math.floor(Math.random() * 100);

  if (random < 4) {
    newsBox?.appendChild(newsItem);
    newsItem.scrollIntoView({ behavior: 'smooth', block: 'end' });

    sharedState.newsList.push({
      hour: sharedState.clockHours,
      minute: sharedState.clockMinutes,
      day: sharedState.clockDay,
      month: sharedState.clockMonth,
      time: getClockTimeFormatted(sharedState.clockHours, sharedState.clockMinutes),
      title: randomEvent.title
    });
    saveData();
  }
}

export function loadEventHistory() {

  if(loaded) return;

  const list = sharedState.newsList;
  const newsBox = document.querySelector(".js-news-box");
  
  list.forEach((item) => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.innerHTML = `
      <span class="news-time">[${item.time}]</span>
      <span class="news-content">
        ${item.title}
      </span>
    `;
    if (item.newDay) {
      const newDaySplit = document.createElement("div");
      newDaySplit.classList.add("news-splitter");
      newDaySplit.textContent = getClockDateFormattedShort(item.month, item.day);
      newsBox?.appendChild(newDaySplit);
    }
    newsBox?.appendChild(newsItem);
  });

  setTimeout(() => {
    newsBox?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 100);
}