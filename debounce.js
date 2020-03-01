
/**
 * 简易版防抖
 *
 * @param {*} fn
 * @param {number} [wait=50]
 * @param {boolean} [immediate=false] 第一次是否立即执行
 * @returns
 */
function debounce(fn, wait = 50, immediate = false) {
  let timer;
  return function(...args) {
    // wait 时间内调用清空计时器
    if(timer) {
      clearTimeout(timer);
    }

    // timer 为空代表首次触发
    if (immediate && !timer) {
      fn.apply(this, args);
    }

    // 计时器
    timer = setTimeout(
      () => {
        timer = null;
        fn.apply(this, args);
      },
      wait,
    );
  }
}