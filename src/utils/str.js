/**
 * remove all html tags, line charaters, tabs and extra spaces from the string
 * 
 * @param {String} str a string to be sanitized
 * @returns String
 */
export function sanitize(str) {
  try {
    return str.replace(/<(?:.|\n)*?>/gm, " ")
      .replace(/\n/g, " ")
      .replace(/\t/g, " ")
      .replace(/\s{2,}/g, " ")
      .replace(/=/g, " ")
      .replace(/,/g, " ")
      .trim();
  } catch (error) {
    return str;
  }
}