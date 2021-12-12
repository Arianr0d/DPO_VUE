<template>
   <div class="form">
      <div>{{ info }}</div>
   </div>
</template>

<script>
import SummaryFormInput from '../components/SummaryFormInput.vue'

export default {
   name: 'FormAPI',
   components: {
      'summaryforminput': SummaryFormInput
   },
   data() {
      return {
         info: null
      }
   },
   /*mounted() {
      axios
         .get('https://api.coindesk.com/v1/bpi/currentprice.json')
         .then(response => (this.info = response))
   },*/
   actions: {
      async getCoordbyAddress(ctx, address){
         try {
            let key = "https://oauth.vk.com/authorize?client_id={8018671}&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,notify,photos,wall,email,mail,groups,stats,offline&response_type=token&v=5.74"
            let res = await api(url, 'POST', address)
            return res
         }
         catch (e) {
            return e.message
         }
      }
   },

}
</script>

<style scoped lang="scss">

</style>