/**
 * Converts seconds to a formatted string representing days, hours, minutes, and seconds.
 * @param {number} seconds - The total number of seconds.
 * @returns {string} The formatted time string.
 */
export function secondsToDhms(seconds: number): string {
  seconds = Number(seconds);

  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatUnit = (value: number, unit: string): string =>
    value > 0 ? `${value}${unit} ` : "";

  const formattedTime =
    formatUnit(days, "d") +
    formatUnit(hours, "h") +
    formatUnit(minutes, "m") +
    formatUnit(remainingSeconds, "s");

  return formattedTime.trim(); // Remove trailing space
}

/**
 * Converts a date-time string to a time string.
 *
 * @param date - The date-time string to convert.
 * @returns The time string extracted from the date-time string.
 */
export function dateTimeToTime(date: string) {
  const time = date
    .split("T")[1]
    .split(".")[0]
    .split(":")
    .slice(0, 2)
    .join(":");

  return time;
}
