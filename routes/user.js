const express = require('express');
const { getusers, getuserById, addusers, deleteusers, updateuserById } = require('../controllers/Users');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const router = express.Router();

router.post("/",upload.single("file",addusers))

router
    .route('/')
    .get(getusers)
    // .post(addusers)

router
    .route('/:id')
    .delete(deleteusers)
    .get(getuserById)
    .put(updateuserById)

module.exports = router