const { Pokemon } = require("../db/sequelise");
//operateur de recherche sequelize { Op }
const { Op } = require("sequelize");
//auth
const autch = require("../autch/autch");

module.exports = (app) => {
  app.get("/api/pokemons", autch, (req, res) => {
    if (req.query.name) {
      //recup du parmetre name dans l'url pour la recherche par nom d'un pokemn
      //if pokemons name trouvé / else retrun all pokemeons
      const name = req.query.name;
      //client choisi d'afficher un nombre de pokemon sinon afficher 5 pokemon
      const limite = parseInt(req.query.limite) || 5;
      //if la recherche contient qu'une lettre envoi d'un message
      if (name.length < 2) {
        const message = "Votre recherche doit contenir au moins deux lettre ";
        return res.status(400).json({ message });
      }
      //recup des donnée depuis la base sql
      //findAll a été remplacé par findAndCountAll pour afficher limite:5 et afficher en même temps tout les pokemons disponible sur /////plusieur pages si nécessaire.
      // 'name' est la propriete du model des pokemeons
      // name est le critere de recherche= (recherche souple qui utilise une methode par lettre et limitée a 5 avec limite: 5) /3001//////api/pokemons?name=ulbizarre
      //limite la recherche a 5 resultat
      //count, row vont avec la methode findAndCountAll
      // order: ['name'], affiche la recherche par resultat en ordre croissant , possibilité de faire order: ['name', ASC](par default) ou order: //['name', DESC]
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["name"],
        limit: limite,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokemons qui correspond au terme de rechercher ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
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
