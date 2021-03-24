const listModel = require("../models/listModel")
const itemModel = require("../models/itemModel")
const catchAsync = require("../utils/catchAsync")

exports.getList = catchAsync(async (req, res, next) => {
    const lists = await listModel.findOne({ active: true });

    res.status(200).json({
        status: "success",
        data: lists
    })
})

exports.setList = catchAsync(async (req, res, next) => {
    await listModel.findOneAndUpdate({ active: true }, { active: false })
    const newList = await listModel.create({ data : req.body})

    res.status(200).json({
        status: "success",
        data: newList
    })
})