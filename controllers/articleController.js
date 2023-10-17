const { Article, Author, Comment } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const result = await Article.findAll({ include: Author });
  const formattedArticles = result.map((article) => ({
    ...article.toJSON(),
    createdAt: format(new Date(article.createdAt), "yyyy-MM-dd HH:mm:ss", { locale: es }),
  }));
  res.render("articles", { articles: formattedArticles });
}

// Display the specified resource.
async function show(req, res) {
  //const article = await Article.findByPk(req.params.id, { include: [Author, {model: Comment, include: Author}] });
  const article = await Article.findByPk(req.params.id, { include: Author });
  const comments = await Comment.findAll({ where: { articleId: article.id }, include: Author });
  const authors = await Author.findAll();
  res.render("article", { article, comments, authors });
}

// Show the form for creating a new resource
async function create(req, res) {
  const authors = await Author.findAll();
  res.render("create", { authors: authors });
}

// Store a newly created resource in storage.
function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      authorId: fields.authorId,
    });
    res.redirect("/admin");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  const authors = await Author.findAll();
  res.render("edit", { article, authors });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const article = await Article.findByPk(req.params.id);
    article.update({
      title: fields.title,
      content: fields.content,
      authorId: fields.authorId,
      image: files.image.size === 0 ? article.image : files.image.newFilename,
    });

    await article.save();

    res.redirect("/admin");
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({ where: { id: req.params.id } });
  res.redirect("/admin");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
