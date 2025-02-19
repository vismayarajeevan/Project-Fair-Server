// 1. import express
const express = require('express')

// import usercontroller
const usercontroller = require('../controllers/userController')

// import projectController
const projectController = require('../controllers/ProjectController')

// import middleware
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

// 2.create an object for express router class
const router = new express.Router()

// 2 a) Register :- http://localhost:3000/register
router.post('/register', usercontroller.registerController)

// 2 b)login :- http://localhost:3000/login
router.post('/login',usercontroller.loginController)

// 2 c)addProject :- http://localhost:3000/add-project
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)

// 2 d)homeProject :- http://localhost:3000/home-project
router.get('/home-project',projectController.homePageProjectController)

// 2 e)allProject :- http://localhost:3000/all-project
router.get('/all-project',jwtMiddleware,projectController.allProjectController)

// 2 f)userProject :- http://localhost:3000/user-project
router.get('/user-project',jwtMiddleware,projectController.userProjectController)

// 2 g)projects/10/edit :- http://localhost:3000/projects/id/edit
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController)

// 2 h)projects/id/remove :- http://localhost:3000/projects/id/remove
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)


// 3. profile edit
//  3 a)edit-user :- http://localhost:3000/edit-user
router.put('/edit-user',jwtMiddleware,multerMiddleware.single('profilePic'),usercontroller.editUserController)

// export router
module.exports =router