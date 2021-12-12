<template>
   <div class="form">
      <div class="left_form"><p>{{ namePlace }}</p></div>
      <div class="right_form">
         <b-input type="search" v-model="input_value" style="margin-bottom: 1vw;"/>
      </div>
   </div>
</template>

<script>

export default {
   name: 'InputSearchAPI',
   props: {
      namePlace: {
         type: String, 
         default: ''
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
         input_value: ''
      }
   }
}
</script>

<style scoped lang="scss">
   @import "../assets/scss/function.scss";

   .form {
      display: flex;
      justify-content: center;
      flex-direction: row;
      margin-bottom: vw(30);

      .left_form {
         width: vw(300);
         text-align: left;
      }

      .right_form {
         width: vw(450);
      }
   }
</style>