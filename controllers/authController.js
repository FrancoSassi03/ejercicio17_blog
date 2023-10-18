const { User } = require("../models");
const passport = require("passport");

async function showLogin(req, res) {
  res.render("login");
}

const login = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
});
async function signup(req, res) {
  res.render("registro");
}
async function createuser(req, res) {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
}

async function logout(req, res) {
  req.logout(function (err){
    if (err){
      return next(err);
    }
    res.redirect("/");
  })
}
// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

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
  showLogin,
  login,
  signup,
  createuser,
  logout,
};
