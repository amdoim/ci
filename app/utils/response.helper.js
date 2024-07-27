import Mustache from "mustache"
import { globalConfig } from "../../chinelo.config"


export function validateEmail (email){
  return String(email)
}

let taitou = globalConfig.title
export function compact(data){
  return {... data, title: taitou}

}
export function render(view, data){

 
}