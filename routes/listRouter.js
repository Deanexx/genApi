const express = require("express")

const { getList, setList } = require("../controllers/listController")

const router = express.Router();

router.route("/")
    .get(getList)
    .post(setList)

module.exports = router