
import { globalConfig } from "../../chinelo.config"
import Db from "../model/app.model"
import { clear } from "../utils/response.helper"
import md5 from "md5"

function userController(){

  const index = (req, res) => {
    let data = {
      subtitle: 'Início',
      texto: globalConfig.textInicio ,
      user: req.session.user,
      age: req.session.cookie.maxAge / 1000 / 60
    }
    res.render('index', data)
  }

  const cota = async (req, res) => {
    let alltotal, cunhado
    await Db.user.findMany({}).then(async response=>{
        function myFunc(total, num) {
            return total + parseFloat(num.cash);
          }

        let total = await response.reduce(myFunc, 0)
        alltotal = total
        cunhado   = total

      }).catch(e=>res.send(e))

      await Db.reserve.findMany({}).then(response=>{
            function myFunc(total, num) {
                return total + parseFloat(num.value);
              }
              
            let total = response.reduce(myFunc, 0)
            alltotal = total / alltotal
            res.render('cotacao', {
              alltotal, 
              subtitle: `Cotação ${alltotal}`, 
              cunhado, 
              reserva: total,
              user: req.session.user
            })
        }).catch(e=>res.send(e))
  }

  const msg = (req, res) =>{
    const {msg, color} = req.query

    if(!msg && !color) res.redirect('/')

    res.render({msg, color, subtitle: 'Mensagem para você '})

  }

  const create = async (req, res) => {
    
      const data = {
        name    : req.body.name.substring(0,80),
        keyTec  : clear(req.body.keyTec),
        class   : req.body.class.substring(0,8),
        shift   : req.body.shift,
        born    : req.body.born.substring(0,10),
        password: md5(req.body.born + process.env.DATABASE_URL)
      }

      await Db.user.create({
          data: {
            name    : data.name,
            keyTec  : data.keyTec,
            shift   : data.shift,
            born    : data.born,
            class   : {
              create: [
                { assignedBy: data.keyTec,
                  assignedAt: new Date(),
                  classes: {
                    connect: {
                      id: parseInt(data.class),
                    },
                  },
                }
              ]},
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
        let data = {}

        if(e.code == 'P2002') data = {...data, msg: 'Já existe uma chave TeC'}

        console.log(data)

        res.render('register', data)
      })
      return true
  }
  
  
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
      res.render('listusers', {data:response, subtitle: 'Listando usuários'})
    }).catch(e=>res.send(e))
  }

 
  const findOne = async(req, res) => {

    let itsme = false
    if(req.session.user && req.session.user.keyTec == req.params.keyTec) {itsme = true}
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
        subtitle: 'Perfil - ' + response.name,
        user: req.session.user,
        itsme
      }
      res.render('users', data)
    }).catch(()=>{
      res.status(404).render('notfound', {subtitle: "Página não encontrada!"})
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
    rankingPlus,
    msg,
    cota
  }

}

export default userController()