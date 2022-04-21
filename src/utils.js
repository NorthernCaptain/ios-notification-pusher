/**
 * Compare two objects by values of their properties, i.e shallow comparison
 * @param object1
 * @param object2
 * @returns {boolean}
 */
export function shallowEqual(object1, object2) {
  if(!object1 || !object2) {
    return false;
  }

  if(object1 === object2) {
    return true;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
