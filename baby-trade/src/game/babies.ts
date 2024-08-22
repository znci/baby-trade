import { capitalizeFirstLetter, stringToRegex } from "./utils";

export function newBabyMenu(info: BabyInfo) {
  
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("color-" + info.rarity.toLowerCase());
  document.body.appendChild(overlay);
  
  const element = document.createElement('div');
  element.classList.add('baby-menu');
  element.classList.add('rarity-' + info.rarity.toLowerCase())
  
  let formattedDescription = info.description;
  formattedDescription = formattedDescription.replace(stringToRegex("{{ preferredNickname }}"), info.preferredNickname);
  formattedDescription = formattedDescription.replace(stringToRegex("{{ genderSelectors['s/he'] }}"), info.genderSelectors["s/he"]);
  formattedDescription = formattedDescription.replace(stringToRegex("{{ capitalGenderSelectors['s/he'] }}"), capitalizeFirstLetter(info.genderSelectors["s/he"]));
  formattedDescription = formattedDescription.replace(stringToRegex("{{ genderSelectors['him/her'] }}"), info.genderSelectors["him/her"]);
  formattedDescription = formattedDescription.replace(stringToRegex("{{ capitalGenderSelectors['him/her'] }}"), capitalizeFirstLetter(info.genderSelectors["him/her"]));
  formattedDescription = formattedDescription.replace(stringToRegex("{{ genderSelectors['his/her'] }}"), info.genderSelectors["his/her"]);
  formattedDescription = formattedDescription.replace(stringToRegex("{{ capitalGenderSelectors['his/her'] }}"), capitalizeFirstLetter(info.genderSelectors["his/her"]));
  

  element.innerHTML = `
    <div class="baby-menu secondary"></div>
    <div class="baby-menu primary">
      <div class="baby-menu__header">
        <div class="baby-menu__rarity">
          <span class="tag ${info.rarity.toLowerCase()}">${info.rarity}</span> 
          <span class="tag ${info.gender}">${info.gender}</span>
        </div>
        <div class="baby-menu__name">${info.name}</div>
      </div>
  
      <div class="baby-menu__description">
        ${formattedDescription}
      </div>
      
      <div class="baby-menu__stats">
        <h2>Stats</h2>
        <div class="baby-menu__stats_card">
          <div class="baby-menu__stat">
            <div class="baby-menu__stat-name">Personality</div>
            <div class="baby-menu__stat-value">
              <span class="tag white">${info.stats.personality}</span>
            </div>
          </div>
          <div class="baby-menu__stat">
            <div class="baby-menu__stat-name">Social Ability</div>
            <div class="baby-menu__stat-value">
              <span class="tag white">${info.stats.socialAbility}</span>
            </div>
          </div>
          <div class="baby-menu__stat">
            <div class="baby-menu__stat-name">Intelligence</div>
            <div class="baby-menu__stat-value">
              <span class="tag white">${info.stats.intelligence}</span>
            </div>
          </div>
          <div class="baby-menu__stat">
            <div class="baby-menu__stat-name">Early Learning Score™️</div>
            <div class="baby-menu__stat-value">
              <span class="tag white">${info.stats.earlyLearningScore}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="baby-menu__actions">
        <a href="#" class="button large baby-menu__action baby-menu__action--buy">Adopt</a>
        <a href="#" class="button large red baby-menu__action baby-menu__action--close">Neglect</a>
      </div>
      
      ${info.inDemand ? `
        <small class="center" style="padding-top: 8px;">
          <span class="tag red">Pick Fast!</span> <span>This baby is in high demand!</span>
        </small>
      ` : ""}

    </div>
  `;

  document.body.appendChild(element);
}


export type Rarity = "COMMON" | "RARE" | "PRISTINE"

export const Chances: Record<string, number> = {
  COMMON: 0.65,
  RARE: 0.2,
  PRISTINE: 0.15,
  
  IN_DEMAND: 0.2, // 20% chance of being in demand
}

