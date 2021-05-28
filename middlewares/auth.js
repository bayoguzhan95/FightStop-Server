const admin = require("../firebase");
const User = require("../models/user");

// Giriş yapilip yapilmadigini firebase ile öğrenebiliyoruz
exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

// admin için database'e istek atiyoruz emaili frontendden alip backendde sorguluyoruz ve sonra rolünü sorgluyorruz.
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  // const adminUser = await User.findOne({ email : email }).exec();
  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
