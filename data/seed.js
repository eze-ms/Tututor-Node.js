const dotenv = require('dotenv');
const db = require('../config/db');
const Usuarios = require('../models/Usuarios');
const Categoria = require('../models/Categorias');
const Subcategoria = require('../models/Subcategorias');
const { crearNuevaCuenta } = require('../controllers/usuariosController');
const { users } = require('./teacherServices.js');

dotenv.config({ path: './variables.env' });

// Simular req y res para usarlos en el seed
const mockReq = (user) => ({
  body: user,
  headers: { host: 'tututor-node-js.onrender.com' },  // URL de Render
  flash: (type, message) => {
    console.log(`Flash Message [${type}]: ${message}`)
  }
})

const mockRes = () => ({
  redirect: (url) => {
    console.log(`Redirigir a: ${url}`);
  }
});

db.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.log('Error al sincronizar la base de datos:', err));

async function seedDB() {
  try {
    for (let user of users) {
      const req = mockReq(user);
      const res = mockRes();
      await crearNuevaCuenta(req, res);  // Usar req y res simulados
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
    await Usuarios.destroy({ where: {} });  // Elimina todos los registros de usuarios
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
