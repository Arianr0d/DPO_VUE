function instance() {
   let token = 'daf08b5f012ca770b06b1485eecc2762606720d1120b346c190bab08e173755150918303862f23b1f3069'

   fetch('https://api.vk.com/method/getUniversities?count=5&access_token=daf08b5f012ca770b06b1485eecc2762606720d1120b346c190bab08e173755150918303862f23b1f3069&q=ЛГ&v=5.52').then(response => {
      this.displayedBooks = response.data
   }, error =>{
      console.log(error)
   })
}