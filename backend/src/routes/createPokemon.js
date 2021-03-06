const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../db/sequelise");
const autch = require("../autch/autch");

module.exports = (app) => {
  app.post("/api/pokemons", autch, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le pokemon demandé n'a pas pu être crée, réessayer dans quelques instant.`;
        res.status(500).json({ message, data: error });
      });
  });
};
