const nodemailer = require('nodemailer')
const emailConfig = require('../config/emails')
const fs = require('fs')
const util = require('util')
const ejs = require('ejs')
const path = require('path')

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
})

exports.enviarEmail = async (opciones) => {
    try {
        // leer el archivo para el mail
        const archivo = path.join(__dirname, `/../views/emails/${opciones.archivo}.ejs`)
        
         // Compilarlo
        const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'))

        // Crear el HTML a partir del archivo EJS
        const html = compilado({ url: opciones.url })

        // Configurar las opciones del email
        const opcionesEmail = {
            from: 'Meeti <noreply@meeti.com>',
            to: opciones.usuario.email,
            subject: opciones.subject,
            html,
        }

        // Enviar el email
        const sendEmail = util.promisify(transport.sendMail, transport)
        return await sendEmail.call(transport, opcionesEmail)
    } catch (error) {
        console.error('Error enviando el correo:', error)
        throw error; // Re-lanzar el error para que sea manejado por el llamador
    }
}
