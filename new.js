/**
 * 模拟 new 操作符
 *
 * @param {*} constructor 构造器
 * @returns
 */
function objectFactory(constructor) {
  // 判断传进来的构造器是否是函数
  if (typeof constructor !== 'function') {
    return;
  }

  // 以构造器的原型来创建一个空对象
  const obj = Object.create(constructor.prototype);
  // 获取剩余的构造参数
  const args = Array.from(arguments).slice(1);
  // 借助构造器给空对象设置属性
  const res = constructor.apply(obj, args);
  // 确保构造函数总是返回一个对象
  return typeof res === 'object' ? res : obj;
}