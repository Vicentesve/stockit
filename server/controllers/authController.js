const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const Warehouse = require("../models/Warehouse");

/**
 * * @desciption  Manejo de errores
 * @param {*} err
 * @returns errors
 */
const handleErrors = (err) => {
  let errors = {
    email: "",
    user: "",
    password: "",
    currentPassword: "",
  };
  //Incorrect user
  if (err.message === "incorrect user") {
    errors.user = "This user is not registered";
  }
  //Incorrect user
  if (err.message === "incorrect password") {
    errors.password = "Incorrect password";
  }

  //Password not same
  if (err.message === "previous password not match") {
    errors.currentPassword = "Previous password not match";
  }

  //Duplicate error code
  if (err.code === 11000) {
    console.log(err.message);
    if (err.message.includes("email")) {
      errors.email = "The email entered already exists";
    }
    if (err.message.includes("user")) {
      errors.user = "The entered user already exists";
    }
    return errors;
  }

  return errors;
};

/**
 * * @desciption  Generate a token for the user when logging in
 * @param {*} id
 * @returns token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * * @description Authenticate a user
 * * @routes      POST      /login
 * * @access      Public
 */
module.exports.login = async (req, res) => {
  const { user, password } = req.body;

  try {
    const login_user = await User.login(user, password);

    res.status(201).json({
      _id: login_user.id,
      fullname: login_user.name + " " + login_user.lastname,
      name: login_user.name,
      lastname: login_user.lastname,
      email: login_user.email,
      user: login_user.login_user,
      gender: login_user.gender,
      profilePic: login_user.profilePic,
      settings: login_user.settings,
      token: generateToken(generateToken._id),
      createdAt: login_user.createdAt,
    });
  } catch (err) {
    console.log(err);
    const message = handleErrors(err);
    res.status(400).send({ message });
  }
};

/**
 * * @desciption  Signup an user
 * * @routes      POST     /signup
 * * @access      Private
 */
module.exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);

    /* Create warehouse for the user */
    const fieldsWarehouse = {
      adminId: user.id,
      name: `Warehouse of ${user.name}`,
      products: [],
    };

    const warehouse = await Warehouse.create(fieldsWarehouse);

    res.status(201).json({
      _id: user.id,
      fullname: user.name + " " + user.lastname,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      user: user.user,
      gender: user.gender,
      profilePic: user.profilePic,
      settings: user.settings,
      token: generateToken(generateToken._id),
      createdAt: user.createdAt,
    });
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).send({ message });
  }
};

/**
 * * @desciption  Update an user
 * * @routes      PUT     /updateMe/:id
 * * @access      Private
 */
module.exports.updateMe = async (req, res) => {
  try {
    let fieldsToUpdate = {};
    switch (req.body.type) {
      case "account":
        console.log("account");
        fieldsToUpdate = {
          email: req.body.email,
          name: req.body.name,
          lastname: req.body.lastname,
          gender: req.body.gender,
          profilePic: req.body.profilePic,
        };
        break;
      case "security":
        let { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.params.id);

        // Check is the previous password match with actual password
        const isSame = bcrypt.compareSync(currentPassword, user.password);

        if (!isSame) {
          throw Error("previous password not match");
        } else {
          const salt = await bcrypt.genSalt();
          newPassword = bcrypt.hashSync(newPassword, salt);

          fieldsToUpdate = {
            password: newPassword,
          };
        }
        break;
      case "appearence":
        fieldsToUpdate = {
          "settings.theme": req.body.value,
        };
        break;
      default:
        break;
    }

    const updatedUsuario = await User.findByIdAndUpdate(
      req.params.id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      _id: updatedUsuario.id,
      fullname: updatedUsuario.name + " " + updatedUsuario.lastname,
      name: updatedUsuario.name,
      lastname: updatedUsuario.lastname,
      email: updatedUsuario.email,
      user: updatedUsuario.updatedUsuario,
      gender: updatedUsuario.gender,
      profilePic: updatedUsuario.profilePic,
      settings: updatedUsuario.settings,
      createdAt: updatedUsuario.createdAt,
    });
  } catch (error) {
    console.log(error);
    const message = handleErrors(error);
    res.status(400).send({ message });
  }
};
