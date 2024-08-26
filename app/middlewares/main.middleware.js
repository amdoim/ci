let count = 0
export function main(){
    count++
    console.log('[main.middleware] done ' + count)
}

export function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else res.redirect('/login')
  }

export function isAdmin (req, res, next) {
    if(req.session.user.role == 0) next()
    else res.render('msg', {color: 'red', msg:'Você não tem permissão para tal ato, por favor faça login como administrador ou fale com ele. xD'})
}