export const Bonuses: Record<string, number> = {
  COMMON: 1, // no increase in value
  RARE: 1.5, // 50% increase in value
  PRISTINE: 2, // 100% increase in value

  IN_DEMAND: 1.5, // 50% increase in value
}

export interface BabyInfo {
  name: string,
  rarity: Rarity,
  rarityBonus: number,
  description: string,
  nicknames: string[],
  preferredNicknames: string[],
  preferredNickname: string,
  stats: {
    score: number,
    personality: number,
    socialAbility: number,
    intelligence: number,
    earlyLearningScore: number,
  },
  inDemand: boolean,
  inDemandChance: number,
  gender: "male" | "female",
  genderSelectors: Record<string, string>,
}

export interface BabyConfig {
  name: string,
  nicknames: string[],
  gender: "male" | "female";
}
export const Babies: BabyConfig[] = [
  {
    name: "Artemis",
    nicknames: ["Artie", "Artemis", "Arty"],
    gender: "female",
  },
  {
    name: "Bella",
    nicknames: ["Bella", "Belle", "Bell"],
    gender: "female",
  },
  {
    name: "Charlie",
    nicknames: ["Charlie", "Chuck"],
    gender: "male",
  },
  {
    name: "Daisy",
    nicknames: ["Daisy", "Daze"],
    gender: "female",
  },
  {
    name: "Ethan",
    nicknames: ["Ethan", "E"],
    gender: "male",
  },
  {
    name: "Fiona",
    nicknames: ["Fiona", "Fio"],
    gender: "female",
  },
  {
    name: "Gabriel",
    nicknames: ["Gabe", "Gabby", "Gab"],
    gender: "male",
  },
  {
    name: "Hannah",
    nicknames: ["Hannah", "Han", "Hanny"],
    gender: "female",
  },
  {
    name: "Isabella",
    nicknames: ["Izzy", "Bella", "Isa"],
    gender: "female",
  },
  {
    name: "Jackson",
    nicknames: ["Jack", "Jax", "Jackie"],
    gender: "male",
  },
  {
    name: "Katherine",
    nicknames: ["Kate", "Katie", "Kat"],
    gender: "female",
  },
  {
    name: "Liam",
    nicknames: ["Liam", "Lee", "L"],
    gender: "male",
  },
  {
    name: "Madeline",
    nicknames: ["Maddie", "Mads", "Lina"],
    gender: "female",
  },
  {
    name: "Nathaniel",
    nicknames: ["Nate", "Nathan", "Nat"],
    gender: "male",
  },
  {
    name: "Penelope",
    nicknames: ["Penny", "Nell", "P"],
    gender: "female",
  },
  {
    name: "Quentin",
    nicknames: ["Quinn", "Q", "Quent"],
    gender: "male",
  },
  {
    name: "Rebecca",
    nicknames: ["Becky", "Becca", "Bex"],
    gender: "female",
  },
  {
    name: "Theodore",
    nicknames: ["Theo", "Teddy", "Ted"],
    gender: "male",
  },
  {
    name: "Victoria",
    nicknames: ["Vicky", "Tori", "Vic"],
    gender: "female",
  },
  {
    name: "Xavier",
    nicknames: ["X", "Xavi", "X-Man"],
    gender: "male",
  },
  {
    name: "Yasmine",
    nicknames: ["Yas", "Mina", "Yazzy"],
    gender: "female",
  },
  {
    name: "Zachary",
    nicknames: ["Zach", "Zack", "Z"],
    gender: "male",
  },
];

export const Attributes = ["CUTE", "SMART", "SOCIAL", "STINKY"]
export type Attributes = "CUTE" | "SMART" | "SOCIAL" | "STINKY"

export interface DescriptionSnippets {
  [key: string]: DescriptionSnippet[],
}
export interface DescriptionSnippet {
  text: string,
  positive: boolean,
}

