import express from "express"
import bodyParser from "body-parser"
import rotas from "./app/routes/app.routes"
import cors from 'cors'
import { globalConfig } from "./chinelo.config"
import { engine } from "express-handlebars"


//express-handlebars


function createServer(){

    async function start(){
        
        const app = express()
      //  app.engine('.hbs', engine({extname: '.hbs'}));
        app.engine('handlebars',engine())
        app.set('view engine', 'handlebars')
        // app.set("views", path.resolve(`${globalConfig.rootPath}`, "./app/views"));
        app.set('views', `./app/views`)
        app.use(cors())
        app.use(express.static('./public'))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(rotas)
        app.use( ( req, res, next ) => {
            console.log(globalConfig)
            
            res.status( 404 ).render( "notfound", {subtitle: '404 - Página não encontrada.', title: globalConfig.title} )

            next()

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