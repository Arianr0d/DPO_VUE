import fetchJsonp from 'fetch-jsonp'

async function selectAPI(option) {
   const TOKEN = '149d393d14d2b75e93e7fd16780783fb722bafb5251cf0ab7df477eb5763ad7aad47de4aafc89b3781b1b'

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
   }
   else if (option.method == 'database.getCities') {
      let res = await fetchJsonp(`https://api.vk.com/method/${option.method}?count=${option.count}&country_id=${option.country_id}&region_id=${option.region_id}&q=${option.q}&access_token=${TOKEN}&v=5.131`)
      .then(function(response) {
         return response.json()
      }).then(function(json) {
         console.log('parsed json', json)
         return json.response.items
      }).catch(function(ex) {
         console.log('parsing failed', ex)
      })

      console.log(res)
   }
}