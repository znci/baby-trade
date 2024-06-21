import { updateClock } from "./game/clock";
import { loadEventHistory, updateEvents } from "./game/events";
import { variables } from "./game/gameStore";
import { loadData } from "./game/saving";

let timeScale = 1;

console.log(`starting game loop...`);

loadData().then((data) => {
  console.log(`loaded game data`, data);
  loadEventHistory();
});
  
function gameLoop(timestamp: number) {
  variables.delta += (timestamp - variables.lastTime) * timeScale; // Multiply by timeScale
  variables.lastTime = timestamp;

  while (variables.delta >= 1000 / variables.ticksPerSecond) {
    variables.tick++;
    variables.delta -= 1000 / variables.ticksPerSecond;
  }

  if (timestamp - variables.lastFPSTime >= 1000) {
    variables.fps = variables.fpsTick;
    variables.fpsTick = 0;
    variables.lastFPSTime = timestamp;
  }

  variables.fpsTick++;

  // console.log(`tick: ${tick}, fps: ${fps}`);

  if (timestamp - variables.lastUpdate >= 1000 * timeScale) { // Multiply by timeScale
    update();
    variables.lastUpdate = timestamp;
  }

  requestAnimationFrame(gameLoop);
}

function update(/*timestamp: number*/) {
  if (variables.updating) {
    return;
  }
  variables.updating = true;
  
  updateClock();
  updateEvents();
  
  variables.updating = false;
}

requestAnimationFrame(gameLoop);