import express from "express"
import bodyParser from "body-parser"
import rotas from "./app/routes/app.routes"
import cors from 'cors'
import { globalConfig } from "./chinelo.config"
import { engine } from "express-handlebars"
import session from "express-session"
import { compact } from "./app/utils/response.helper"

const sec = process.env.DATABASE_URL

function createServer(){

    async function start(){
        
        const app = express()
        app.engine('handlebars',engine())
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
            res.status( 404 ).render( "notfound", compact({subtitle: "Página não encontrada"}) )
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