
import { compact, clear } from "../utils/response.helper"
import Db from "../model/app.model"
import md5 from "md5";

function Auth(){

    const login = async (req, res) => {
      
        const {user, password} = req.body

        if(req.session.user) res.redirect(`@${req.session.user.keyTec}`) 
        let hash = md5(password + process.env.DATABASE_URL)
        if (!user || !password) return res.render('login', compact({
            subtitle: 'Fazer Login '
        }))

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
                    res.redirect('@' + response.keyTec) 
                }
                res.render('login', compact({
                    subtitle: 'Fazer Login ',
                    user: user,
                    error: true
                }))
            
            }).catch((e)=>{
                console.log(e)
                res.status(404).render('notfound', compact({subtitle: "xxxxxxPágina não encontrada!xxxxxxxx"}))
            })

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

    const logout = async (req, res) =>{
        req.session.user = null
        req.session.loggedin = null
        res.redirect('/')
    }

    return {
        login,
        register,
        edit,
        logout
    }
}

export default Auth()