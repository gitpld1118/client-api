
const redis = require("redis");
const client = redis.createClient(process.env.REDID_URL);


client.on('error', (err) => console.log('Redis Client Error', err));
client.on('ready', () => console.log('Redis client connected!'));


// Connect the client when this module is loaded
(async () => {
  await client.connect();
})();

const setJWT = (key, value) => {
  return client.set(key, value); // returns a Promise
};

const getJWT = (key) => {
  return client.get(key); // returns a Promise
};

module.exports = {
  setJWT,
  getJWT
};




// const redis = require("redis");
// const client = redis.createClient();
// // redis://localhost:6379

// client.on('error', (err) => console.log('Redis Client Error', err));

// const setJWT = (key, value) => {
//   return new Promise((resolve, reject) => {
//     try {
//       client.set("key", "value", (err, res) => {
//         if (err) reject(err);
//         resolve(res);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
// const getJWT = (key) => {

//   return new Promise((resolve, reject) => {
//     try {
//       client.get("key", (err, res) => {
//         if (err) reject(err);
//         resolve(res);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// module.exports = {
//     setJWT,
//     getJWT
// }


