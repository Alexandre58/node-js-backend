/*const { user } = require("../db/sequelise");

module.exports = (app) => {
  // localhost:4000/user/recup all users
  app.get("/api/user", (req, res) => {
    const user = req.query.user;
    if (res.user !== null) {
      models.User.findAll({
        order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
        attributes: ["id", "username"],
      })
        .then(function (user) {
          if (user) {
            res.status(201).json(user);
          } else {
            res.status(404).json({ error: "utilisateurs introuvable" });
          }
        })
        .catch(function (err) {
          res
            .status(500)
            .json({ error: "impossible de récupérer les utilisateurs" });
        });
    } else {
      res.status(500).json({ error: "Utilisateur non autorisé" });
    }
  });
};
*/
