import { getAllUsers } from '../models/userModel.js';

export const getAllUsersController = (req, res) => {
  getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
    
    res.status(200).json({
      message: 'success get all users',
      data: users
    });
  });
};
