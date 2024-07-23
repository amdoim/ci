import Db from "../model/app.model"
import { compact } from "../utils/response.helper"


// Create and Save a new Messages
function AppController(){  


  const index = (req, res) => {
    console.log('[app.controller.index] done')
    
    res.render('index', compact({eu : 'kkkkkkkkkkkkkkkkkkjunior'}))
  }

  const create = async (req, res) => {
    const dados = {
      name: req.body.name,
      email: req.body.email
    }


    await Db.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
          posts: {
            create: { title: 'Minha primeira Postagem' },
          },
          profile: {
            create: { bio: 'Sou novo aqui, Olá!' },
          },
        },
      }).then(()=>{
      res.status(200); 
      res.send('success')
    }).catch((e)=>{
      res.status(500); 
      res.send(e)
    })
  }

  // Retrieve all messages from the database.
  const findAll = async (req, res) => {
    const allUsers = await Db.user.findMany({
    }).then((response)=>{
      res.render('users', compact(response[0]))
    }).catch((error)=>{
      res.status(500); res.send(error)
    })
  }

  // Find a single message with a messageId
  const findOne = async(req, res) => {
    const allUsers = await Db.user.findMany({
      where: {
        id: req.params.id
      }
    }).then((response)=>{
      res.render('users', compact(response[0]))
    }).catch((error)=>{
      res.status(500); res.send(error)
    })
  }
  // Find a single message with a STRING
  //'^' +search + '$', 'i'  busca exata sem case sensitive
  const find = (req, res) => {
    const queryx = req.params.messageId ? 
      { regI: new RegExp(decodeURI(req.params.messageId.replace(/\+/g, " ")), 'i') } : 
      { regI: new RegExp(`^${decodeURI(req.params.nomeGiria.replace(/\+/g, " "))}\$`, 'i') }
    //console.log(queryx)
    const temp = req.params.messageId ? { texto : queryx.regI } : { titulo : queryx.regI }
    App.find( temp )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          })
        }
        const newdata = (data.length > 0) ? data : {message: "vazio"}
        res.send(newdata)
        //console.log(queryx)
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          })
        }
        return res.status(500).send({
          message: "Error retrieving message with id " + req.params.messageId,
        })
      })
  }

  // Update a message identified by the messageId in the request
  const update = (req, res) => {
    App.findByIdAndUpdate(
      req.params.messageId,
      {
        titulo: req.body.titulo,
        texto: req.body.texto,
        tags: req.body.tags,
      },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          })
        }
        res.send(data)
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          })
        }
        return res.status(500).send({
          message: "Error updating message with id " + req.params.messageId,
        })
      })
  }

  // Delete a message with the specified messageId in the request
  const deleta = (req, res) => {
    App.findByIdAndRemove(req.params.messageId)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          })
        }
        res.send({ message: "Message deleted successfully!" })
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          })
        }
        return res.status(500).send({
          message: "Could not delete message with id " + req.params.messageId,
        })
      })
  }

  return {
    index,
    create,
    find,
    findOne,
    findAll,
    deleta,
    update,
  }
  
}

export default AppController()