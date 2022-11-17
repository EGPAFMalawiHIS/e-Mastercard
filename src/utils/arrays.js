/**
 * Get distinct objects from an array of objects
 * 
 * @param {Array} arr list of objects
 * @param {string | Array} key a key or list of keys to be used to identify distinct objects
 * @return {Array} new array with distinct objects
 */
export function uniqBy(arr, key) {
  return [...new Map(arr.filter(Boolean).map(item => {
    const uniqueKey = Array.isArray(key) 
      ? key.map(k => item[k]).join('_')
      : item[key]
    return [uniqueKey, item]
  })).values()]
}

/**
 * Get distinct items from an array with possible duplicates
 * 
 * @param {Array} arr list of items
 * @returns list of distinct items
 */
export function uniq(arr) {
  return arr.filter((value, index, self) => self.indexOf(value) === index)
}