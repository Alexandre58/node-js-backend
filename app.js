const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
/**
 * import pokemons list
 */
const pokemons = require("./mock-pokemon");
/**
 * import de la function success du fichier helper
 */
const { success, getUniqueIdPokemons } = require("./helper");

// remplacé par morgan const { logger } = require("./middleware/logger");
/**
 * import express
 */
const app = express();
const port = 3001;
app.use(express.json());
/****************************************************APPEL DES FUNCTIN DU MIDDLEWARE OU .USE()************************* */
//app.use(logger);
//remplace le middleware logger (affichage de l'url)
app.use(morgan("dev"));
//app.use(favicon(__dirname + "/favicon.ico"));

/***************************************************GET POST PUT DELETE *************** */
/**
 * **********************************afficher un pokemon*********************************
 */

app.get("/api/pokemons/:id", (req, res) => {
  //message = function succes de helper
  const message = "Un pokemon a bien étais trouvé !";
  //recupere l'id dans l'url
  const id = parseInt(req.params.id);
  //trouve l id avec find
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  // affichage des donnée a travers l'id
  //res.send(`Vous avez demandé : ${pokemon.name} et son image ${pokemon.hp}`);
  //format Json et le message a bien étè intégré dans l'api avec le nom , picture ect ...
  res.json(success(message, pokemon));
});

/**
 * display all pokemons
 */
app.get("/api/pokemons", (req, res) => {
  const messageAllPokemons = "Tous le pokemons ont étaient trouvés";
  const pokemonAll = pokemons;
  res.json(success(messageAllPokemons, pokemonAll));
});
/**
 * *****************************************POST ajouter un pokemon à l'API REST***********************
 */
app.post("/api/pokemons", (req, res) => {
  //on defini un identifiant arbitrairement car pour l'instant la base de donnée n'est pas crée
  // sans la metthode =>const id = 123;
  // avec la methode de helper function getUniqueIdPokemons
  const id = getUniqueIdPokemons();
  //on fusioone les donnée via http entrant ...req.body puis avec l'identifiant meme si ce dernier n'est pas tres fiable pui on en profite pour donné une date de creation du pokemon
  //donc si j'ai bien compris on ajoute au req.body , un id et une date de creation
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  //on push dans le fichier dédier par nous
  pokemons.push(pokemonCreated);
  //petit message de creation du pkemeon
  const message = `Le pokemon ${pokemonCreated.name} a bien étè crée.`;
  //response json
  res.json(success(message, pokemonCreated));
});
/*************************************************PUT MISE A JOUR d'un pokemon */
/**
 * modification d'un pokemon avec PUT ,nous changeons la totalité puis nous remplaçons par le nouveau
 * dans mon cas il y a un bug a voir car initialement le code a la ligne 80 est le suivant
 *  pokemons = pokemons.map((pokemon) => {
 */
app.put("/api/pokemons/:id", (req, res) => {
  //recupere l'id dans l'url et on les places dans une variable , ici updatePokemon
  const id = parseInt(req.params.id);
  //ajout de id:id dans req.body
  const updatePokemon = { ...req.body, id: id };
  //on recup tous les pokemon
  let pokemon = pokemons.map((pokemon) => {
    return pokemon.id === id ? updatePokemon : pokemon;
  });
  //message = function succes de helper
  const message = `Le pokemon ${updatePokemon.name}a bien étais mis à jour !`;

  res.json(success(message, updatePokemon));
});
/*****************************************************DELETE pokemon */

/**
 * ////////////////////////////////////////////////////////////////serveur listen/////////////////////////////////////////
 */
app.listen(port, () => {
  console.log("*******************************");
  console.log("serveur démarré au port " + port);
  console.log("*******************************");
});
