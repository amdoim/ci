let count = 0
export function main(){
    count++
    console.log('[main.middleware] done ' + count)
}

function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else next('route')
  }