const { UserSchema } = require("./User.schema");

const insertUser = async (userObj) => {
  return await UserSchema(userObj).save();
};

const getUserByEmail = (email) => {
  if (!email) {
    // Return a rejected Promise immediately if email is falsy
    return Promise.reject(new Error("Email is required"));
  }

  // Return the Promise from findOne directly
  return UserSchema.findOne({ email });
};

const storeUserRefreshJWT = (_id, token) => {
  return UserSchema.findOneAndUpdate(
    { _id },
    {
      $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
    },
    { new: true }
  );
};

module.exports = {
  insertUser,
  getUserByEmail,
};

// const getUserByEmail = (email) =>{
//   return new Promise((resolve, reject)=>{
//     if(!email) return false
//     try {
//       UserSchema.findOne({email})
//         .then(user => {
//           resolve(data)
//         }).catch(err => {
//           reject(error)
//         });

//     //   UserSchema.findOne({email}, (error, data)=>{
//     //     if(error){
//     //       reject(error)    }
//     // resolve(data)
//     //   })

//     } catch (error) {
//       reject(error)
//     }

//   })
// }
