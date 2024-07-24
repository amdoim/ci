import Db from "../model/app.model"
import { compact } from "../utils/response.helper"


// Create and Save a new Messages
function AppController(){  

  const index = (req, res) => {
    console.log('[app.controller.index] done')
    let it = {eu : 'junior'}    
    let ot = {... it, tu: 'vossamercerdes'}    
    res.render('index', compact(ot))
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
      res.status(500).send({e:e.code})
    })
  }

  // Retrieve all messages from the database.
  const findAll = async (req, res) => {
    const allUsers = await Db.user.findMany({
    }).then((response)=>{
      res.render('users', compact(response[0]))
    }).catch((error)=>{
      res.status(500); res.send(error)
    }).then(response=>res.send(response)).catch(e=>res.send(e))
  }

  // Find a single message with a messageId
  const findOne = async(req, res) => {
    const allUsers = await Db.user.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    }).then((response)=>{
      let ok = (response.id) ? 1 : 0
      res.render('users', compact({... response, ok}))
    }).catch((error)=>{
      res.status(500); res.send(error)
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

  return {
    index,
    create,
    findOne,
    findAll,
    deleta,
    update,
  }
  
}

export default AppController()