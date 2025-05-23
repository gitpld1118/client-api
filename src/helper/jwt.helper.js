const jwt = require("jsonwebtoken");
const { setJWT } = require("./redis.helper");
const { storeUserRefreshJWT } =require('../model/user/User.model')


const createAccessJWT = async (payload) => {
  try {
    const accessJWT = jwt.sign( payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
  
    await setJWT(payload.email, accessJWT);
  
    // return Promise.resolve(accessJWT);
    return accessJWT;
  } catch (error) {
    throw error;
  }
  
};

const createRefreshJWT = async (payload, _id) => {

  try {
    const refreshJWT = jwt.sign( payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
  
  //  await storeUserRefreshJWT(_id, refreshJWT)
  
    // return Promise.resolve(refreshJWT);
    return refreshJWT;
  } catch (error) {
    throw error;
  }

  
};

module.exports = {
    createAccessJWT,
    createRefreshJWT
}