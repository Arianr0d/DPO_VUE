import fetchJsonp from 'fetch-jsonp'

export default async function selectAPI(option) {
   const TOKEN = '56097722d1b87dd23212c410d427de6f89901e64e262b6cf3d1b3940f575027787c14d220930c058f1a85'

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

      //console.log(res)
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

      //console.log(res)
      return res
   }
}

export {selectAPI} 