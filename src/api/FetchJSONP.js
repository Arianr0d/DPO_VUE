import fetchJsonp from 'fetch-jsonp'

export default async function selectAPI(option) {
   const TOKEN = '8319fa7ae51e8e2b0f3129f1087322499ce647fe5d3fc07d7be9450e3f160c9a9a187d542827fbef0b1d9'

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

      console.log(res)
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