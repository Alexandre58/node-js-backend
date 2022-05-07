"use strict";
const { User } = require("../db/sequelise");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const privateKey = require("../autch/private_key");
//cretion d'un post pour le user
//creation d'une url
//recuperation avec findOne des données de l'user
//methode compare => req.body.password recuperer la saisie de l'user et  compare avec user.password crypté de la base de donnée
//if ispasswordValid === true
module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      if (!user) {
        const message = "L'utilisateur n 'existe pas";
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (isPasswordValid) {
            const message = `Le mot de passe est incorrect`;
            return res.status(401).json({ message });
          }
          //jsonWebToken
          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "24h",
          });

          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token });
        })
        .catch((error) => {
          const message = `L'utilisateur n'a pas été connecté , merci de réessayer dans quelques instant.`;
          return res.json({ message, data: error });
        });
    });
  });
};
