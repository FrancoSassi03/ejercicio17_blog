/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article, Author } = require("../models");
const { format } = require('date-fns');
const { es } = require('date-fns/locale');

async function showHome(req, res) {
  const articles = await Article.findAll({include : Author});
  const formattedArticles = articles.map(article => ({
    ...article.toJSON(),
    createdAt: format(new Date(article.createdAt), "d 'de' MMMM',' y", { locale: es })
  }));
  res.render("home", { articles: formattedArticles, headTitle: "El Blog de Hack Academy HOME" });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
};
