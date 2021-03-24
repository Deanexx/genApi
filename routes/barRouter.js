const express = require("express")

const { getBar, setBar, addItem } = require("../controllers/barControllers")

const router = express.Router();

router.route("/")
    .get(getBar)
    .post(addItem)
    .patch(setBar)

module.exports = router