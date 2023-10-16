const { Article, Author } = require("../models");
const { format } = require('date-fns');

// Display a listing of the resource.
async function index(req, res) {
  const result = await Article.findAll({include : Author});
  res.render("articles",{articles: result})
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  const authors = await Author.findAll();
  res.render("create", { authors: authors });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { title, content, image, authorId } = req.body;
  await Article.create({ title, content, image, authorId });
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({ where: { id: req.params.id }});
  res.redirect("/admin")
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
