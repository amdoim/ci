
import { compact, clear } from "../utils/response.helper"
import Db from "../model/app.model"

function Reserve(){

    const index = async (req, res) => {

        let admin = false

        if(req.session.user) 
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
                res.render('reserve', compact({
                    data:response,
                    subtitle: 'Reserva Nacional',
                    admin,user: req.session.user,
                    total
                }))
            }).catch(e=>res.send(e))
    }


    const create = async (req, res) => {
    
        const data = {
          name    : req.body.name.substring(0,35),
          valor   : parseFloat(req.body.valor), 
          state   : Boolean(req.body.state)
        }
  
        await Db.reserve.create({
            data: {
              name    : data.name,
              value   : data.valor,
              new     : data.state
            },
          }).then(()=>{
          res.status(200)
          res.redirect('/reserve/')
        }).catch((e)=>{
          res.status(500).send({e:e})
        })
        return true
      }

    
    
    return {
        index,
        create
    }
}

export default Reserve()