export const DescriptionSnippets: DescriptionSnippets = {
  CUTE: [
    { text: "{{ preferredNickname }} is a real cutie from the outside!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s is a real cutie, but can be a bit of a handful at times!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }} is a real cutie, but can be a bit of a handful!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }} is cute, but can be trouble!", positive: true },
  ],
  SMART: [
    { text: "{{ preferredNickname }} is a real smart cookie!", positive: true },
    { text: "{{ preferredNickname }} is a real smart cookie, learning new things every day!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real smart cookie!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real smart cookie, learning new things every day!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real smart cookie, ambitious to learn new things every day!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real smart cookie, ambitious to learn new things.", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real smart cookie, ambitious to learn new things all the time!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }} is smart, but can be annoying!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s smart, and can be a bit of a know-it-all!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s smart, but can be a bit of a know-it-all! {{ capitalGenderSelectors['s/he'] }}'s always right!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s smart, but can be a bit of a know-it-all! {{ preferredNickname }}'s never wrong!", positive: true },
  ],
  SOCIAL: [
    { text: "{{ preferredNickname }} is a real social butterfly!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real social butterfly!", positive: true },
    { text: "{{ preferredNickname }} is a real social butterfly, making friends wherever {{ genderSelectors['s/he'] }} goes!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real social butterfly, making friends wherever {{ genderSelectors['s/he'] }} goes!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }} is a real social butterfly, making friends wherever {{ genderSelectors['s/he'] }} goes!", positive: true },
    { text: "{{ capitalGenderSelectors['s/he'] }} is social, but can be an attention hog!", positive: true },
  ],
  STINKY: [
    { text: "{{ preferredNickname }} is a stinker!", positive: false },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a stinker!", positive: false },
    { text: "{{ preferredNickname }} is a real stinker, making a mess wherever!", positive: false },
    { text: "{{ capitalGenderSelectors['s/he'] }}'s a real stinker, making a mess wherever {{ genderSelectors['s/he'] }} goes!", positive: false },
    { text: "{{ capitalGenderSelectors['s/he'] }} is stinky, and a bit of a troublemaker!", positive: false },
    { text: "{{ capitalGenderSelectors['s/he'] }} is stinky, and a bit of a troublemaker! {{ capitalGenderSelectors['s/he'] }}'s always causing problems!", positive: false },
    { text: "{{ capitalGenderSelectors['his/her'] }} parents have quickly learned that {{ genderSelectors['s/he'] }} stinks... Real bad.", positive: false },
    { text: "{{ capitalGenderSelectors['his/her'] }} parents have quickly learned that {{ genderSelectors['s/he'] }} stinks...", positive: false },
    { text: "{{ capitalGenderSelectors['his/her'] }} parents have learned that {{ genderSelectors['s/he'] }} stinks...", positive: false },
  ],
}

// generate a random number at a specific length
function randomNumber(length: number): number {
  return Math.floor(Math.random() * Math.pow(10, length));
}

