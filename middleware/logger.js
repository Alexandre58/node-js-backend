exports.logger = (req, res, next) => {
  console.log(`Url demandé : ${req.url}`);
  next();
};
