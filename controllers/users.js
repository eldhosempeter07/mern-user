const User = require("../models/user");
const { json } = require("express");

// @desc Get all users
// route GET users
// @access Public
exports.getusers = async (req, res, next) => {
  try {
    console.log(req.query);
    const { page = 1, page_count = 10, keyword } = req.query;
    const totalUsers = await User.find({
      name: { $regex: keyword, $options: "i" },
    });
    User.createIndexes({ name: "text" });

    const users = await User.find({ name: { $regex: keyword, $options: "i" } })
      .limit(page_count * 1)
      .skip((page - 1) * page_count)
      .exec();

    return res.status(200).json({
      success: true,
      count: totalUsers.length,
      result: users,
    });
  } catch (err) {
    return (
      res.status(500),
      json({
        success: false,
        error: "Server Error",
      })
    );
  }
};

// @desc Add User
// route POST users
// @access Public

exports.adduser = async (req, res, next) => {
  console.log(req.file);
  console.log("Body", req.body);

  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    
    description: req.body.description,
    interest: req.body.interest,
    gender: req.body.gender,
  });
  
  if(req.file != undefined){
    newUser["image"] = req.file.filename 
  }
  newUser
    .save()
    .then(() => res.json("New User Posted"))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

// @desc Get User
// route DELETE user/:id
// @access Public

exports.deleteusers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
    await user.remove();
    return res.status(200).json({
      success: true,
      result: {},
    });
  } catch (error) {
    console.log(error);
    return (
      res.status(500),
      json({
        success: false,
        error: "Server Error",
      })
    );
  }
};

// @desc get  user
// route DELETE user/:id
// @access Public
exports.getuserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
    return res.status(200).json({
      success: true,
      result: user,
    });
  } catch (error) {
    return (
      res.status(500),
      json({
        success: false,
        error: "Server Error",
      })
    );
  }
};

// @desc update  user
// route PUT user/:id
// @access Public


exports.updateuser = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = {}
    if(req.file == undefined){
      data = {...req.body}
    }else{
        data = {...req.body,image: req.file.filename}

    }
    const user = await User.findByIdAndUpdate(req.params.id, data);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return (
      res.status(500),
      json({
        success: false,
        error: "Server Error",
      })
    );
  }
};
