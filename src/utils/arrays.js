/**
 * Get distinct objects from an array of objects
 * 
 * @param {Array} arr list of objects
 * @param {string} key a string to be used to identify distinct objects
 * @return {Array} new array with distinct objects
 */
export function uniqBy(arr, key) {
  return [...new Map(arr.filter(Boolean).map(item => [item[key], item])).values()]
}