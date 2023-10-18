/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 * En este ejemplo se están insertando 500 artículos con textos ficticios.
 *
 *
 */

const { fakerES: faker } = require("@faker-js/faker");
const { Comment } = require("../models");

module.exports = async () => {
  const comments = [];

  for (let i = 0; i < 300; i++) {
    comments.push({
      userId: faker.number.int({ min: 1, max: 8 }),
      content: faker.lorem.sentence(10),
      articleId: faker.number.int({ min: 1, max: 20 }),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
