const itemModel = require("../models/itemModel")
const catchAsync = require("../utils/catchAsync")

const getBarFunc = catchAsync(async (req, res, next) => {
    const bar = await itemModel.find({});

    return res.status(200).json({
        status: "success",
        data: bar
    })
})

exports.getBar = getBarFunc;

exports.setBar = catchAsync(async (req, res, next) => {
    const { data } = req.body;

    const items = await itemModel.find({ _id: { $in: data } });
    for (const el of items) {
        await itemModel.findByIdAndUpdate(
            {_id: el._id},
            {val: !el.val});
    }
    return getBarFunc(req, res, next);
})

exports.addItem = catchAsync(async (req, res, next) => {
    const newItem = await itemModel.create(req.body)

    return res.status(200).json({
        status: "success",
        data: newItem
    })
})

exports.createNewList = catchAsync(async (req, res, next) => {
    const newItem = await itemModel.create(req.body)

    return res.status(200).json({
        status: "success",
        data: newItem
    })
})
