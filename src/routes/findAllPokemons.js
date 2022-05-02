const { Pokemon } = require("../db/sequelise");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      //recup du parmetre name dans l'url pour la recherche par nom d'un pokemn
      //if pokemons name trouvé / else retrun all pokemeons
      const name = req.query.name;
      //recup des donnée depuis la base sql
      return Pokemon.findAll({ where: { name: name } }).then((pokemons) => {
        const message = `Il y a ${pokemons.length} pokemons qui correspond au terme de rechercher ${name}`;
        res.json({ message, data: pokemons });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = `La liste de ${pokemons.length}  pokémons a bien été récupérée.`;
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `La liste des pokemon npas pu être récupérée, réessayer dans quelques instant.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
