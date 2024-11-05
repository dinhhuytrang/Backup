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
// view address
userRouter.get('/profile/:userId/address', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('address'); // Lấy chỉ trường 'address'
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ addresses: user.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add Address
userRouter.post('/profile/:userId/address', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address.push(address); // Thêm địa chỉ mới vào mảng address
    await user.save();

    res.status(201).json({ message: 'Address added successfully', address: user.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Address
userRouter.put('/profile/:userId/address/:addressId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const { address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressIndex = user.address.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.address[addressIndex] = address; // Cập nhật địa chỉ
    await user.save();

    res.status(200).json({ message: 'Address updated successfully', address: user.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Address
userRouter.delete('/profile/:userId/address/:addressId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = user.address.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', address: user.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





module.exports = userRouter