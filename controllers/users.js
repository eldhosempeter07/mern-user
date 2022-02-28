const User = require('../models/user')
const { json } = require('express')

// @desc Get all users
// route GET users
// @access Public
exports.getusers = async (req, res, next) => {
    try {
        console.log(req.query);
        const { page , page_count  } = req.query;
        const totalUsers = await User.find()
        const users = await User.find() .limit(page_count * 1)
        .skip((page - 1) * page_count)
        .exec()
        ;

        return res.status(200).json({
            success: true,
            count: totalUsers.length,
            result: users
        })
    } catch (err) {
        return res.status(500), json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add User
// route POST users
// @access Public
exports.addusers = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        console.log(user);
        return res.status(200).json({
            success: true,
            result: user
        });
    } catch (err) {
 
            return res.status(500), json({
                success: false,
                error: 'Server Error'
            });
        }
}



// @desc Get User
// route DELETE user/:id
// @access Public

exports.deleteusers = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }
        await user.remove();
        return res.status(200).json({
            success: true,
            result: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500), json({
            success: false,
            error: 'Server Error'
        });
    }
}


// @desc get  user
// route DELETE user/:id
// @access Public
exports.getuserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }
        return res.status(200).json({
            success: true,
            result: user
        })
    } catch (error) {
        return res.status(500), json({
            success: false,
            error: 'Server Error'
        });
    }
}


// @desc update  user
// route PUT user/:id
// @access Public
exports.updateuserById = async (req, res, next) => {
    try {

        console.log( req.body);
        // const user = await User.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            success: true,
        })
  
    } catch (error) {
        console.log(error);
        return res.status(500), json({
            success: false,
            error: 'Server Error'
        });
    }
}
