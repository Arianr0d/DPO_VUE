<template>
   <div class="form">
      <div class="left_form"><p>{{ namePlace }}</p></div>
      <div class="right_form">
         <div v-if="textarea === true">
            <b-textarea v-model="text_area_input" v-for="option in namePlaceHolder" v-bind:key="option.item - 1" :placeholder="option.name" style="height: 10vw; margin-bottom: 1vw;"/>
         </div>
         <div v-else>
            <b-input else v-model="input_value[option.item - 1]"
            @blur="changeFocus($event)"
            id="input_form"
            v-for="option in namePlaceHolder" v-bind:key="option.item - 1" :placeholder="option.name" autocomplete="off" 
            style="margin-bottom: 1vw;" required/>
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
         type: Array,
         default() {
            return []
         }
      },
      textarea: {
         type: Boolean,
         default: false
      }
   },
   data() {
      return {
         input_value: [],
         text_area_input: ''
      }
   },
   methods: {
      changeFocus: function(event) {
         if(this.namePlace === "Email") {
            for(let i=0; i<this.input_value.length; i++) {
               if(!this.validEmail(this.input_value[i])){
                  event.target.className += " error_form"
               }
               else {
                  event.target.className = " form-control"
               }
            }
         }
         else if(this.namePlace === "Номер телефона") {
            for(let i=0; i<this.input_value.length; i++) {
               if(!this.validNumberPhone(this.input_value[i])){
                  event.target.className += " error_form"
               }
               else {
                  event.target.className = "form-control"
               }
            }
         }
      },
      validEmail: function (email) {
         let re = /^([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2,4})?$/
         return re.test(email)
      },
      validNumberPhone: function(phone) {
         let re = /^((\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2})?$/
         return re.test(phone)
      }
   },
   watch: {
      text_area_input(new_value) {
         this.$emit("get_value", new_value)
      },
      input_value: {
         handler(val, oldVal) {
            this.$emit("get_value", val)
         },
         deep: true
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

   .error_form {
      border: 2px solid red;
   }

   @media (max-width: 1540px) {
      .form {
         display: flex;
         justify-content: center;
         flex-direction: row;
         margin-bottom: 10px;

         .left_form {
            width: 235px;
            text-align: left;
         }

         .right_form {
            width: 360px;
         }
      }
   }
</style>