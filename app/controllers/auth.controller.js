import express from "express"
import { compact } from "../utils/response.helper"

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



    return {
        login,
        register
    }
}

export default Auth()