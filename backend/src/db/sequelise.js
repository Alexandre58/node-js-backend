"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");

const bcrypt = require("bcrypt");
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

//appel des models
const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  //probleme avec sync() impossible de faire fonctionner sans le .sync({ force: true })
  /*({force:true}) quand on passe en production mettre sync() et vider bien toutes les table avant sinon cela indique qu'il y a des doublon erreur*/
  return sequelize.sync({ force: true }).then((_) => {
    console.log("INIT DB");
    pokemons.map((pokemon) => {
      //creation d'une table d'apres le model pokemons

      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    /**
     * User nouvelles donnée et création de la table d'apres le model user.js
     */
    bcrypt
      .hash("Thierry", 10)
      .then((hash) => {
        User.create({ username: "Thierry", password: hash });
      })
      .then((user) =>
        console.log(
          "Bizarre que le code suivant ne fonctionne pas(sequelize.js) => user.toJSON() video 6h 30"
        )
      );
    console.log(
      "******************************************\nLa base de donnée a bien été initialisée !\n******************************************"
    );
  });
};

//export
module.exports = {
  initDb,
  Pokemon,
  User,
};
