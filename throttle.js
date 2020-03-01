/**
 * 简易版节流
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle(fn, wait) {
  let previous = 0;
  let now;

  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    now = +new Date();

    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous >= wait) {
      previous = now;
      fn.apply(this, args);
    }
  }
}