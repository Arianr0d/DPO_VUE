<template>
   <div class="form">
      <div class="left_form"><p>{{ namePlace }}</p></div>
      <div class="right_form">
         <div v-if="textarea === true">
            <b-textarea v-for="option in namePlaceHolder" v-bind:key="option.item" :placeholder="option.name" style="height: 10vw; margin-bottom: 1vw;"/>
         </div>
         <div v-else>
            <b-input  else v-for="option in namePlaceHolder" v-bind:key="option.item" :placeholder="option.name" style="margin-bottom: 1vw;"/>
         </div>
      </div>
   </div>
</template>

<script>

export default {
   name: 'SummaryFormInput',
   props: {
      namePlace: {
         type: String,
         default: ''
      },
      namePlaceHolder: {
         type: Object,
         default() {
            return []
         }
      },
      textarea: {
         type: Boolean,
         default: false
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