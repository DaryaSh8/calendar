export function getDatesString(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getStartDay(date) {
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  ).getDay();
  return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
}
