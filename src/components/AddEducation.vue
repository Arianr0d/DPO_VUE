<template>
   <div class="form">
      <div v-for="item in items" v-bind:key="item">
         <br><br>
         <summaryforminput :namePlace="'Учебное заведение'" :namePlaceHolder="educational_ins_name"/>
         <summaryforminput :namePlace="'Факультет'" :namePlaceHolder="faculty_name"/>
         <summaryforminput :namePlace="'Специализация'" :namePlaceHolder="specializ_name"/>
         <summaryforminput :namePlace="'Год окончания'" :namePlaceHolder="year_ending_name"/>
         <b-button v-if=" item != items[items.length-1] && item != items[0]" @click="delBlock(item)" variant="danger">Удалить</b-button>
      </div>
   </div>
</template>

<script>
import SummaryFormInput from '../components/SummaryFormInput.vue'

export default {
   name: 'AddEducation',
   components: {
      'summaryforminput': SummaryFormInput
   },
   props: {
      items: { type: Array }
   },
   data() {
      return {
         educational_ins_name: [{name: 'Учебное заведение', item: 1}],
         faculty_name: [{name: 'Факультет', item: 1}],
         specializ_name: [{name: 'Специализация', item: 1}],
         year_ending_name: [{name: 'Год окончания', item: 1}],
      }
   },
   methods: {
      delBlock: function(item) {
         this.items.splice(this.items.indexOf(item), 1)
         this.$emit("items", this.items)
      }
   }
}
</script>

<style scoped lang="scss"> 
   @import "../assets/scss/function.scss";

   .form {

      label, input {
         height: 40px;
         margin: 0 15px 20px 0;
      }
   }

</style>