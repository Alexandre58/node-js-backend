const { Pokemon } = require("../db/sequelise");
const pokemon = require("../models/pokemon");

module.exports = (app) => {
  //if client recherche par name else return all pokemons
  app.get("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = `Le pokemon demandé n'a pas pu être récupéré, réessayer dans quelques instant.`;
        res.status(500).json({ message, data: error });
      });
  });
};
