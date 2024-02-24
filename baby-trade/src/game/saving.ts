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
      alreadyNewDay: sharedState.alreadyNewDay
    } as SaveData)
  })

  console.log(`saved game data`);
}

export function loadData() {
  invoke('load_data').then((response) => {
    const json = JSON.parse(response as string);
    
    if (json) {
      console.log(`loaded save data: ${response}`);
  
      sharedState.balance = json.balance;
      sharedState.babies = json.babies;
      sharedState.clockSeconds = json.clockSeconds;
      sharedState.clockMinutes = json.clockMinutes;
      sharedState.clockHours = json.clockHours;
      sharedState.clockDay = json.clockDay;
      sharedState.clockMonth = json.clockMonth;
      sharedState.timeScale = json.timeScale;
      sharedState.timeOfDay = json.timeOfDay;
      sharedState.newDay = json.newDay;
      sharedState.alreadyNewDay = json.alreadyNewDay;
    }
  });
}