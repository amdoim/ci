import express from 'express'
import userController from "../controllers/app.controller.js"
import { main } from '../middlewares/main.middleware.js'
import authController from '../controllers/auth.controller.js'
import appController from '../controllers/app.controller.js'

const router = express.Router()

router.use(function (req, res, next) {
    main()
    next()
  })

router.get("/", userController.index)

router.get("/register", authController.register)
router.post("/register", userController.create)

router.get("/r", userController.rankingPlus)

router.get("/allusers", userController.findAll)

router.get("/@:keyTec", userController.findOne)

router.get("/allusers/edit@:keyTec", authController.edit)
router.post("/allusers/edit@:keyTec", appController.update)

router.delete("/allusers/del@:keyTec", userController.deleta) 

export default router