function randomBaby(code: string = "") {
  
  let babyInfo: Partial<BabyInfo> = {};
  if (code !== "") {
    // convert from base64
    code = atob(code);
    // convert from string
    let newCode = JSON.parse(code) as BabyInfo;

    console.log(`Baby Code: `, code);

    babyInfo = {
      name: newCode.name,
      rarity: newCode.rarity,
      rarityBonus: newCode.rarityBonus,
      description: newCode.description,
      nicknames: [],
      preferredNicknames: [],
      preferredNickname: "",
      stats: newCode.stats,
      inDemand: newCode.inDemand,
      inDemandChance: newCode.inDemandChance,

      gender: newCode.gender,
      genderSelectors: newCode.genderSelectors,
    }
  } else {
    let babyFloat = randomNumber(16);

    // split the float every 2 digits
    const babyFloatArray: any = babyFloat.toString().match(/.{1,2}/g);

    babyFloatArray.forEach((element: any, index: number) => {
      babyFloatArray[index] = parseInt(element);
    });

    console.log(`Baby Float: `, babyFloat, babyFloatArray);
    
    //* Choose a random name
    const randomBaby = Babies[Math.floor(Math.random() * Babies.length)];

    //* Choose a random rarity
    const rarity = Math.random();
    let rarityType: Rarity = "COMMON";
    if (rarity < Chances.RARE) {
      rarityType = "RARE";
    } if (rarity < Chances.PRISTINE) {
      rarityType = "PRISTINE";
    }

    //* Choose 3 random attributes
    const randomAttributes = Attributes.sort(() => Math.random() - 0.5).slice(0, 3);

    //* Choose 3 random preferred nicknames (only if there is more than 3 nicknames)
    let preferredNicknames: string[] = [];
    if (randomBaby.nicknames.length > 3) {
      preferredNicknames = randomBaby.nicknames.sort(() => Math.random() - 0.5).slice(0, 3);
    } else {
      preferredNicknames = randomBaby.nicknames;
    }

    const genderOperator = randomBaby.gender === "male";
    const genderSelectors = {
      "s/he": genderOperator ? "he" : "she",
      "him/her": genderOperator ? "him" : "her",
      "his/her": genderOperator ? "his" : "her",
      "his/hers": genderOperator ? "his" : "hers",
    }

    //* time to generate the description!!!
    let description = "";

    //* Use the randomAttributes to select 1 random description snippet
    let snippetsSoFar: { [key: string]: DescriptionSnippet } = {};

    let snippetIndex = 0;
    const snippets = randomAttributes.map((attribute) => {
      const snippet = DescriptionSnippets[attribute as Attributes];
      const currentSnippet = snippet[Math.floor(Math.random() * snippet.length)];

      snippetsSoFar[attribute] = currentSnippet;

      let snippetText = currentSnippet.text;
      
      snippetIndex++;
      return snippetText;
    });

    //* Join the snippets together
    description = snippets.join(" ");

    const inDemandNumber = babyFloatArray[1] + babyFloatArray[2] + babyFloatArray[3] + babyFloatArray[4];
    const inDemandChance = (inDemandNumber / Bonuses[rarityType]);

    // Create stats (personality, social ability, intelligence, early learning score) based on score
    // Score is based on rarity, in demand, and attributes and randomness

    let score = ((babyFloatArray[0]) / 100) * Bonuses[rarityType] / inDemandChance;
    const personalityScore = Math.floor(babyFloatArray[1] + 1 * score);
    const socialAbilityScore = Math.floor(babyFloatArray[2] + 1 * score);
    const intelligenceScore = Math.floor(babyFloatArray[3] + 1 * score);
    const earlyLearningScore = Math.floor(babyFloatArray[4] + 1 * score);

    console.log(`Score: `, score);
    console.log(`Personality: `, personalityScore);
    console.log(`Social Ability: `, socialAbilityScore);
    console.log(`Intelligence: `, intelligenceScore);
    console.log(`Early Learning Score: `, earlyLearningScore);
    babyInfo = {
      name: randomBaby.name,
      rarity: rarityType,
      rarityBonus: Bonuses[rarityType],
      description: description,
      nicknames: randomBaby.nicknames,
      preferredNicknames: preferredNicknames,
      preferredNickname: preferredNicknames[0],
      stats: {
        score: score,
        personality: personalityScore,
        socialAbility: socialAbilityScore,
        intelligence: intelligenceScore,
        earlyLearningScore: earlyLearningScore,
      },
      inDemand: inDemandChance < Chances.IN_DEMAND,
      inDemandChance: inDemandChance,
  
      gender: randomBaby.gender,
      genderSelectors: genderSelectors,
    }
  }
  
  let babyCode = {
    name: babyInfo.name,
    rarity: babyInfo.rarity,
    rarityBonus: babyInfo.rarityBonus,
    description: babyInfo.description,
    preferredNickname: babyInfo.preferredNickname,
    stats: babyInfo.stats,
    inDemand: babyInfo.inDemand,
    inDemandChance: babyInfo.inDemandChance,

    gender: babyInfo.gender,
    genderSelectors: babyInfo.genderSelectors,
  };

  let babyCodeString = JSON.stringify(babyCode);
  // convert to base64
  babyCodeString = btoa(babyCodeString);

  console.log(`Baby Info: `, babyInfo);
  console.log(`Baby Code: `, babyCodeString);

  newBabyMenu(babyInfo as BabyInfo);
}

