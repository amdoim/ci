import { globalConfig } from "../../chinelo.config"
import Db from "../model/app.model"
import { compact, render, validateEmail } from "../utils/response.helper"

// Create and Save a new Messages
function userController(){

  const index = (req, res) => {
    let data = {
      subtitle: 'Início',
      texto: globalConfig.textInicio
    }
    res.render('index', compact(data))
    console.log('[app.controller.index] done')
  }

  const create = async (req, res) => {
    if(req.body.cmd != 'coxinha123') res.redirect('/deleted')
    const data = {
      name    : req.body.name.substring(0,80),
      keyTec  : req.body.keyTec.replace(/\s{2,}/g, ' ').replace(/ /g,"_").substring(0,8),
      class   : req.body.class.substring(0,8),
      shift   : req.body.shift,
      born    : req.body.born.substring(0,10),
      password: req.body.born.substring(0,10)
    }
    await Db.user.create({
        data: {
          name    : data.name     || 'Junior Alves',
          keyTec  : data.keyTec   || 'jr',
          shift   : data.shift    || 'Noturno',
          born    : data.born     || 'abc',
          class   : data.class    || 'abc',
          password: data.password || 'abc',
          posts: {
            create: { title : 'Minha primeira Postagem' },
          },
          profile: {
            create: { bio   : 'Sou novo aqui, Olá!' },
          },
        },
      }).then(()=>{
      res.status(200)
      res.redirect(data.keyTec)
    }).catch((e)=>{
      res.status(500).send({e:e})
    })
  }

  // Retrieve all messages from the database.
  const findAll = async (req, res) => {
    const allUsers = await Db.user.findMany({
    }).catch((error)=>{
      res.status(500).send(error)
    }).then(response=>res.render('users', compact(response))).catch(e=>res.send(e))
  }

  // Find a single user with a keyTec
  const findOne = async(req, res) => {
    const allUsers = await Db.user.findUnique({
      where: {
        keyTec: (req.params.keyTec)
      },
      select: {
        keyTec: true,
        name: true,
        cash: true,
        profile: true,
        role: true,
        ranking: true
      }
    }).then((response)=>{
      if(req.query.api==true)res.send(response)
      let data = {
        ... response,
        subtitle: 'Perfil - ' + response.name
      }
      res.render('users', compact(data))
    }).catch((error)=>{
      res.status(404).render('notfound', compact({subtitle: "Página não encontrada!"}))
    })
  }

  // Update a message identified by the messageId in the request
  const update = async(req, res) => {
    const updateUser = await Db.user.update({
      where: {
        email: 'alice@prisma.io',
      },
      data: {
        name: 'Aruã',
      },
    }).then(e=>res.send('atualizado')).catch(e=>res.send(e))
  }

  // Delete a message with the specified messageId in the request
  const deleta = async (req, res) => {
    const deleteUser = await Db.user.delete({
      where: {
        email: 'alice@prisma.io',
      },
    }).then(e=>res.send('deletado')).catch(e=>res.send(e))
  }

  const rankingPlus = async (req,res) => {
    let value = parseInt(req.query.value) || 10
    value = value > 999 ? 1000 : value
    value = value < -999 ? -1000 : value
    await Db.user.updateMany({
      where:{
        keyTec: req.query.tec || 'jr'
      },
      data: {
        ranking: {
          increment: value,
        }
      },
    })

    res.send('1')
  }

  return {
    index,
    create,
    findOne,
    findAll,
    deleta,
    update,
    rankingPlus
  }

}

export default userController()