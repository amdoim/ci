import express from 'express'
import userController from "../controllers/app.controller.js"
import { main } from '../middlewares/main.middleware.js'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.use(function (req, res, next) {
    main()
    next()
  })

router.get("/", userController.index)
router.get("/register", authController.register)
router.post("/register", userController.create)

router.get("/x", userController.create)
router.get("/r", userController.rankingPlus)

router.get("/allusers", userController.findAll)

router.get("/@:keyTec", userController.findOne)
router.get("/:keyTec", userController.findOne)

router.get("/pgd/:id", userController.update) //put

router.get("/pgde/", userController.deleta) //delete

export default router