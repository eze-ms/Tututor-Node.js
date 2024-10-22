const dotenv = require('dotenv');
const db = require('../config/db');
const { crearNuevaCuenta } = require('../controllers/usuariosController'); // Reutilizar la función del controlador
const { users } = require('./teacherServices.js'); // Lista de usuarios para el seed

dotenv.config({ path: './variables.env' });

// Sincroniza la base de datos si es necesario
db.sync()  
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.log('Error al sincronizar la base de datos:', err));

async function seedDB() {
  try {
    for (let user of users) {
      await crearNuevaCuenta(user);  // Usar la función del controlador
    }
    console.log('Usuarios creados correctamente');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function clearDB() {
  try {
    await Usuarios.destroy({ where: {} });  // Eliminar todos los registros
    console.log('Base de datos limpiada');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if (process.argv[2] === '--import') {
  seedDB();
} else {
  clearDB();
}
