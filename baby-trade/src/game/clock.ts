import { sharedState, variables } from "./gameStore";
import { saveData } from "./saving";

let clockDate: HTMLDivElement;
let clockTime: HTMLDivElement;
let clockImage: HTMLImageElement;
document.addEventListener("DOMContentLoaded", () => {
  clockDate = document.querySelector(".js-clock-date") as HTMLDivElement;
  clockTime = document.querySelector(".js-clock-time") as HTMLDivElement;
  clockImage = document.querySelector(".js-clock-image") as HTMLImageElement;
}); 

const clockAssets = "/src/assets/sprites/clock";

export function updateClock() {
  sharedState.clockMinutes += 5 * sharedState.timeScale;
  if (sharedState.clockSeconds >= 60) {
    sharedState.clockSeconds = 0;
    sharedState.clockMinutes++;
  }

  if (sharedState.clockMinutes >= 60) {
    sharedState.clockMinutes = 0;
    sharedState.clockHours++;
  }

  if (sharedState.clockHours >= 24) {
    sharedState.clockHours = 0;
    sharedState.clockDay++;
  }

  if (sharedState.clockDay >= variables.monthDays[sharedState.clockMonth]) {
    sharedState.clockDay = 0;
    sharedState.clockMonth++;
  }

  if (sharedState.clockMonth >= 12) {
    sharedState.clockMonth = 0;
  }

  // time of day
  if (sharedState.clockHours >= 6 && sharedState.clockHours < 18) {
    sharedState.timeOfDay = "day";
    clockImage.src = `${clockAssets}/day.png`;
  } else {
    sharedState.timeOfDay = "night";
    clockImage.src = `${clockAssets}/night.png`;
  }
  if (sharedState.clockHours >= 18 && sharedState.clockHours < 20) {
    sharedState.timeOfDay = "evening";
  }

  if (sharedState.clockHours === 0 && sharedState.clockMinutes === 0) {
    sharedState.alreadyNewDay = false;
  }
  if (sharedState.clockHours <= 6 && sharedState.clockMinutes <= 5 * sharedState.timeScale && !sharedState.alreadyNewDay) {
    sharedState.newDay = true;
    sharedState.alreadyNewDay = true;
    saveData();
  } else {
    sharedState.newDay = false;
  }

  clockDate.textContent = getClockDateFormattedShort(sharedState.clockMonth, sharedState.clockDay);
  clockTime.textContent = getClockTimeFormatted(sharedState.clockHours, sharedState.clockMinutes);
}


export function isNewMinute() {
  return sharedState.clockSeconds === 0;
}

export function isNewHour() {
  return sharedState.clockMinutes === 0 && isNewMinute();
}

export function isNewDay() {
  return sharedState.clockHours === 0 && isNewHour();
}

export function isNewMonth() {
  return sharedState.clockDay === 0 && isNewDay();
}

export function isMorning() {
  return sharedState.clockHours >= 6 && sharedState.clockHours < 12;
}

export function isAfternoon() {
  return sharedState.clockHours >= 12 && sharedState.clockHours < 18;
}

export function isEvening() {
  return sharedState.clockHours >= 18 && sharedState.clockHours < 20;
}

export function isNight() {
  return sharedState.clockHours >= 20 || sharedState.clockHours < 6;
}

export function getClockTime() {
  return `${sharedState.clockHours}:${sharedState.clockMinutes}`;
}

export function getClockTimeFormatted(clockHours: number, clockMinutes: number) {
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

export function getClockDate() {
  return `${sharedState.clockMonth}/${sharedState.clockDay}`;
}

export function getClockDateFormatted(clockMonth: number, clockDay: number) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${monthNames[clockMonth]}/${clockDay}`;
}

export function getClockDateFormattedShort(clockMonth: number, clockDay: number, reverse: boolean = false) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if (reverse) {
    return `${monthNames[clockMonth]} ${clockDay + 1}`
  }
  return `${clockDay + 1} ${monthNames[clockMonth]}`;
}