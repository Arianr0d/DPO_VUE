<template>
   <form action="#" id="form_id">
      <formapi></formapi>

      <div class="group">
         <div class="left">Статус</div>
         <div class="right">
            <summaryselectbox style="width: 450px" v-on:add_place="formChange($event)" :selected="form_status" :nameselected="'Статус'" 
            :select_default="0"/>
            <!--
               ! По умолчанию выбран статус "Новый"
            -->
         </div>
      </div>
      <summaryforminput :namePlace="'ФИО'" :namePlaceHolder="full_name"/>
      <div class="group">
         <div class="left">Дата рождения</div>
         <div class="right">
            <div class="form-row">
               <b-input placeholder="День"/>
               <b-input placeholder="Месяц"/>
               <b-input style="margin-right: 0" placeholder="Год"/>
            </div>
         </div>
      </div>
      <summaryforminput :namePlace="'Город'" :namePlaceHolder="city_name"/>
      <summaryforminput :namePlace="'Email'" :namePlaceHolder="email_name"/>
      <summaryforminput :namePlace="'Номер телефона'" :namePlaceHolder="number_name"/>
      <div class="group">
         <div class="left">Образование</div>
         <div class="right">
            <summaryselectbox style="width: 450px" v-on:add_place="formChange($event)" :selected="form_education" :nameselected="'Образование'"/>
         </div>
      </div>

      <div v-if="add_form">
         <addeducation v-on:items="changeBlock($event)" :items="count_block"/>
         <div class="btn_group">
            <b-button @click="addBlock" variant="primary">Указать ещё одно место обучения</b-button>
            <b-button v-if="count_block.length > 1" @click="deleteBlock" variant="danger">Удалить</b-button>
         </div>
         <br><br>
      </div>

      <summaryforminput :namePlace="'Профессиональная область'" :namePlaceHolder="profession_name"/>
      <summaryforminput :namePlace="'Ключевые навыки'" :namePlaceHolder="key_skill_name"/>
      <div class="group">
         <div class="left">Желаемая зарплата</div>
         <div class="right">
            <div class="form-row">
               <label>от</label>
               <b-input style="width: 100px; margin-right: 15px"/>
               <label>до</label>
               <b-input style="width: 100px; margin-right: 15px"/>
               <summaryselectbox :selected="form_currency"  
               :select_default="0"
               style="width: 80px; margin: 0;"/>
               <!--
                  ! По умолчанию выбрано значение "руб"
               -->
            </div>
         </div>
      </div>
      <summaryforminput :namePlace="'О себе'" :namePlaceHolder="about_me_name" :textarea="true"/>  
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
         <b-button type="submit" variant="primary">Сохранить</b-button>
      </div>
   </form>
</template>

<script>
import FormAPI from '../components/FormAPI.vue'

import SummaryFormInput from '../components/SummaryFormInput.vue';
import SummarySelectBox from '../components/SummarySelectBox.vue';
import AddEducation from '../components/AddEducation.vue'

import fetchJsonp from 'fetch-jsonp'
//import instance from '../api/instance.js'
import { axios } from '@/plugins/axios'
//import { Api } from 'vk-api-glory'
//import VKAuth from '@dyadikov/vue-vk-oauth2'


export default {
  name: 'SummaryUser',
  components: {
     'formapi': FormAPI,

     'addeducation': AddEducation,
     'summaryforminput': SummaryFormInput,
     'summaryselectbox': SummarySelectBox
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
        city_name: [{name: '', item: 1}],
        email_name: [{name: 'Email', item: 1}],
        number_name: [{name: '8 (---)--- -- --', item: 1}],
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
     },
     formChange: function(event) {
        this.add_form = event
     },
     changeBlock: function(event) {
        console.log(event)
        this.count_block = event
     },
     addBlock: function() {
        this.count_block.push(this.count_block.length+1)
     },
     deleteBlock: function() {
        if(this.count_block.length > 1) {
            this.count_block.pop()
        }
     }
  },
   async mounted() {

      let res = await fetchJsonp('https://api.vk.com/method/database.getUniversities?count=5&city_id=2&access_token=149d393d14d2b75e93e7fd16780783fb722bafb5251cf0ab7df477eb5763ad7aad47de4aafc89b3781b1b&v=5.131')
      .then(function(response) {
         return response.json()
      }).then(function(json) {
         console.log('parsed json', json)
         return json.response.items
      }).catch(function(ex) {
         console.log('parsing failed', ex)
      })

      console.log(res)


      let val = `method${res}`
      console.log(val)
      /*const accessToken = "5bb7a0695bb7a0695be81336e25bcdfa8655bb75bb7a0693a01af2e34264873ac1ba015"
      const VK_APP_ID = '8018671'

      VKAuth.Api('database.getUniversities', {user_ids: VK_APP_ID, v: '5.131'})
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
         }
      )*/

    /*try {
        let api = "https://api.vk.com/method/database.getUniversities?count=5&city_id=2&access_token=5bb7a0695bb7a0695be81336e25bcdfa8655bb75bb7a0693a01af2e34264873ac1ba015&v=5.131"

        let options = {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            method: "POST"
        }
        let res = await fetch(api, options)
        return res.json()
    }
    catch (e) {
        return {error: e}
    }*/


     /*this.$axios({url: 'https://api.vk.com/method/database.getUniversities?count=5&access_token=6d3548f4f2b081519ba360147fd16599b3724ddb681191cbfd62b21319390434947263089cc7f51e4ee0d&v=5.52', headers: {"Accept": "application/json"}, methods: "GET"} 
     ).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.response);
      });*/


     /*let res = axios.get('https://api.vk.com/method/database.getUniversities?count=5&access_token=6d3548f4f2b081519ba360147fd16599b3724ddb681191cbfd62b21319390434947263089cc7f51e4ee0d&v=5.81').then(response => (this.info = response))

     console.log(res)*/
     /*let token = '6d3548f4f2b081519ba360147fd16599b3724ddb681191cbfd62b21319390434947263089cc7f51e4ee0d'

      $.ajax({
         url: 'https://api.vk.com/method/friends.getSuggestions?f...'+$filter+'&fields='+$fields+'&count=500&access_token='+$token+'&v=5.103',
         type: 'GET',
         dataType: 'jsonp',
         crossDomain: true,
         success: function(data){
            console.log(data.response);
         }
      })*/

      /*$.ajax({
         url: "https://api.vk.com/method/database.getUniversities?count=5&city_id=2&access_token=5abe2aabc3cd17056ce8b6e752041fc14b707384c5d7db0df90f8685c6468aa7c1023179f7fc5ff03927b&v=5.131",
         type: 'GET',
         dataType: 'jsonp',
         crossDomain: true
      }).then(function(response) {
         console.log("Success", response.data)
      }, function(response) {
         console.log("Error", response.statusText)
      })*/

      /*let res = ajax({
         url: 'https://api.vk.com/method/database.getUniversities?count=5&city_id=2&access_token=5abe2aabc3cd17056ce8b6e752041fc14b707384c5d7db0df90f8685c6468aa7c1023179f7fc5ff03927b&v=5.131',
         method: 'GET',
         dataType: 'JSON',
         success: function(data) {
            console.log(data)
         }
      })
      console.log(res)*/

      /*fetch('https://api.vk.com/method/getUniversities?count=5&access_token=daf08b5f012ca770b06b1485eecc2762606720d1120b346c190bab08e173755150918303862f23b1f3069&q=ЛГ&v=5.52')
      .then(response => {
         this.displayedBooks = response.data
      }, error =>{
         console.log(error)
      })
  }*/
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
