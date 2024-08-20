
import { compact, clear } from "../utils/response.helper"
import Db from "../model/app.model"

function Auth(){

    const login = async (req, res) => {
        const {user, password} = req.query

        if (!user || !password) return res.send('fim')

        await Db.user.findUnique({
            where: {
                keyTec: clear(user),
                active: Boolean(clear(password, 16))
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
				req.session.loggedin = true;
				req.session.user = user;
                console.log(req.session.loggedin, req.session.user)

                res.send('okokokok')
            
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