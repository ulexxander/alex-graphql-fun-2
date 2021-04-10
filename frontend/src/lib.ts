export function readableIsoDate(date: string | Date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDay();
  const hours = d.getHours();
  const mins = d.getMinutes();

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMins = mins.toString().padStart(2, "0");

  return `${day}.${month} ${paddedHours}:${paddedMins}`;
}
