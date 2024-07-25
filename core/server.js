import express from "express"
import bodyParser from "body-parser"
import rotas from "../app/routes/app.routes"
import es6Renderer from 'express-es6-template-engine'
import cors from 'cors'
import { globalConfig } from "../chinelo.config"



function createServer(){

    async function start(){
        
        const app = express()
        app.engine('html', es6Renderer)
        app.set('views', './app/views')
        app.set('view engine', 'html')
        //app.set('view engine', 'pug')
        app.use(cors())
        app.use(express.static('./public'))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(rotas)
        app.use( ( req, res, next ) => {
            res.status( 404 ).render( "notfound" )
          })
        const PORT =  globalConfig.port || process.env.PORT || 3333
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