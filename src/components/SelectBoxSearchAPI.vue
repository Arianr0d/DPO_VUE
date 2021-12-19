<template>
   <div class="form">
      <b-input v-model="input_value" :list="id_sel" @input="searchText()" type="search" @focus="FocusInput(id_inp)" :placeholder="placeholderName" autocomplete="off" @change="changeFocus($event)" :id="id_inp">
      </b-input>

      <datalist :id="id_sel">
         <div v-if="selectOption.method == 'database.getCities'">
            <div v-for="item in select" v-bind:key="item.id">
               <option v-if="item.region == undefined" :value="item.title"/>
               <option v-else-if="item.region != undefined && select.length > 0" :value="item.title + ', ' + item.region"/>
               <option else value=""/>
            </div>
         </div>
         <div v-if="selectOption.method == 'database.getUniversities'">
            <div v-for="item in select" v-bind:key="item.id">
               <option v-if="select.length > 0" :value="item.title"/>
               <option else value=""/>
            </div>
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
      },
      id_sel: {type: String },
      id_inp: {type: String }
   },
   data() {
      return {
         input_value: '',
         select: []
      }
   },
   methods: {
      searchText: async function() {
         this.selectOption.q = this.input_value
         this.select = await selectAPI(this.selectOption)
      },
      changeFocus: function(event) {
         for(let i=0; i<this.select.length; i++) {
            if(`${this.select[i].title}, ${this.select[i].region}` == event) {
               let id_c = this.select[i].id
               this.$emit("id_c", id_c)
            }
         }
      },
      FocusInput: function(id) {
         if(this.selectOption.method == 'database.getUniversities' && this.selectOption.city_id == 0) {
            document.getElementById(id).className += " error_form"
            document.getElementById(id).placeholder = 'Введите название города!'
            /*
               ! вывод ошибки
            */
           document.getElementById('inp_city').focus()
         }
         else if(this.selectOption.method == 'database.getUniversities' && this.selectOption.city_id != 0) {
            document.getElementById(id).className = " form-control"
            document.getElementById(id).placeholder = this.placeholderName
         }
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

   .error_form {
      border: 2px solid red;
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