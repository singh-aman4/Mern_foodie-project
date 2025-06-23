const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');


// ✅ Public - anyone can view menu
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Protected - only logged-in users can recommend
router.post('/recommend', authMiddleware, async (req, res) => {
  try {
    console.log("Headers:", req.headers);

    const { name, price, category } = req.body;

    // Fetch the logged-in user’s full details from DB
    const user = await User.findById(req.user); // `req.user` is the user ID from the JWT

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new menu item and attach user name directly here
    const newItem = new MenuItem({
      name,
      price,
      category,
      user: user.name  // attach name directly in backend
    });

    await newItem.save();

    res.status(201).json({ message: 'Dish added successfully!', item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("recommend cmd denied because of invalid token");
  }
});


// ✅ Protected test route
router.get('/protected', authMiddleware,async (req, res) => {
  // console.log("Protected route hit by user:", req.user);
  const userData=await User.findById(req.user);
  // console.log(userData.name);
  res.json({msg: `Hola ${userData.name+" "}, ✻✻ Nice to have you here! ✻✻`});
  // res.json({ msg: `Hello user ${req.user}, you're authenticated!` });
  
});

module.exports = router;