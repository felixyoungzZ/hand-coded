function genUniqueFnName(obj) {
  const fnName = (new Date()).getTime().toString();

  return obj.hasOwnProperty(fnName) ? genUniqueFnName(obj) : fnName;
}

Function.prototype.myApply = function(context) {
  if(typeof this !== 'function') {
    return;
  }

  context = context || window;

  const fnName = genUniqueFnName(context);
  context[fnName] = this;

  const args = Array.from(arguments).slice(1);
  const result = context[fnName](args);
  
  delete context[fnName];
  return result;
}