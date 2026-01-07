import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roll_d6() {
  return Math.floor(Math.random() * 5) + 1;
}

export function roll_d8() {
  return Math.floor(Math.random() * 7) + 1;
}

export function roll_d4() {
  return Math.floor(Math.random() * 3) + 1;
}