const mongoose = require('mongoose');
const mongooseValidator = require('express-api-problem/mongoose-validator');

const studentSchema = new mongoose.Schema(
    {
            firstName: {
                    type: String,
                    trim: true
            },
            lastName: {
                    type: String,
                    trim: true
            },
            email: {
                    type: String,
                    required: true,
                    unique: true,
                    trim: true
            },
            registrationNumber: {
                    type: Number,
                    required: true
            },
            isEnabled: {
                    type: Boolean,
            }
    },
    {
            strict: false,
            versionKey: false,
            bufferCommands: false,
            validateBeforeSave: true,
            timestamps: true,
    },
);

studentSchema.plugin(mongooseValidator);

module.exports = mongoose.model('student', studentSchema, 'student');
