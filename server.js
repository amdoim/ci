import express from "express"
import bodyParser from "body-parser"
import rotas from "./app/routes/app.routes"
import cors from 'cors'
import { globalConfig } from "./chinelo.config"
import { engine, create} from "express-handlebars"
import session from "express-session"

const sec = process.env.DATABASE_URL

function createServer(){

    async function start(){
        
        const app = express()
        app.engine('handlebars',engine({
            helpers: {
                title()     { return globalConfig.title   },
                url()       { return globalConfig.mainUrl },
                formataValor: function(price, currency, where = 'pt-BR') {
                    return new Intl.NumberFormat(where, { style: 'currency', currency: currency }).format(price);
                },
                elo: function(num){
                    return num < 1000           ?      'Bronze'    :
                    num > 999 && num < 2000     ?      'Prata'     :
                    num > 1999 && num < 3000    ?      'Ouro'      :
                    num > 2999 && num < 4000    ?      'Platina'   :
                    num > 3999 && num < 5000    ?      'Diamante'  :
                    num == 5000 ? 'Mestre' :
                    'ELO NÃO EXISTE'
                }
            }
        }))
        app.set('view engine', 'handlebars')
        app.set('views', `./app/views`)
        app.use(cors())
        app.use(session({ 
            secret: sec, 
            cookie: { maxAge: globalConfig.maxAge },
            saveUninitialized: true,
            resave: false
        }))
        app.use(express.static('./public'))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(rotas)
        app.use( ( req, res, next ) => {
            res.status( 404 ).render( "notfound", {subtitle: "Página não encontrada"})
          })
        const PORT =  globalConfig.port || 3333
        app.listen(PORT, () => {
        console.log(`[server]Server is listening on  http://localhost:${PORT}`)
        })
    }

    function stop(){
        console.log('[server] proccess stoped')
    }

    return{
        start,
        stop
    }
    
}


export default createServer