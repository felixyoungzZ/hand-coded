function myInstanceOf(left, right) {
  let rightProto = right.prototype;
  left = left.__proto__;

  while(true) {
    if (left === null) {
      return false;
    }

    if (left === rightProto) {
      return true;
    }

    left = left.__proto__;
  }
}