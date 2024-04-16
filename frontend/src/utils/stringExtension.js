String.prototype.countLines = function () {
  return this.split(/\r\n|\r|\n/).length;
};
