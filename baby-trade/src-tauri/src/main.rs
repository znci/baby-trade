// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use std::{fs::{self, create_dir_all}, path::Path};

use baby_trade::compress_data;
use tauri::api::path::config_dir;

#[tauri::command]
async fn save_data(data: String) -> Result<(), String> {
    let path = Path::new(&config_dir().ok_or("Config dir is not supported by your platform.")?).join("baby-trading").join("game.dat");
    let compressed = compress_data(data).map_err(|e| e.to_string())?;

    create_dir_all(path.parent().ok_or("Failed to get parent directory.")?).map_err(|e| e.to_string())?;
    fs::write(path, compressed).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn load_data() -> Result<String, String> {
    let path = Path::new(&config_dir().ok_or("Config dir is not supported by your platform.")?).join("baby-trading").join("game.dat");
    let compressed = fs::read(path).map_err(|e| e.to_string())?;
    let data = baby_trade::decompress_data(compressed).map_err(|e| e.to_string())?;

    Ok(data)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_data, load_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
