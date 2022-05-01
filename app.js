const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelise");
const app = express();

app.use(express.json());

//remplace le middleware logger (affichage de l'url)
app.use(morgan("dev"));
app.use(favicon(__dirname + "/favicon.ico"));

sequelize.initDb();
//ici futur point de terminaison
