function _deepClone(source){
  let target;
  if (source !== null || typeof source === 'object') {
    target = Array.isArray(source) ? [] : {};
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source !== 'object') {
          target[key] = source[key];
        } else {
          target[key] = _deepClone(source[key]);
        }
      }

    }
  } else {
    target = source;
  }

  return target;

}