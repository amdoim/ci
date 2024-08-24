
import { compact, clear } from "../utils/response.helper"
import Db from "../model/app.model"
import md5 from "md5";

function Auth(){

    const login = async (req, res) => {
        req.session.loggedin = false
        req.session.user = null
        let {user, password} = req.query

        let hash = md5(password + process.env.DATABASE_URL)
        if (!user || !password) return res.send('fim')

        await Db.user.findUnique({
            where: {
                keyTec: clear(user),
                password: hash
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
                shift: true,
                password: true
            }
            }).then((response)=>{
                if(response && hash == response.password){
                    req.session.loggedin = true
                    req.session.user = response
                    console.log(req.session.user)
                    res.send('oik') 
                }
                res.send('n')
            
            }).catch((e)=>{
                console.log(e)
                res.status(404).render('notfound', compact({subtitle: "xxxxxxPágina não encontrada!xxxxxxxx"}))
            })
 









        // res.send('fimdetudo')
    }

    const register = async (req, res) => {
        const data = {
            subtitle: "Cadastrar Usuário"
        }
       return res.render('register', compact(data))
    }

    const edit = async (req, res) => {
        const data = {
            subtitle: "Atualizar Usuário",
            keyTec: clear(req.params.keyTec)
        }
       return res.render('updateuser', compact(data))
    }


    return {
        login,
        register,
        edit
    }
}

export default Auth()