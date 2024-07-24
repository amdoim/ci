import { Core } from './core/core.js'

const core = Core()

core.start()
        .then(e=>console.log('[index] cold started'))
        .catch((error)=>{
            console.log('[index] an error occurred')
            console.log('[index]', error)
        })