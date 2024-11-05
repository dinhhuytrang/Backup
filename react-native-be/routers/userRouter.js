const express = require('express');
const userRouter = express.Router();
const User = require('../models/Users.model'); 


// view profile

userRouter.get('/profile/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('username email phoneNumber address'); // Select specific fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update userProfile
userRouter.put('/profile/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { username, email, phoneNumber, address } = req.body; 

    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, phoneNumber, address },
      { new: true, runValidators: true } 
    ).select('username email phoneNumber address'); 

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







module.exports = userRouter