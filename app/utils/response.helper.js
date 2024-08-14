
import { globalConfig } from "../../chinelo.config"
import bcrypt from "bcrypt"


export function validateEmail (email){
  return String(email)
}

export function compact(data){

  return {... data, title: globalConfig.title, url: globalConfig.mainUrl}

}

export async function hash (data2hash){
  const saltRounds = 3;
  const myPlaintextPassword = data2hash

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    if (err) throw err;
    console.log(hash);
    return hash;
  })


}