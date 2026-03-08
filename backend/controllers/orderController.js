import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "../utils/emailService.js";

const isDevelopment = process.env.NODE_ENV === "development";
const stripe = process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("dummy") 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    console.log("Place Order Request Body:", req.body);
    
    if (!req.body.userId) {
      console.log("Missing userId");
      return res.json({ success: false, message: "User authentication required" });
    }
    if (!req.body.items || !req.body.amount || !req.body.address) {
      console.log("Missing fields - Items:", req.body.items, "Amount:", req.body.amount, "Address:", req.body.address);
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Check if user exists
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const newOrder = await Order.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await user.update({ cartData: {} });

    // Send confirmation email
    await sendOrderConfirmationEmail(
      req.body.address.email,
      newOrder.id,
      req.body.items,
      req.body.amount,
      req.body.address
    );

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "bdt",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    let session_url;
    
    // In development with dummy key, create a mock session
    if (!stripe || isDevelopment) {
      console.log("Using mock Stripe session for development");
      session_url = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?success=true&orderId=${newOrder.id}`;
    } else {
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?success=true&orderId=${newOrder.id}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?success=false&orderId=${newOrder.id}`,
      });
      session_url = session.url;
    }

    res.json({ success: true, session_url: session_url, orderId: newOrder.id });
  } catch (error) {
    console.log("Order Error:", error.message);
    res.json({ success: false, message: error.message || "Error creating payment session" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }
    
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (success == "true") {
      await order.update({ payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await order.destroy();
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    const orders = await Order.findAll({ where: { userId: req.body.userId } });
    res.json({ success: true, data: orders.map(order => order.get({ plain: true })) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    let userData = await User.findByPk(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    if (userData.role !== "admin") {
      return res.json({ success: false, message: "You are not admin" });
    }
    const orders = await Order.findAll();
    res.json({ success: true, data: orders.map(order => order.get({ plain: true })) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    
    let userData = await User.findByPk(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    if (userData.role !== "admin") {
      return res.json({ success: false, message: "You are not an admin" });
    }
    
    if (!req.body.orderId || !req.body.status) {
      return res.json({ success: false, message: "Order ID and status are required" });
    }
    
    const order = await Order.findByPk(req.body.orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    
    await order.update({ status: req.body.status });
    res.json({ success: true, message: "Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
