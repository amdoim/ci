import express from 'express'
import AppController from "../controllers/app.controller.js"
import { main } from '../middlewares/main.middleware.js'


const router = express.Router()

router.use(function (req, res, next) {
    main()
    next()
  })

router.get("/", AppController.index)

router.get("/pgx", AppController.create);

router.get("/pg", AppController.findAll);

router.get("/pgid/:id", AppController.findOne);



// router.get("/pg/:nomeGiria", AppController.find);

// router.get("/pg/q/:messageId", AppController.find);

router.get("/pgd/:id", AppController.update); //put

router.get("/pgde/", AppController.deleta) //delete

export default router