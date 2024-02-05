/**
 * Generates and returns a random color hex string
 *
 * @returns {string} Color Hex string
 */
export const getRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

/**
 * Converts Date object to month and year
 *
 * @param {Date} date Date object
 * @returns {string} Month and year of given date as a string
 */
export const getMonthYear = (date: Date): string => {
  return date.toLocaleDateString("default", { month: "long", year: "numeric" });
};
