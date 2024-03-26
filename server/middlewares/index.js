exports.catch_async_err = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res)).catch((err) => next(err));
};
