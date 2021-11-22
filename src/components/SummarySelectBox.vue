<template>
   <div class="form">
      <select v-model="select_value" @change="onChange($event)">
         <option v-for="option in selected" v-bind:key="option.item" selected>{{ option.name }}</option>
      </select>
   </div>
</template>

<script>

export default {
   name: 'SummarySelectBox',
   props: {
      selected: {
         type: Array,
         default() {
            return []
         }
      },
      nameselected: {
         type: String,
         default: ''
      }
   },
   data() {
      return {
         select_value: null,
         add_place: false
      }
   },
   methods: {
      onChange: function(event) {
         if(this.nameselected == 'Образование' && event.target.options.selectedIndex !== 6) {
            this.add_place = true
            this.$emit("add_place", this.add_place)
         }
         else {
            this.add_place = false
            this.$emit("add_place", this.add_place)
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
