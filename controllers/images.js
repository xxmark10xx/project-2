const express = require('express')
const { Model } = require('sequelize/types')
const router = express.Router()
const db = require('../models')
require('dotenv').config()

module.exports = router
