const express = require("express");
// const uuidv4 = require("uuid");
const {
  getusers,
  getuserById,
  addusers,
  deleteusers,
  updateuserById,
  addusersImage,
  updateuser,
  adduser,
} = require("../controllers/users");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("profileImage"), adduser);

router.put("/:id", upload.single("profileImage"), updateuser);

router.route("/").get(getusers);
// .post(addusers);

router.route("/:id").delete(deleteusers).get(getuserById);
// .put(updateuserById);

module.exports = router;
