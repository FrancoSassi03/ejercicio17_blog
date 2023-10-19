const { User, Roles } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function indexUsers(req, res) {
  const result = await User.findAll({include: Roles});
  const formattedUsers = result.map((user) => ({
    ...user.toJSON(),
    createdAt: format(new Date(user.createdAt), "yyyy-MM-dd HH:mm:ss", { locale: es }),
  }));
  res.render("listUsers", { users:  formattedUsers});
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  const roles = await Roles.findAll();
  res.render("createuser", { roles });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await User.create({
      firstname: fields.firstname,
      lastname: fields.lastname,
      email: fields.email,
      password: fields.password,
      roleId: fields.roleId,
    });
    res.redirect("/admin/users");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const user = await User.findByPk(req.params.id);
  const roles = await Roles.findAll();
  res.render("edituser", { user, roles });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const user = await User.findByPk(req.params.id);
    user.update({
      firstname: fields.firstname,
      lastname: fields.lastname,
      email: fields.email,
      password: fields.password,
      roleId: fields.roleId,
    });

    await user.save();

    res.redirect("/admin/users");
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await User.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/users");
}

// Otros handlers...
// ...

module.exports = {
  indexUsers,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
