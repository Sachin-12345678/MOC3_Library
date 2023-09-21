const Order = require('../models/order');

const placeOrder = async (req, res) => {
  try {
    const { user, books, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      books,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user books', 'name title');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};
