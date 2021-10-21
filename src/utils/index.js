const expireDate = () => {
  const timeInterval = 6 * 30 * 24 * 60 * 60 * 1000;
  return new Date(new Date().getTime() + timeInterval);
};

module.exports = {
  expireDate
};
