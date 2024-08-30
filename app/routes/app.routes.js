import express from 'express'
import userController from "../controllers/app.controller.js"
import mainMiddleware from '../middlewares/main.middleware.js'
import authController from '../controllers/auth.controller.js'
import appController from '../controllers/app.controller.js'
import classesController from '../controllers/classes.controller.js'
import reserveController from '../controllers/reserve.controller.js'

const router = express.Router()

router.use(function (req, res, next) {

    if(req.session.loggedin) req.session.cookie.maxAge += 1 * 1000  * 30
    mainMiddleware.main()
    next()
  })

router.get('/', userController.index)
router.get('/index.html', userController.index)

router.get("/cadastrar.html", authController.register)
router.post("/cadastrar.html", userController.create)

router.get("/classes", mainMiddleware.isAdmin, classesController.create)
router.get("/classes/@:shift", classesController.findAll)
router.post("/classes", mainMiddleware.isAdmin, classesController.create)

router.get("/entrar.html", authController.login)
router.post("/entrar.html", authController.login)
router.get("/sair.html", authController.logout)

router.get("/reserva.html", reserveController.index)
router.post("/reserva.html", reserveController.create)
router.delete("/reserva.html", reserveController.deleta)

router.get("/allusers", mainMiddleware.isAdmin , userController.findAll)

router.get("/@:keyTec", userController.findOne)

router.get("/allusers/edit@:keyTec", mainMiddleware.isAuthenticated , authController.edit)
router.post("/allusers/edit@:keyTec",  mainMiddleware.isAuthenticated , appController.update)

router.delete("/allusers/del@:keyTec", mainMiddleware.isAdmin , userController.deleta) 

export default router