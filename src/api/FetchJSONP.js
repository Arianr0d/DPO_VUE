import fetchJsonp from 'fetch-jsonp'
import { receiveTokken } from '../api/ReceiveTokken.js'

export default async function selectAPI(option) {

   //console.log(receiveTokken())

   const TOKEN = '76dd833da3b5e62c58e8830dfabc225cc5b898268115a8baaac76ea0b77d28831bd968bc35d694c105b07'

   //https://oauth.vk.com/authorize?client_id=8018671&display=page&redirect_uri=&scope=Database&response_type=token&v=5.52

   if(option.method == 'database.getUniversities') {
      let res = await fetchJsonp(`https://api.vk.com/method/${option.method}?count=${option.count}&city_id=${option.city_id}&country_id=${option.country_id}&q=${option.q}&access_token=${TOKEN}&v=5.131`)
      .then(function(response) {
         return response.json()
      }).then(function(json) {
         console.log('parsed json', json)
         return json.response.items
      }).catch(function(ex) {
         console.log('parsing failed', ex)
      })

      return res
   }
   else if (option.method == 'database.getCities') {
      let res = await fetchJsonp(`https://api.vk.com/method/${option.method}?count=${option.count}&country_id=${option.country_id}&region_id=&q=${option.q}&access_token=${TOKEN}&v=5.131`)
      .then(function(response) {
         return response.json()
      }).then(function(json) {
         //console.log('parsed json', json)
         return json.response.items
      }).catch(function(ex) {
         console.log('parsing failed', ex)
      })

      return res
   }
}

export {selectAPI} 