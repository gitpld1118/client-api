const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail } = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helper/bcrypt.helper");
const { createAccessJWT, createRefreshJWT } = require("../helper/jwt.helper");

router.all("/", (req, res, next) => {
  // res.json({ message: "return form user router" });

  next();
});

// Create new user router

router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {
    // hash password
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPass,
    };
    const result = await insertUser(newUserObj);
    console.log(result);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

// User sign in Router
router.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  /// hash our password and compare with the db one.

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submition" });
  }

  const user = await getUserByEmail(email);

  const passFormDb = user && user._id ? user.password : null;

  if (!passFormDb)
    return res.json({ status: "error", message: "Invalid email or password!" });

  const result = await comparePassword(password, passFormDb);

  if (!result) {
    return res.json({ status: "error", message: "Invalid email or password!" });
  }

  const accessJWT = await createAccessJWT({email: user.email});
  const refreshJWT = await createRefreshJWT({email: user.email});


  // const accessJWT = await createAccessJWT( user.email, '${user._id}' );
  // const refreshJWT = await createRefreshJWT( user.email, '${user._id}' );

  res.json({
    status: "success",
    message: "Login Successfully!",
    accessJWT,
    refreshJWT,
  });
});

module.exports = router;
