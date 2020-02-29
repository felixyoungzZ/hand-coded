function genUniqueFnName(obj) {
  const fnName = (new Date()).getTime().toString();

  return obj.hasOwnProperty(fnName) ? genUniqueFnName(obj) : fnName;
}

// 与 apply 的实现大同小异，只是参数的传入形式不一致
Function.prototype.myCall = function(context) {
  if(typeof this !== 'function') {
    return;
  }

  context = context || window;

  const fnName = genUniqueFnName(context);
  context[fnName] = this;

  const args = Array.from(arguments).slice(1);
  const result = context[fnName](...args);
  
  delete context[fnName];
  return result;
}