

function mainMiddleware() {
        
    let count = 0
    const  main = (req, res)=>{
        count++
        console.log('[main.middleware] done ' + count)
    }

    const isAuthenticated = (req, res, next) => {
        if (req.session.user) next()
        else {
            res.redirect('/login')
            next()
        }
    }

    const isAdmin = (req, res, next) => {

        if(req.session.user && req.session.user.role == 0) next()
          
        res.status(403).render('msg', {color: 'red', msg:`Olá!!! Você não tem permissão para tal ato, por favor faça login como administrador ou fale com ele. xD<br> <a href='/' class='w3-btn w3-pale-green' > Voltar ao início </a>`, subtitle:'Atenção! ', user: req.session.user})

    }

    return {
        main,
        isAuthenticated,
        isAdmin
    }
}

export default mainMiddleware()