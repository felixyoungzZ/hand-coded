/**
 * 获取一个区别于对象已有属性的独一无二的属性名，也就是 key
 *
 * @param {*} obj 已有的对象
 * @returns
 */
function genUniqueFnName(obj) {
  const fnName = (new Date()).getTime().toString();

  return obj.hasOwnProperty(fnName) ? genUniqueFnName(obj) : fnName;
}

// 模拟 Function.prototype.apply 操作
Function.prototype.myApply = function(context) {
  if(typeof this !== 'function') {
    return;
  }

  // context 为空或 null 则为 window
  context = context || window;

  // 获取函数名
  const fnName = genUniqueFnName(context);

  // 给传进来的对象设置一个属性，值为当前函数
  context[fnName] = this;

  // 获取剩下的参数
  const args = Array.from(arguments).slice(1);

  // 获取结果，以备返回值
  const result = context[fnName](args);

  // 删除新增的属性
  delete context[fnName];

  // 返回值
  return result;
}