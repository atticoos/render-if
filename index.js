module.exports = function (predicate) {
  return function (element) {
    if (predicate) {
      return element;
    }
    return null;
  }
}
