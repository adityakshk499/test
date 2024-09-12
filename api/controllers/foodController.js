import foodModel from "../models/foodModel.js";
import fs from "fs";


export const addFood = async (req, res) => {

  if (!req.file) {
    return res.json({ success: false, message: "Image is required" });
  }

  let image = `${req.file.filename}`;
  const { name, price, category, description } = req.body;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while adding food" });
  }
};


export const foodList = async(req,res) => {

  try{
    const foods = await foodModel.find({});
    res.status(200).json({success:true,data:foods})
  }catch(error){
    console.log(error)
    res.status(404).json({success:false,message:"error occured while calling foodlis api"})
  }
}


export const removeFood = async(req,res) => {
  try{
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({success:true,message:"food removed"})
  }catch(error){
    console.log(error)
    res.status(404).json({success:false,message:"error occured while removing food "})
  }
}
