const { Pokemon } = require("../db/sequelise");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const autch = require("../autch/autch");

module.exports = (app) => {
  app.put("/api/pokemons/:id", autch, (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            const message = `Le pokemon demandé n'existe pas, réessayer dans quelques instant.`;
            return res.status(404).json({ message });
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le pokemon demandé n'a pas pu être modifié, réessayer dans quelques instant.`;
        res.status(500).json({ message, data: error });
      });
  });
};