// randomBaby("eyJuYW1lIjoiR2FicmllbCIsInJhcml0eSI6IkNPTU1PTiIsInJhcml0eUJvbnVzIjoxLCJkZXNjcmlwdGlvbiI6Int7IGNhcGl0YWxHZW5kZXJTZWxlY3RvcnNbJ3MvaGUnXSB9fSdzIHNtYXJ0LCBidXQgY2FuIGJlIGEgYml0IG9mIGEga25vdy1pdC1hbGwhIHt7IGNhcGl0YWxHZW5kZXJTZWxlY3RvcnNbJ3MvaGUnXSB9fSdzIGFsd2F5cyByaWdodCEge3sgY2FwaXRhbEdlbmRlclNlbGVjdG9yc1sncy9oZSddIH19IGlzIGN1dGUsIGJ1dCBjYW4gYmUgdHJvdWJsZSEge3sgcHJlZmVycmVkTmlja25hbWUgfX0gaXMgYSByZWFsIHNvY2lhbCBidXR0ZXJmbHkhIiwicHJlZmVycmVkTmlja25hbWUiOiJHYWJlIiwic3RhdHMiOnsic2NvcmUiOjAuMDAxMTU4OTQwMzk3MzUwOTkzMywicGVyc29uYWxpdHkiOjYwLCJzb2NpYWxBYmlsaXR5Ijo4MiwiaW50ZWxsaWdlbmNlIjo4MiwiZWFybHlMZWFybmluZ1Njb3JlIjo3OH0sImluRGVtYW5kIjpmYWxzZSwiaW5EZW1hbmRDaGFuY2UiOjMwMn0=");
randomBaby();
// randomBaby("eyJuYW1lIjoiQ2hhcmxpZSIsInJhcml0eSI6IkNPTU1PTiIsInJhcml0eUJvbnVzIjoxLCJkZXNjcmlwdGlvbiI6Int7IGNhcGl0YWxHZW5kZXJTZWxlY3RvcnNbJ3MvaGUnXSB9fSdzIGlzIGEgcmVhbCBjdXRpZSwgYnV0IGNhbiBiZSBhIGJpdCBvZiBhIGhhbmRmdWwgYXQgdGltZXMhIHt7IHByZWZlcnJlZE5pY2tuYW1lIH19IGlzIGEgcmVhbCBzbWFydCBjb29raWUhIHt7IHByZWZlcnJlZE5pY2tuYW1lIH19IGlzIGEgc3RpbmtlciEiLCJwcmVmZXJyZWROaWNrbmFtZSI6IkNoYXJsaWUiLCJzdGF0cyI6eyJzY29yZSI6MC4wMDY0LCJwZXJzb25hbGl0eSI6Nywic29jaWFsQWJpbGl0eSI6MywiaW50ZWxsaWdlbmNlIjo2OCwiZWFybHlMZWFybmluZ1Njb3JlIjo0N30sImluRGVtYW5kIjpmYWxzZSwiaW5EZW1hbmRDaGFuY2UiOjEyNSwiZ2VuZGVyIjoibWFsZSIsImdlbmRlclNlbGVjdG9ycyI6eyJzL2hlIjoiaGUiLCJoaW0vaGVyIjoiaGltIiwiaGlzL2hlciI6ImhpcyIsImhpcy9oZXJzIjoiaGlzIn19")