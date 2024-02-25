import { invoke } from '@tauri-apps/api/tauri'
import { sharedState } from './gameStore';

interface SaveData {
  balance: number;
  babies: Array<any>;
  clockSeconds: number;
  clockMinutes: number;
  clockHours: number;
  clockDay: number;
  clockMonth: number;
  timeScale: number;
  timeOfDay: string;
  newDay: boolean;
  alreadyNewDay: boolean;
  newsList: Array<any>;
}

setInterval(() => {
  saveData();
}, 60000)

export function saveData() {
  invoke('save_data', {
    data: JSON.stringify({ 
      balance: 1000,
      babies: [],
      clockSeconds: sharedState.clockSeconds,
      clockMinutes: sharedState.clockMinutes,
      clockHours: sharedState.clockHours,
      clockDay: sharedState.clockDay,
      clockMonth: sharedState.clockMonth,
      timeScale: sharedState.timeScale,
      timeOfDay: sharedState.timeOfDay,
      newDay: sharedState.newDay,
      alreadyNewDay: sharedState.alreadyNewDay,
      newsList: sharedState.newsList
    } as SaveData)
  })

  console.log(`saved game data`);
}

export function loadData() {
  return new Promise((resolve, reject) => {
    invoke('load_data', {}).then((data: any) => {
      const parsedData = JSON.parse(data)
      sharedState.balance = parsedData.balance;
      sharedState.babies = parsedData.babies;
      sharedState.clockSeconds = parsedData.clockSeconds;
      sharedState.clockMinutes = parsedData.clockMinutes;
      sharedState.clockHours = parsedData.clockHours;
      sharedState.clockDay = parsedData.clockDay;
      sharedState.clockMonth = parsedData.clockMonth;
      sharedState.timeScale = parsedData.timeScale;
      sharedState.timeOfDay = parsedData.timeOfDay;
      sharedState.newDay = parsedData.newDay;
      sharedState.alreadyNewDay = parsedData.alreadyNewDay;
      sharedState.newsList = parsedData.newsList;
      console.log(`loaded game data`);
      resolve(sharedState);
    })
  })
}