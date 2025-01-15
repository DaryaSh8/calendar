import { computed, signal } from "./signals.js";
import { getDatesString, getLastDayOfMonth, getStartDay } from "./utils.js";

const date = new Date();
date.setHours(0, 0, 0, 0);

export const nowDate = getDatesString(date);
export const chosenDate = signal(date);
export const notes = signal({});
export const chosenDateString = computed(() => getDatesString(chosenDate()));
export const chosenDateLastDay = computed(() =>
  getLastDayOfMonth(chosenDate()),
);
export const chosenDateStartDay = computed(() => getStartDay(chosenDate()));
