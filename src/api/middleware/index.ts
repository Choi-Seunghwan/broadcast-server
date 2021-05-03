const allowCrossDomain = (res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
};

const middleware = (req, res, next) => {
  allowCrossDomain(res);
  next();
};

export default middleware;
