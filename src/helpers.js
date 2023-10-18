function isObject(object) {
  return object != null && typeof object === 'object';
}

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    if (isObject(value1) && isObject(value2)) {
      if (!deepEqual(value1, value2)) return false;
    } else {
      if (value1 !== value2) return false;
    }
  }

  return true;
}

module.exports = {isObject, deepEqual}