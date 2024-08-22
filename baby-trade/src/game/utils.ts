
// Clamp!

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

declare global {
  interface Math {
    clamp(value: number, min: number, max: number): number;
  }
}

Math.clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringToRegex(string: string): RegExp {
  const escapedString = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
  return new RegExp(escapedString, "g");
}