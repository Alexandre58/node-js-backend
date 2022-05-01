const { Pokemon } = require("../db/sequelise");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        const message = `La liste de ${pokemons.length}  pokémons a bien été récupérée.`;
        res.json({ message, data: pokemons });
      })
      .catch((error) => {
        const message = `La liste des pokemon npas pu être récupérée, réessayer dans quelques instant.`;
        res.status(500).json({ message, data: error });
      });
  });
};
