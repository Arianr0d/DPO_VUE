<template>
   <div class="form">
      <b-input v-model="input_value" @input="searchText()" type="search">
         <option v-for="option in select" v-bind:key="option.id" selected>{{ option.title }}</option>
      </b-input>
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
      }
   },
   data() {
      return {
         input_value: '',
         select: [{}]
      }
   },
   methods: {
      searchText: function() {
         this.selectOption.q = this.input_value
         this.select = selectAPI(this.selectOption)
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