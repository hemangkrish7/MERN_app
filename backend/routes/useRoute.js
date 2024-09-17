// Create operation route API
const express = require("express");

const mongoose = require("mongoose");
const User=require("../models/userModels");
const router=express.Router();
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
  
    try {
      const userAdded = await User.create({ name, email, age });
      res.status(201).json(userAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get("/", async (req, res) => {
      try {
        const showAll = await User.find(); // Await the database query
        res.status(200).json(showAll);     // Return all users
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

  //get single user
  router.get("/:id", async (req, res) => {
    const {id}=req.params;
    try {
      const singleUser = await User.findById({_id:id}); // Await the database query
      res.status(200).json(singleUser);     // Return all users
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  //delete
  router.delete("/:id", async (req, res) => {
    const {id}=req.params;
    try {
      const singleUser = await User.findByIdAndDelete({_id:id}); // Await the database query
      res.status(200).json(singleUser);     // Return all users
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  //put/patch
  router.patch("/:id", async (req, res) => {
    const {id}=req.params;
    const {name,email,age}=req.body;

    try {
      const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true,}); // Await the database query
      res.status(200).json(updateUser);     // Return all users
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  
    module.exports=router;