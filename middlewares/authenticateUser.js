module.exports = (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/");
      return;
    }
    //else continue
    next();
  };