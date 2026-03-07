import Food from "../models/foodModel.js";
import User from "../models/userModel.js";
import fs from "fs";

// add food items
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  try {
    let userData = await User.findByPk(req.body.userId);
    if (userData && userData.role === "admin") {
      await Food.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
      });
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json({ success: true, data: foods.map(food => food.get({ plain: true })) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    let userData = await User.findByPk(req.body.userId);
    if (userData && userData.role === "admin") {
      const food = await Food.findByPk(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => {});
      await food.destroy();
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
