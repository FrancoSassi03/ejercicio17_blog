const { Article, User, Comment } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const result = await Article.findAll({ include: User });
  const formattedArticles = result.map((article) => ({
    ...article.toJSON(),
    createdAt: format(new Date(article.createdAt), "yyyy-MM-dd HH:mm:ss", { locale: es }),
  }));
  res.render("articles", { articles: formattedArticles });
}

// Display the specified resource.
async function show(req, res) {
  //const article = await Article.findByPk(req.params.id, { include: [Author, {model: Comment, include: Author}] });
  const article = await Article.findByPk(req.params.id);
  const user = await User.findByPk(article.userId);
  const comments = await Comment.findAll({ where: { articleId: req.params.id }, include: User });
  const users = await User.findAll();
  res.render("article", { article, comments, users, user });
}

// Show the form for creating a new resource
async function create(req, res) {
  const users = await User.findAll();
  res.render("create", { users: users });
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
      userId: fields.userId,
    });
    res.redirect("/admin");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  const users = await User.findAll();
  res.render("edit", { article, users });
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
      userId: fields.userId,
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
