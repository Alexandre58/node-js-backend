const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelise");
const cors = require("cors");
const app = express();
//mise en production
//ne surtout pas utiliser nodemon en production
//Passer express en mode production

//Variable d'environnement = process.env.PORT permet de démarrer le projet en production et 3001 en localhost
const port = process.env.PORT || 3001;
app.use(express.json());

//remplace le middleware logger (affichage de l'url)
app.use(morgan("dev"));
app.use(favicon(__dirname + "/favicon.ico"));
app.use(cors());

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
/**
 * User
 */
require("./src/routes/loggin")(app);
//require("./src/routes/user")(app);

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
