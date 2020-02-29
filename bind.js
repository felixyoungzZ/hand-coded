Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    return;
  }

  // 获取除第一个参数之后的参数
  const args = Array.from(arguments).slice(1);
  // 原函数，也就是 this
  // 非 new 调用，this 为正常函数调用的 this，视调用环境而定
  // new 调用，this 为 new 返回的对象，假设为 obj
  // 所以可以在下文通过判断 obj 的原型是否为原函数的原型来判断是否为 new 调用
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