function isObject(obj) {
  return ['object', 'function'].some((type) => typeof obj === type) && obj !== null;
}

/**
 * 简易版深拷贝
 * TODO: 解决递归爆栈
 * 
 * @param {} obj 
 */
function deepClone(obj, hash = new WeakMap()) {
  // 值类型直接返回
  if (!isObject(obj)) {
    return obj;
  }

  if (typeof obj === 'function') {
    return obj;
  }

  // 用 hash 记录，解决循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 结构做一层浅拷贝
  let newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  hash.set(obj, newObj);

  // 递归调用
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  });

  return newObj;
}