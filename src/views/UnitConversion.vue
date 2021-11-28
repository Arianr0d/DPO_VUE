<template>
   <div class="main_form">
      <div class="group">
         <b-input v-model.number="left_value" placeholder="Введите значение" class="width_el"/>
         <select v-model="left_select" @change="onChange_left($event)">
            <option v-for="option in unit" v-bind:key="option.item" selected>{{ option.name }}</option>
         </select>
      </div>
      <div class="group">
         <img src="../assets/img/arrow.png">
         <b-button variant="success" @click="FunConversion($event)">Рассчитать</b-button>
      </div>
      <div class="group">
         <b-input v-model.number="right_value" placeholder="Результат" class="width_el"></b-input>
         <select v-model="right_select" @change="onChange_right($event)">
            <option v-for="option in unit" v-bind:key="option.item" selected>{{ option.name }}</option>
         </select>
      </div>
   </div>
</template>

<script>
import {Calculation} from '../conversion.js'

export default {
   name: 'UnitConversion',
   data() {
      return {
         left_value: null,
         right_value: null,
         left_select: 'Град',
         right_select: 'Градус',
         left_index: 0,
         right_index: 1,

         unit: [
            {name: 'Град', item: 1},
            {name: 'Градус', item: 2},
            {name: 'Радиан', item: 3},
            {name: 'Угловая секунда', item: 4},
            {name: 'Минута дуги', item: 5}
         ]
      }
   },
   methods: {
      FunConversion: function(event) {
         if((this.left_value === null || this.left_value === '') && (this.right_value === null || this.right_value === '')) {
            alert("Введите значение!")
         }
         else if((this.right_value !== null || this.right_value !== '') && (this.left_value === null || this.left_value === '')) {
            this.left_value = Calculation(this.right_value, this.right_index, this.left_index)
         }
         else if(this.left_value !== null || this.left_value !== '') {
            this.right_value = Calculation(this.left_value, this.left_index, this.right_index)
         }
      },
      onChange_left: function(event) { 
         this.left_index = event.target.options.selectedIndex
         /*
            ! запись возвращает индекс выбранной позиции select
         */
      },
      onChange_right: function(event) {
         this.right_index = event.target.options.selectedIndex
      }
   }
}
</script>

<style scoped lang="scss">
   @import "../assets/scss/function.scss";

   .main_form {    
      display: flex;
      justify-content: center;
      flex-direction: row;

      .group {
         display: flex;
         flex-direction: column;
         align-items: center;

         button {
            width: 150px;
            height: 40px;
            margin: 25px 0 0 0;
         }

         img {
            height: 100px;
            margin: 0px 20px;
         }
      }
   }

   .width_el {
      width: vw(350);
      height: 50px;
   }

   select {
      height: 40px;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #CFD0D1;
      cursor: pointer;

      margin-bottom: vw(20);
      padding-left: vw(8);
   }

   select:hover,
   select:active,
   select::after {
      border-radius: 5px;
      border: 1px solid #CFD0D1;
   }

   @media (max-width: 930px) {
      .width_el {
         width: 170px;
         height: 50px;
      }
   }
</style>