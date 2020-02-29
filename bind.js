Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    return;
  }

  const args = Array.from(arguments);
  const fnToBeBound = this;
  const fNOP = function() {}
  const fnBound = function() {
    return fnToBeBound.apply(
      this instanceof fNOP ? this : context,
      args.concat(Array.from(arguments)),
    );
  }

  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }

  fnBound.prototype = new fNOP();
  return fnBound;
}