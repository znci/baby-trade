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

let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export let sharedState = {
  balance: 1000,
  babies: [],
  clockSeconds,
  clockMinutes,
  clockHours,
  clockDay,
  clockMonth,
  timeScale,
  timeOfDay,
  newDay,
  alreadyNewDay
};

export let variables = {
  lastTime,
  delta,
  fps,
  fpsTick,
  lastFPSTime,
  ticksPerSecond,
  tick,
  lastUpdate,
  updating,
  lastNewsEvent,
  newsEventInterval,
  monthDays
}