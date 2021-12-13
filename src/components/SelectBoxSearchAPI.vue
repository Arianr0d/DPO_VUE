<template>
   <div class="form">
      <b-input v-model="input_value" list="select" @input="searchText()" type="search" :placeholder="placeholderName" autocomplete="off">
      </b-input>
      <datalist id="select">
         <div v-for="item in select" v-bind:key="item.id">
            <option v-if="item.region == undefined" :value="item.title"/>
            <option v-else-if="item.region != undefined && select.length > 0" :value="item.title + ', ' + item.region"/>
            <option else value=""/>
         </div>
      </datalist>
   </div>
</template>

<script>
import { selectAPI } from '../api/FetchJSONP.js'

export default {
   name: 'SelectBoxSearchAPI',
   props: {
      selected: {
         type: Array,
         default() {
            return []
         }
      },
      selectOption: {
         type: Object,
         default() {
            return {}
         }
      },
      placeholderName: {
         type: String,
         default: ''
      }
   },
   data() {
      return {
         input_value: '',
         select: [{}]
      }
   },
   methods: {
      searchText: async function() {
         this.selectOption.q = this.input_value
         this.select = await selectAPI(this.selectOption) 
         console.log(this.select)
      }
   }
}
</script>

<style scoped lang="scss">
   @import "../assets/scss/function.scss";

   .form {

      select {
         height: 40px;
         width: 100%;
         border-radius: 5px;
         border: 1px solid #CFD0D1;
         cursor: pointer;

         margin-bottom: vw(20);
         padding-left: 8px;
      }

      select:hover,
      select:active,
      select::after {
         border-radius: 5px;
         border: 1px solid #CFD0D1;
      }
   }

   @media (max-width: 1540px) {
      form {
         select {
            height: 40px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #CFD0D1;
            cursor: pointer;

            margin-bottom: 10px;
            padding-left: 8px;
         }

         select:hover,
         select:active {
            border-radius: 5px;
            border: 1px solid #CFD0D1;
         }
      }
   }
</style>