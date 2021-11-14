<template>
   <div class="form">
      <select>
         <option v-for="option in selected" v-bind:key="option.item" selected>{{ option.name }}</option>
      </select>
   </div>
</template>

<script>

export default {
   name: 'SummarySelectBox',
   props: {
      selected: {
         type: Object,
         default() {
            return []
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
</style>
