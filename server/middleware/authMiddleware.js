const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // should be same as above

const authMiddleware = (req, res, next) => {
  // const token = req.header('x-auth-token');
  const authHeader = req.header('Authorization');
  console.log("All headers:", req.headers);
  let token = authHeader && authHeader.startsWith('Bearer ')? authHeader.split(' ')[1]: null;
  // if(!token) console.log("nahi hai token"+token);
  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTkxNmY3Mzg3OTNmMzNhMWE3MTQ0NiIsImlhdCI6MTc1MDY4Njc4NywiZXhwIjoxNzUwNjkwMzg3fQ.nV_blH1yqsRHfUvejnIaFsqj5fUTRU8uQcD-yjq9AQE";
  if (!token) return res.status(401).json({ msg: "No token, access denied" });
  

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    // console.log(verified);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
    
  }
};

module.exports = authMiddleware;