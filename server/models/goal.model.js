const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const GoalSchema = Schema({
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);