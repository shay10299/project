const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const connectToDB = require('../startup/connectDB');
const asyncHandler = require('express-async-handler')
const { validateParty } = require('../validateObject')


let arrayOfModels
try {
    const connect = async () => {
        arrayOfModels = await connectToDB()
    }
    connect()
} catch (error) {

}

