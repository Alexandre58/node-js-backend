const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");
//pour ce connecter a Xamp ("pokedex", "root", "") port: 3306 phpmyadmin cliquer sur admin dans le panel de xamp
//pour ce connecter a Mamp ("pokedex", "root", "root") port: 8889 phpmyadmin cliquer sur openwebpage dans le panel de Mamp
const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mysql",
  /*  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },*/
  port: 3306,
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    console.log(
      "******************************************\nLa base de donnée a bien été initialisée !\n******************************************"
    );
  });
};

module.exports = {
  initDb,
  Pokemon,
};
