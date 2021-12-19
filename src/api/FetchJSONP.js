import fetchJsonp from 'fetch-jsonp'

export default async function selectAPI(option) {
   const TOKEN = 'cbf8caba2cfa59c54d3e1441c4df9ec284169ac9d2fcee55350a49219bd6a21d8c5d2a00a4b8966753dcf'

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