Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    return;
  }

  // 获取除第一个参数之后的参数
  const args = Array.from(arguments).slice(1);
  // 原函数，也就是 this
  const fnToBeBound = this;
  // 空函数
  const fNOP = function() {}
  // 绑定完成的函数
  const fnBound = function() {
    // 返回一个函数
    return fnToBeBound.apply(
      // 判断是否是 new 调用
      fNOP.prototype.isPrototypeOf(this) ? this : context,
      // 将所有参数统一调用，因为可能存在这种形式的使用：fn.bind(obj, a, b)(x, y)
      args.concat(Array.from(arguments)),
    );
  }

  if (this.prototype) {
    // Function.prototype 没有 prototype
    // 将空函数的原型设置为原函数的原型，用于判断是否为 new 调用
    fNOP.prototype = this.prototype;
  }

  // 避免对绑定完成的函数的原型修改会导致原函数的原型被改变
  fnBound.prototype = new fNOP();
  // 返回绑定完成的函数
  return fnBound;
}