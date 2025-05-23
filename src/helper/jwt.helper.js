const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis.helper");
const { storeUserRefreshJWT } =require('../model/user/User.model')

const createAccessJWT = async (email, _id) => {
  const accessJWT = jwt.sign({email}, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  await setJWT( _id, accessJWT );

  return accessJWT;
};

const createRefreshJWT = async (email, _id) => {
  const refreshJWT = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await storeUserRefreshJWT( _id, refreshJWT);

  return refreshJWT;
};



module.exports = {
    createAccessJWT,
    createRefreshJWT
}