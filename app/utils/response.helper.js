<<<<<<< HEAD
import { globalConfig } from "../../chinelo.config";
=======

import { globalConfig } from "../../chinelo.config"
>>>>>>> eslint

export function validateEmail(email) {
  return String(email);
}

<<<<<<< HEAD
export function compact(data) {
  return { ...data, title: globalConfig.title, url: globalConfig.mainUrl };
}
=======
export function compact(data){

  return {... data, title: globalConfig.title, url: globalConfig.mainUrl}

}
export function render(view, data){


}
>>>>>>> eslint
