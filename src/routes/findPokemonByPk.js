const { Pokemon } = require("../db/sequelise");

module.exports = (app) => {
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
