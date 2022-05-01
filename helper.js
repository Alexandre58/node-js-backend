const pokemons = require("./mock-pokemon");

exports.success = (message, data) => {
  return { message, data };
  // replace au lieu de :
  //return {
  //    message :message,
  //    data : data
  // }
};

/**
 * pour mettre un identifiant unique non aleatoir et qui ce suit
 */
exports.getUniqueIdPokemons = (pokemos) => {
  //liste de tout les id des pokemons
  const pokemonsId = pokemons.map((pokemon) => pokemon.id);
  //reduce va trier et allais chercher le dernier id
  const maxId = pokemonsId.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  //uniqueId retourne le dernier id + 1
  console.log("le dernier id est le : " + uniqueId);
  return uniqueId;
};
