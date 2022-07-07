
export function sanitize(str) {
  // remove all html tags, line charaters, tabs and extra spaces from the string
  return str.replace(/<(?:.|\n)*?>/gm, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}