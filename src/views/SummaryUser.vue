<template>
   <form action="#">
      <summaryforminput :namePlace="'ФИО'" :namePlaceHolder="full_name"/>
      
      <div class="group">
         <div class="left">Дата рождения</div>
         <div class="right">
            
         </div>
      </div>

      <summaryforminput :namePlace="'Город'" :namePlaceHolder="city_name"/>
      <summaryforminput :namePlace="'Email'" :namePlaceHolder="email_name"/>
      <summaryforminput :namePlace="'Номер телефона'" :namePlaceHolder="number_name"/>
      <div class="group">
         <div class="left">Образование</div>
         <div class="right">
            <summaryselectbox :selected="form_education" style="width: 450px;"/>
         </div>
      </div>
      <summaryforminput :namePlace="'Профессиональная область'" :namePlaceHolder="profession_name"/>
      <summaryforminput :namePlace="'Ключевые навыки'" :namePlaceHolder="key_skill_name"/>
      <div class="group">
         <div class="left">Желаемая зарплата</div>
         <div class="right">
            <div class="form-salary">
               <label>от</label>
               <b-input style="width: 100px;"/>
               <label>до</label>
               <b-input style="width: 100px;"/>
               <summaryselectbox :selected="form_currency" style="width: 80px"/>
            </div>
         </div>
      </div>
      <summaryforminput :namePlace="'О себе'" :namePlaceHolder="about_me_name" :textarea="true"/>  
      <div class="group">
         <div class="left"><label>Фотография</label></div>
         <div class="right">
            <input type="file" @change="imageSelected" id="cusomFile"/>
         </div>
      </div>
      <div class="group">
         <div class="left"></div>
         <div v-if="imagePreview" class="right">
            <img :src="imagePreview">
         </div>
      </div>
      <b-button type="submit" variant="primary">Сохранить</b-button>
   </form>
</template>

<script>
import SummaryFormInput from '../components/SummaryFormInput.vue';
import SummarySelectBox from '../components/SummarySelectBox.vue';

export default {
  name: 'SummaryUser',
  components: {
     'summaryforminput': SummaryFormInput,
     'summaryselectbox': SummarySelectBox
  },
  data() {
     return {
        full_name: [
           {name: 'Фамилия', item: 1},
           {name: 'Имя', item: 2},
           {name: 'Отчество', item: 3}
        ],
        city_name: [{name: '', item: 1}],
        email_name: [{name: 'Email', item: 1}],
        number_name: [{name: '8 (---) --- -- --', item: 1}],
        profession_name: [{name: 'Профессия', item: 1}],
        key_skill_name: [{name: 'Введите название навыка', item: 1}],
        about_me_name: [{name: 'Введите дополнительную информацию о себе', item: 1}],

        image: null,
        imagePreview: null,

        form_education: [ 
           {name: 'Высшее', item: 1}, 
           {name: 'Бакалавр', item: 2},
           {name: 'Магистр', item: 3},
           {name: 'Кандидат наук', item: 4},
           {name: 'Доктор наук', item: 5},
           {name: 'Незаконченное высшее', item: 6},
           {name: 'Среднее', item: 7},
           {name: 'Среднее специальное', item: 8}
        ],
        form_currency: [
           {name: 'руб', item: 1},
           {name: 'EUR', item: 2},
           {name: 'USD', item: 3}
        ]
     }
  },
  methods: {
     imageSelected(e) {
        this.image = e.target.files[0]
        
        let reader = new FileReader()
        reader.readAsDataURL(this.image)
        reader.onload = e => {
           this.imagePreview = e.target.result
        }
     }
  }
}
</script>

<style scoped lang="scss">
   @import "../assets/scss/function.scss";

   form {

      .group {
         display: flex;
         justify-content: center;
         flex-direction: row;
         margin-bottom: vw(30);

         .left {
            width: vw(300);
            text-align: left;
         }

         .right {
            width: vw(450);
            display: flex;
            justify-content: left;

            .form-salary {
               display: flex;
               justify-content: left;
               flex-direction: row;
            }
         }
      }
   }

   label, input {
      height: 40px;
      margin-right: vw(15);
   }

   img {
      height: vw(250);
      border-radius: 5px;
   }

   button {
      margin: 0 0 vw(60) vw(600);
      height: vw(40);
      width: vw(150);
   }
</style>
