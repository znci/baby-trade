
export function newBabyMenu() {
  const element = document.createElement('div');
  element.classList.add('baby-menu');
  element.innerHTML = `
    <div class="baby-menu secondary"></div>
    <div class="baby-menu__header">
      <div class="baby-menu__rarity">Rare</div>
      <div class="baby-menu__name">Artemis</div>
    </div>

    <div class="baby-menu__description">
      Artie is a real cutie from the outside!
      But his parents have quickly learned that he stinks...
      Real bad. He's smart and youthful, but can't make himself many
      social connections because of his scent.
    </div>

    <div class="baby-menu__stats">
      <h2>Stats</h2>
      <div class="baby-menu__stat">
        <div class="baby-menu__stat-name">Personality</div>
        <div class="baby-menu__stat-value">66</div>
      </div>
      <div class="baby-menu__stat">
        <div class="baby-menu__stat-name">Social Ability</div>
        <div class="baby-menu__stat-value">5</div>
      </div>
      <div class="baby-menu__stat">
        <div class="baby-menu__stat-name">Intelligence</div>
        <div class="baby-menu__stat-value">78</div>
      </div>
      <div class="baby-menu__stat">
        <div class="baby-menu__stat-name">Early Learning Score:tm:</div>
        <div class="baby-menu__stat-value">94</div>
      </div>
    </div>

    <div class="baby-menu__actions">
      <a href="#" class="button large baby-menu__action baby-menu__action--buy">Adopt</a>
      <a href="#" class="button large red baby-menu__action baby-menu__action--close">Neglect</a>
    </div>
    <small class="center" style="padding-top: 8px">
      Pick fast! This baby is in high demand!
    </small>
  `;

  document.body.appendChild(element);
}

newBabyMenu();