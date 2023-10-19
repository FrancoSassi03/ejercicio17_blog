const { fakerES: faker } = require("@faker-js/faker");
const { Roles } = require("../models");

module.exports = async () => {
  const roles = ["Lector","Escritor","Administrador"];
  const role = [];

  for (let i = 1; i <= 3; i++) {
    
    role.push({
      rol : roles[i-1],
      code: i*100,
    });
  }

  await Roles.bulkCreate(role);
  console.log("[Database] Se corrió el seeder de Roles.");
};