const jwt = require("jsonwebtoken");
const config = require("../config");
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(authorization) {
  //Tokens de authorizacion se ven como: Bearer esf8swh83hw8eh
  if (!authorization) {
    throw new Error("No viene token");
  }

  if (authorization.indexOf("Bearer ") === -1) {
    //Sí no encuentra la palabra Bearer
    throw new Error("Token invalido");
  }

  let token = authorization.replace("Bearer", ""); //Para quitar el Bearer y solo quedarnos con el token
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
  },
};

module.exports = {
  sign,
  check,
};
