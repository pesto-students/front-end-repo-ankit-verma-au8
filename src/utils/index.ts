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

/**
 * Returns date within current month with a given date
 *
 * @param {number} day The date to be included in the generated full date
 * @param {boolean} formatInString Flag to check if return value needs to be formatted
 * in string or Date
 * @returns {string | Date} The final date
 */
export const getDate = (
  day: number = 1,
  formatInString: boolean = false,
  getLast: boolean = false
) => {
  let tempDate = new Date();
  let newDate;
  if (getLast) {
    newDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0);
  } else {
    newDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), day);
  }
  return formatInString ? newDate.toLocaleDateString("en-GB") : newDate;
};

/**
 * Returns a cookie's value
 *
 * @param {string} key The cookie's name
 * @returns {string} The cookie's value
 */
export const getCookie = (key: string) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];

  return cookieValue;
};

/**
 * Sets a cookie
 *
 * @param {string} key The cookie's name
 * @param {string} value The cookie's value
 * @param {boolean} deleteCookie Delete cookie
 */
export const setCookie = (
  key: string,
  value: string,
  deleteCookie: boolean = false
) => {
  if (!deleteCookie) {
    document.cookie = `${key}=${value}; max-age=86400; samesite=lax;`;
  } else {
    document.cookie = `${key}=; max-age=0;`;
  }
};
