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

/**
 * Returns a shortened version of text
 *
 * @param {string} text The text to be truncated
 * @param {number} maxLength The maximum allowed length of the text
 * @returns {string} The truncated string
 */
export const truncateMessage = (text: string, maxLength = 30) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
