console.log(`starting game loop...`);

let lastTime = 0;
let delta = 0;
let fps = 0;
let fpsTick = 0;
let lastFPSTime = 0;
let ticksPerSecond = 20; // the number of times per second the game should update
let tick = 0;
let lastUpdate = 0;
let updating = false;

let lastNewsEvent = 0;
let newsEventInterval = 1000 * 60 * 5; // 5 minutes

// Ingame clock

let clockSeconds = 0;
let clockMinutes = 0;
let clockHours = 0;
let clockDay = 0; // day of the month
let clockMonth = 0; // month

let timeScale = 12;

let timeOfDay = "day";
let newDay = false;
let alreadyNewDay = false;

function getClockTime() {
  return `${clockHours}:${clockMinutes}`;
}

function getClockTimeFormatted(clockHours: number, clockMinutes: number) {
  // AM/PM
  let hours = clockHours;
  let minutes = clockMinutes;
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // pad
  let minutesStr = minutes.toString();
  if (minutesStr.length < 2) {
    minutesStr = "0" + minutesStr;
  }
  minutes = parseInt(minutesStr);

  let hoursStr = hours.toString();
  if (hoursStr.length < 2) {
    hoursStr = "0" + hoursStr;
  }
  hours = parseInt(hoursStr);

  let strTime = `${hoursStr}:${minutesStr} ${ampm}`;

  return strTime;
}

function getClockDate() {
  return `${clockMonth}/${clockDay}`;
}

function getClockDateFormatted(clockMonth: number, clockDay: number) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${monthNames[clockMonth]}/${clockDay}`;
}

function getClockDateFormattedShort(clockMonth: number, clockDay: number, reverse: boolean = false) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if (reverse) {
    return `${monthNames[clockMonth]} ${clockDay + 1}`
  }
  return `${clockDay + 1} ${monthNames[clockMonth]}`;
}

// time utils

function isNewMinute() {
  return clockSeconds === 0;
}

function isNewHour() {
  return clockMinutes === 0 && isNewMinute();
}

function isNewDay() {
  return clockHours === 0 && isNewHour();
}

function isNewMonth() {
  return clockDay === 0 && isNewDay();
}

function isMorning() {
  return clockHours >= 6 && clockHours < 12;
}

function isAfternoon() {
  return clockHours >= 12 && clockHours < 18;
}

function isEvening() {
  return clockHours >= 18 && clockHours < 20;
}

function isNight() {
  return clockHours >= 20 || clockHours < 6;
}

const clockDate = document.querySelector(".js-clock-date") as HTMLDivElement;
const clockTime = document.querySelector(".js-clock-time") as HTMLDivElement;

function gameLoop(timestamp: number) {
  delta += timestamp - lastTime;
  lastTime = timestamp;

  while (delta >= 1000 / ticksPerSecond) {
    tick++;
    delta -= 1000 / ticksPerSecond;
  }

  if (timestamp - lastFPSTime >= 1000) {
    fps = fpsTick;
    fpsTick = 0;
    lastFPSTime = timestamp;
  }

  fpsTick++;

  // console.log(`tick: ${tick}, fps: ${fps}`);

  if (timestamp - lastUpdate >= 1000) {
    update(timestamp);
    lastUpdate = timestamp;
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function update(timestamp: number) {
  if (updating) {
    return;
  }
  updating = true;

  updateClock();
  updateEvents();

  updating = false;
}

let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function updateClock() {
  clockMinutes += 5 * timeScale;
  if (clockSeconds >= 60) {
    clockSeconds = 0;
    clockMinutes++;
  }

  if (clockMinutes >= 60) {
    clockMinutes = 0;
    clockHours++;
  }

  if (clockHours >= 24) {
    clockHours = 0;
    clockDay++;
  }

  if (clockDay >= monthDays[clockMonth]) {
    clockDay = 0;
    clockMonth++;
  }

  if (clockMonth >= 12) {
    clockMonth = 0;
  }

  // time of day
  if (clockHours >= 6 && clockHours < 18) {
    timeOfDay = "day";
  } else {
    timeOfDay = "night";
  }
  if (clockHours >= 18 && clockHours < 20) {
    timeOfDay = "evening";
  }

  // new day

  console.log(`new day: ${newDay}`);
  
  if (clockHours === 0 && clockMinutes === 0) {
    alreadyNewDay = false;
  }
  if (clockHours <= 6 && clockMinutes <= 5 * timeScale && !alreadyNewDay) {
    newDay = true;
    alreadyNewDay = true;
  } else {
    newDay = false;
  }

  console.log(`time of day: ${timeOfDay}`);
  

  clockDate.textContent = getClockDateFormattedShort(clockMonth, clockDay);
  clockTime.textContent = getClockTimeFormatted(clockHours, clockMinutes);

}

// News & events kill me

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

function updateEvents() {
  const newsBox = document.querySelector(".js-news-box");

  const newDaySplit = document.createElement("div");
  
  if (newDay) {
    newDaySplit.classList.add("news-splitter");
    newDaySplit.textContent = getClockDateFormattedShort(clockMonth, clockDay);
    newsBox?.appendChild(newDaySplit);
    newDay = false;
    return;
  }

  if(!isNewHour()) return;

  const randomEvent = events[Math.floor(Math.random() * events.length)];
  const newsItem = document.createElement("div");
  newsItem.classList.add("news-item");
  newsItem.innerHTML = `
    <span class="news-time">[${getClockTimeFormatted(clockHours, clockMinutes)}]</span>
    <span class="news-content">
      ${randomEvent.title}
    </span>
  `;

  newsBox?.appendChild(newsItem);
  newsItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
}