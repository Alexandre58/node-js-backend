const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelise");
const app = express();
const port = 3001;
app.use(express.json());

//remplace le middleware logger (affichage de l'url)
app.use(morgan("dev"));
app.use(favicon(__dirname + "/favicon.ico"));

sequelize.initDb();

//Point de terminaison
/****************************************************FindAll  */
require("./src/routes/findAllPokemons")(app);
/****************************************************FindByPk */
require("./src/routes/findPokemonByPk")(app);
/****************************************************Create */
require("./src/routes/createPokemon")(app);
/****************************************************Update */
require("./src/routes/updatedPokemon")(app);
/****************************************************Delete */
require("./src/routes/deletePokemon")(app);

/** Ajout la gestion des erreurs 404 */
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée , essayer une autre Url.";
  res.status(404).json({ message });
});

/** server */
app.listen(port, () =>
  console.log(
    `*************************************\napplication démarrée sur le port ${port} \n*************************************`
  )
);
