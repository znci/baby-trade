

export type Rarity = "COMMON" | "RARE" | "PRISTINE"

export interface BabyInfo {
  name: string,
  rarity: Rarity,
  description: string,
  nicknames: string[],
  preferredNicknames: string[],
  preferredNickname: string,
  stats: {
    personality: number,
    socialAbility: number,
    intelligence: number,
    earlyLearningScore: number,
  },
  inDemand: boolean,
}

export function newBabyMenu(info: BabyInfo) {

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("color-" + info.rarity.toLowerCase());
  document.body.appendChild(overlay);

  const element = document.createElement('div');
  element.classList.add('baby-menu');
  element.classList.add('rarity-' + info.rarity.toLowerCase())

  element.innerHTML = `
    <div class="baby-menu secondary"></div>
    <div class="baby-menu primary">
      <div class="baby-menu__header">
        <div class="baby-menu__rarity">
          <span class="tag ${info.rarity.toLowerCase()}">${info.rarity}</span> 
        </div>
        <div class="baby-menu__name">${info.name}</div>
      </div>

      <div class="baby-menu__description">
        ${info.description
          .replace("{{ preferredNickname }}", info.preferredNickname)
        }
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
      <small class="center" style="padding-top: 8px;">
        <span class="tag red">Pick Fast!</span> <span>This baby is in high demand!</span>
      </small>
    </div>
  `;

  document.body.appendChild(element);
}

newBabyMenu({
  name: "Artemis",
  rarity: "PRISTINE",
  description: "{{ preferredNickname }} is a real cutie from the outside! But his parents have quickly learned that he stinks... Real bad. He's smart and youthful, but can't make himself many social connections because of his scent.",
  nicknames: ["Artie", "Artemis", "Arty"],
  preferredNicknames: ["Artie"],
  preferredNickname: "Artie",
  stats: {
    personality: 66,
    socialAbility: 5,
    intelligence: 78,
    earlyLearningScore: 94,
  },
  inDemand: true,
});