<template>
   <form action="#" id="form_id">
      <div class="group">
         <div class="left">Статус</div>
         <div class="right">
            <summaryselectbox @get_value="functionOn($event, 'name_status')" style="width: 450px" v-on:add_place="formChange($event)" :selected="form_status" :nameselected="'Статус'" 
            :select_default="0"/>
            <!--
               ! По умолчанию выбран статус "Новый"
            -->
         </div>
      </div>
      <summaryforminput @get_value="functionOn($event, 'full_name')" :namePlace="'ФИО'" :namePlaceHolder="full_name"/>
      <div class="group">
         <div class="left">Дата рождения</div>
         <div class="right">
            <div class="form-row">
               <b-input v-model="day" placeholder="День"/>
               <b-input v-model="month" placeholder="Месяц"/>
               <b-input v-model="year" style="margin-right: 0" placeholder="Год"/>
            </div>
         </div>
      </div>

      <div class="group">
         <div class="left"><label>Город</label></div>
         <div class="right">
            <selectboxsearchapi @get_value="functionOn($event, 'name_city')" v-on:id_c="valueCity($event)" :selected="city_name" :placeholderName="'Город'" :id_sel="'id_sel2'" :id_inp="'inp_city'" :selectOption="selectCityAPI" style="width: 450px"/>
         </div>
      </div>

      <summaryforminput @get_value="functionOn($event, 'email')" :namePlace="'Email'" :namePlaceHolder="email_name"/>
      <summaryforminput @get_value="functionOn($event, 'number_telephone')" :namePlace="'Номер телефона'" :namePlaceHolder="number_name"/>
      <div class="group">
         <div class="left">Образование</div>
         <div class="right">
            <summaryselectbox @get_value="functionOn($event, 'name_education')" style="width: 450px" v-on:add_place="formChange($event)" :selected="form_education" :nameselected="'Образование'"/>
         </div>
      </div>

      <div v-if="add_form">
         <addeducation @get_value="functionOnEducation" v-on:items="changeBlock($event)"  :items="count_block" :selectOptions="selectUnivAPI"/>
         <div class="btn_group">
            <b-button @click="addBlock" variant="primary">Указать ещё одно место обучения</b-button>
            <b-button v-if="count_block.length > 1" @click="deleteBlock" variant="danger">Удалить</b-button>
         </div>
         <br><br>
      </div>

      <summaryforminput @get_value="functionOn($event, 'professional_area')" :namePlace="'Профессиональная область'" :namePlaceHolder="profession_name"/>
      <summaryforminput @get_value="functionOn($event, 'key_skills')" :namePlace="'Ключевые навыки'" :namePlaceHolder="key_skill_name"/>
      <div class="group">
         <div class="left">Желаемая зарплата</div>
         <div class="right">
            <div class="form-row">
               <label>от</label>
               <b-input v-model="desired_salary_from" style="width: 100px; margin-right: 15px"/>
               <label>до</label>
               <b-input v-model="desired_salary_before" style="width: 100px; margin-right: 15px"/>
               <summaryselectbox @get_value="functionOn($event, 'currency')" :selected="form_currency"  
               :select_default="0"
               style="width: 80px; margin: 0;"/>
               <!--
                  ! По умолчанию выбрано значение "руб"
               -->
            </div>
         </div>
      </div>
      <summaryforminput @get_value="functionOn($event, 'about_me')" :namePlace="'О себе'" :namePlaceHolder="about_me_name" :textarea="true"/>  
      <div class="group">
         <div class="left"><label>Фотография</label></div>
         <div class="right">
            <input type="file" class="input_style" @change="imageSelected" id="cusomFile"/>
         </div>
      </div>
      <div class="group">
         <div class="left"></div>
         <div v-if="imagePreview" class="right">
            <img :src="imagePreview">
         </div>
      </div>
      <div class="btn_group">
         <b-button type="submit" variant="primary" @click="sendForm()">Сохранить</b-button>
      </div>
   </form>
</template>

<script>
import SummaryFormInput from '../components/SummaryFormInput.vue';
import SummarySelectBox from '../components/SummarySelectBox.vue';
import AddEducation from '../components/AddEducation.vue';
import SelectBoxSearchAPI from '../components/SelectBoxSearchAPI.vue';

