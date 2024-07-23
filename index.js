import { Core } from './core.js'

const core = Core()

try {
    console.log('[index] cold started')
    core.start()

} catch (error) {

    console.log('[index] an error occurred')
    console.log('[index]', error)

}