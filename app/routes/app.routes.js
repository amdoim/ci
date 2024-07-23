import express from 'express'
import AppController from "../controllers/app.controller.js"


const router = express.Router()

router.get("/", AppController.index)

router.get("/pgx", AppController.create);

router.get("/pg", AppController.findAll);

router.get("/pgid/:messageId", AppController.findOne);

router.get("/pg/:nomeGiria", AppController.find);

router.get("/pg/q/:messageId", AppController.find);

router.put("/pg/:messageId", AppController.update);

router.delete("/pg/:messageId", AppController.deleta);

export default router