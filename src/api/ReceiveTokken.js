import fetchJsonp from 'fetch-jsonp'

export default function receiveTokken() {
   let id_user = '8018671'
   //`https://oauth.vk.com/authorize?client_id=${id_user}&display=page&redirect_uri=&scope=Database&response_type=token&v=5.52`

   //https://oauth.vk.com/access_token?client_id=8018671&client_secret=f3FMkXFnDsECfJnqMcIF&v=5.131&grant_type=client_credentials

   let res = fetchJsonp('https://oauth.vk.com/access_token?client_id=8018671&client_secret=f3FMkXFnDsECfJnqMcIF&v=5.131&grant_type=client_credentials')
      .then(function(response) {
         return response.json()
      }).then(function(json) {
         console.log('parsed json', json)
         return json
      })/*.catch(function(ex) {
         console.log('parsing failed', ex)
      })*/

      return res

      /*return fetchJsonp('https://oauth.vk.com/authorize?client_id=8018671&display=page&redirect_uri=&scope=Database&response_type=token&v=5.52', {
         method: 'POST',
         credentials: 'include',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             token,
         }),
         })
         .then((res) => {
             return JSON.stringify(res.json());
         });*/

}

export {receiveTokken} 