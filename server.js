require("dotenv").config();

const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
const { User } = require("./models");
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.session());
passport.use(new LocalStrategy({usernameField : "email"},async (email, password, cb) => {
    console.log(email, password);
  try {
  const user = await User.findOne({ where: { email : email } });
  if (!user) {
  console.log("Email de usuario no existe.");
  return cb(null, false, { message: "Credenciales incorrectas." });
  }
  const match = password === user.password;
  if (!match) {
  console.log("La contraseña es inválida.");
  return cb(null, false, { message: "Credenciales incorrectas. Por favor, reintentar." });
  }
  console.log("Credenciales verificadas correctamente");
  return cb(null, user);
  } catch (error) {
  cb(null, false, { message: "Ocurrió un error inesperado. Por favor, reintentar." });
  }
 }));

 passport.serializeUser((user, cb) => {
  cb(null, user.id);
 });

 passport.deserializeUser(async (id, cb) => {
  try {
  const user = await User.findByPk(id);
  cb(null, user); // Usuario queda disponible en req.user.
  } catch (err) {
  cb(err);
  }
 });

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
