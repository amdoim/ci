import express from 'express'
import userController from "../controllers/app.controller.js"
import { isAdmin, isAuthenticated, main } from '../middlewares/main.middleware.js'
import authController from '../controllers/auth.controller.js'
import appController from '../controllers/app.controller.js'
import classesController from '../controllers/classes.controller.js'
import reserveController from '../controllers/reserve.controller.js'

const router = express.Router()

router.use(function (req, res, next) {

    if(req.session.loggedin) req.session.cookie.maxAge += 1 * 1000  * 30
    main()
    next()
  })

router.get('/', userController.index)

router.get("/register", authController.register)
router.post("/register", userController.create)

router.get("/classes",classesController.create)
router.get("/classes/@:shift", classesController.findAll)
router.post("/classes", classesController.create)

router.get("/login", authController.login)
router.post("/login", authController.login)
router.get("/logout", function(req, res, next) {
  isAuthenticated(req, res, next)
}, authController.logout)

router.get("/reserve", reserveController.index)
router.post("/reserve", function(req, res, next) {
  isAuthenticated(req, res, next)
}, reserveController.create)
router.delete("/reserve", function(req, res, next) {
  isAuthenticated(req, res, next)
}, reserveController.deleta)

router.get("/allusers", function(req, res, next) {
  isAuthenticated(req, res, next)
}, userController.findAll)

router.get("/@:keyTec", userController.findOne)

router.get("/allusers/edit@:keyTec", function(req, res, next) {
  isAuthenticated(req, res, next)
}, authController.edit)
router.post("/allusers/edit@:keyTec", function(req, res, next) {
  isAuthenticated(req, res, next)
}, appController.update)

router.delete("/allusers/del@:keyTec", function(req, res, next) {
  isAuthenticated(req, res, next)
}, userController.deleta) 

export default router