export default {
  name: 'SummaryUser',
  components: {
     'summaryforminput': SummaryFormInput,
     'summaryselectbox': SummarySelectBox,
     'addeducation': AddEducation,
     'selectboxsearchapi': SelectBoxSearchAPI
  },
  data() {
     return {
        add_form: false,
        count_block: [1],

        form_status: [
           {name: 'Новый', item: 1},
           {name: 'Назначено собеседование', item: 2},
           {name: 'Принят', item: 3},
           {name: 'Отказ', item: 4}
        ],
        full_name: [
           {name: 'Фамилия', item: 1},
           {name: 'Имя', item: 2},
           {name: 'Отчество', item: 3}
        ],
        day: '',
        month: '',
        year: '',
        city_name: [{}],
        email_name: [{name: 'Email', item: 1}],
        number_name: [{name: '8 (---)--- -- --', item: 1}],
        profession_name: [{name: 'Профессия', item: 1}],
        key_skill_name: [{name: 'Введите название навыка', item: 1}],
        about_me_name: [{name: 'Введите дополнительную информацию о себе', item: 1}],

        desired_salary_from: '',
        desired_salary_before: '',
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
        ],

        selectCityAPI: {method: 'database.getCities',
        count: 8, country_id: 1, q: ''},
        selectUnivAPI: {method: 'database.getUniversities', count: 8, city_id: 0, country_id: 1, q: ''},

        formData: {}
     }
  },
  methods: {
     imageSelected(e) {
        this.image = e.target.files[0]
        
        let reader = new FileReader()
        reader.readAsDataURL(this.image)
        reader.onload = e => {
           this.imagePreview = e.target.result
           this.formData['photo'] = this.imagePreview
        }
     },
     formChange: function(event) {
        this.add_form = event
     },
     changeBlock: function(event) {
        this.count_block = event
     },
     addBlock: function() {
        this.count_block.push(this.count_block.length+1)
     },
     deleteBlock: function() {
        if(this.count_block.length > 1) {
            this.count_block.pop()
        }
     },
     valueCity: function(event) {
        this.selectUnivAPI.city_id = event
     },
     async sendForm() {
         if(this.formData != null) {
            let new_req = {
               status: this.formData.name_status,
               surname: this.formData.full_name[0],
               name: this.formData.full_name[1],
               patronymic: this.formData.full_name[2],
               day_birth: this.formData.day,
               month_birth: this.formData.month,
               year_birth: this.formData.year,
               name_city: this.formData.name_city,
               email: this.formData.email[0],
               telephone: this.formData.number_telephone[0],
               education: this.formData.name_education,
               name_institution: this.formData.name_university,
               name_faculty: this.formData.name_faculty[0],
               specialization: this.formData.name_specialization[0],
               year_of_ending: this.formData.date_ending[0],
               professional_area: this.formData.professional_area[0],
               key_skills: this.formData.key_skills[0],
               desired_salary_from: this.formData.desired_salary_from,
               desired_salary_before: this.formData.desired_salary_before,
               currency: this.formData.currency,
               about_me: this.formData.about_me,
               photo: "",
            }
            console.log(new_req)
            let req = await fetch('http://localhost:5000/api/summary', {
               method: 'POST',
               mode: 'no-cors',
               body: JSON.stringify(new_req), 
               headers: {
                  'Content-Type': 'application/json'
               }
            }).then(response => response.json())
            console.log(req)
         }
     }, 
     functionOn(value, name_place) {
        this.formData[name_place] = value
     },
     functionOnEducation(value) {
        this.formData[value.name_place] = value.value
     }
  },
  watch: {
     day(new_value) {
        this.formData['day'] = new_value
     },
     month(new_value) {
        this.formData['month'] = new_value
     },
     year(new_value) { 
        this.formData['year'] = new_value
     },
     desired_salary_from(new_value) {
         this.formData['desired_salary_from'] = new_value
     },
     desired_salary_before(new_value) {
         this.formData['desired_salary_before'] = new_value
     }
  }
}
</script>

<style scoped lang="scss">
   @import "../assets/scss/function.scss";

   form {
      margin: 0 30vw;

      .group {
         display: flex;
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

            .form-row {
               width: 100%;
               display: flex;
               flex-direction: row;
            }

            .input_style {
               width: 100%;
               margin: 0px;
            }
         }
      }
   }

   label, input {
      height: 40px;
      margin: 0 15px 20px 0;
   }

   img {
      height: vw(250);
      border-radius: 5px;
   }

   button {
      height: 40px;
      padding: 0 20px;
      margin: 0 20px;
   }

   .right_posintion {
      width: vw(450);
      display: flex;
      justify-content: right;
   }

   .btn_group {
      display: flex;
      justify-content: center;
      margin-bottom: vw(40);
   }

   @media (max-width: 1540px) {
      form {
         margin: 0 30px;
         display: flex;
         justify-content: left;
         flex-direction: column;

         .group {
            display: flex;
            justify-content: center;
            flex-direction: row;
            margin-bottom: 15px;

            .left {
               width: 235px;
               text-align: left;
            }

            .right {
               width: 360px;
               display: flex;
               justify-content: center;
            }
         }

         img {
            height: 200px;
            border-radius: 5px;
         }

         label, input {
            height: 40px;
            margin-right: 15px;
         }
      }
   }
</style>
