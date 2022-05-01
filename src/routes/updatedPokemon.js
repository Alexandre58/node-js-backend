const { Pokemon } = require("../db/sequelise");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
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
        const message = `Le pokemon demandé n'a pas pu être modifié, réessayer dans quelques instant.`;
        res.status(500).json({ message, data: error });
      });
  });
};