
import {  clear } from "../utils/response.helper"
import Db from "../model/app.model"

function Reserve(){

    const index = async (req, res) => {

        let admin = false

        if(req.session.loggedin) 
            if( req.session.user.role == 0)admin = true

        const {name, valor, state } = req.body

        await Db.reserve.findMany({
            orderBy: [
                {
                  value: 'desc'
                }
            ]
            }).then(response=>{
                function myFunc(total, num) {
                    return total + parseFloat(num.value);
                  }
                  
                let total = response.reduce(myFunc, 0)
                res.render('reserve', {
                    data:response,
                    subtitle: 'Reserva Nacional',
                    admin,
                    user: req.session.user,
                    total,
                    helpers: {
                      formataValor: function(price, currency) {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(price);
                      }
                    }
                })
            }).catch(e=>res.send(e))
    }

    const create = async (req, res) => {
    
        const data = {
          name    : req.body.name.substring(0,35),
          valor   : parseFloat(req.body.valor), 
          state   : JSON.parse(req.body.state.toLowerCase())
        }
        await Db.reserve.create({
            data: {
              name    : data.name,
              value   : data.valor,
              new     : data.state
            },
          }).then(()=>{
          res.status(200)
          res.redirect('/reserva.html')
        }).catch((e)=>{
          res.status(500).send({e:e})
        })
        return true
      }

      const deleta = async (req, res) => {

        await Db.reserve.delete({
          where: {
            id: parseInt(clear(req.query.id))
          },
        }).then(()=>res.send('deletado')).catch(e=>res.send(e))
      }

    return {
        index,
        create,
        deleta
    }
}

export default Reserve()