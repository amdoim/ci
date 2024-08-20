import { globalConfig } from "../../chinelo.config"
import Db from "../model/app.model"
import { clear, compact } from "../utils/response.helper"
import bcrypt from "bcrypt"

// Create and Save a new Messages
function userController(){

  const index = (req, res) => {
    let data = {
      subtitle: 'Início',
      texto: globalConfig.textInicio + Date()
    }
    
    res.render('index', compact(data))
  }

  const create = async (req, res) => {
    if(req.body.cmd != 'coxinha123') res.redirect('/deleted')
  
    bcrypt.hash(req.body.born.substring(0,10), 13, async function (err, hash) {
      if (err) throw err;
      const data = {
        name    : req.body.name.substring(0,80),
        keyTec  : clear(req.body.keyTec),
        class   : req.body.class.substring(0,8),
        shift   : req.body.shift,
        born    : req.body.born.substring(0,10),
        password: hash
      }

      await Db.user.create({
          data: {
            name    : data.name,
            keyTec  : data.keyTec,
            shift   : data.shift,
            born    : data.born,
            class   : data.class,
            password: data.password,
            posts: {
              create: { title : 'Minha primeira Postagem' },
            },
            profile: {
              create: { bio   : 'Sou novo aqui, Olá!' },
            },
          },
        }).then(()=>{
        res.status(200)
        res.redirect('@'+data.keyTec)
      }).catch((e)=>{
        res.status(500).send({e:e})
      })
      return hash
    })
  }
  

  // Retrieve all messages from the database.
  const findAll = async (req, res) => {
    await Db.user.findMany({
      where: {
        active: (req.query.active || true)
      },
      orderBy: [
        {
          ranking: 'desc'
        }
      ]
    }).catch((error)=>{
      res.status(500).send(error)
    }).then(response=>{
      res.render('listusers', compact({data:response, subtitle: 'Listando usuários'}))
    }).catch(e=>res.send(e))
  }

 
  const findOne = async(req, res) => {
    await Db.user.findUnique({
      where: {
        keyTec: (clear(req.params.keyTec))
      },
      select: {
        keyTec: true,
        name: true,
        cash: true,
        profile: true,
        role: true,
        ranking: true,
        born: true,
        class: true,
        shift: true
      }
    }).then((response)=>{
      if(req.query.api==true)res.send(response)
      let data = {
        ... response,
        subtitle: 'Perfil - ' + response.name
      }
      res.render('users', compact(data))
    }).catch(()=>{
      res.status(404).render('notfound', compact({subtitle: "Página não encontrada!"}))
    })
  }

  const update = async(req, res) => {
    const data = {
      name    : req.body.name.substring(0,80),
      keyTec  : clear(req.body.keyTec),
      class   : req.body.class.substring(0,8),
      shift   : req.body.shift,
      born    : req.body.born.substring(0,10)
    }
    await Db.user.update({
      where: {
        keyTec: clear(req.params.keyTec),
      },
      data
    }).then(()=>res.redirect(globalConfig.mainUrl+'/@' + data.keyTec)).catch(e=>res.send(e))
  }

  const deleta = async (req, res) => {

    await Db.user.delete({
      where: {
        keyTec: clear(req.params.keyTec)
      },
    }).then(()=>res.send('deletado')).catch(e=>res.send(e))
  }

  const rankingPlus = async (req,res) => {
    let value = parseInt(req.query.value) || 10
    value = value > 999 ? 1000 : value
    value = value < -999 ? -1000 : value
    await Db.user.updateMany({
      where:{
        keyTec: clear(req.query.tec) || 'jr'
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