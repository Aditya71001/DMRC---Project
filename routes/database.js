const express = require('express')
const router = express.Router()
const databaseController = require('../controllers/database_controller')

router.get('/',databaseController.home)

router.get('/search',databaseController.searchform)

router.post('/search',databaseController.searchdb)

router.get('/searchbyid',databaseController.searchbyidform)

router.post('/findcols',databaseController.findcols)

router.post('/searchbyid',databaseController.searchbyiddb)

module.exports=router