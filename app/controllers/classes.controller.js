
import { compact, clear } from "../utils/response.helper"
import Db from "../model/app.model"

function Classes(){

    const findOne = async(req, res) => {
        await Db.classes.findUnique({
          where: {
            keyTec: (clear(req.query.shift))
          },
          select: {
            id: true,
            name: true,
            shift: true
          }
        }).then((response)=>{
          if(req.query.api==true)res.send(response)
          let data = {
            ... response,
            subtitle: 'Turmas - ' + response.name
          }
          res.render('classes', compact(data))
        }).catch(()=>{
          res.status(404).render('notfound', compact({subtitle: "Página não encontradax!"}))
        })
    }

    const findAll = async (req, res) => {
        await Db.classes.findMany({
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

    const create = async (req, res) => {
    
        const data = {
          name    : req.body.name.substring(0,15),
          shift   : req.body.shift
        }
  
        await Db.classes.create({
            data: {
              name    : data.name,
              shift   : data.shift
            },
          }).then(()=>{
          res.status(200)
          res.redirect('/classes/@' + data.name)
        }).catch((e)=>{
          res.status(500).send({e:e})
        })
        return true
    }

    return {
        findOne,
        create,
        findAll
    }

}

export default Classes()