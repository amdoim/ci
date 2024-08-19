
import { compact, clear } from "../utils/response.helper"

function Auth(){
    const login = async (req, res) => {
        res.send('asdf')
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