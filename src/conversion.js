/* 
   !функция расчёта значения правого input
   TODO: index_1 - ед. изм., из которой надо перевести, index_2 - ед. изм., в которую надо перевести
*/
function Calculation(value, index_1, index_2) {
   let result

   switch(index_1) {
               
      case 0:     // Град
         result = fromGrad(value, index_2)
         break
      case 1:     // Градус
         result = fromDegree(value, index_2)
         console.log(result)
         break
      case 2:     // Радиан
         result = fromRadian(value, index_2)
         break
      case 3:     // Угловая секунда
         result = fromAngularSecond(value, index_2)
         break 
      case 4:     // Минута дуги
         result = fromArcMinute(value, index_2)
         break   
      default: 
         alert("Выберите единицу измерения")           
   }

   return result
}

// ИЗ ГРАДА
function fromGrad(value, index) {
   let result

   switch(index) {
      case 0:  // Град
         result = value
         break
      case 1:   // Градус
         result = value * (180.0 / 200.0)
         break
      case 2:   // Радиан
         result = value * (Math.PI / 200.)
         break
      case 3:   // Угловая секунда
         result = value * 3240
         break
      case 4:   // Минута дуги
         result = value * 54
         break
      default: 
         alert("Выборите единицу измерения")
      
   }
   return result
}

// ИЗ ГРАДУСА
function fromDegree(value, index) {
   let result

   switch(index) {
      case 0:  // Град
         result = value * (200.0 / 180.0)
         break
      case 1:   // Градус
         result = value
         break
      case 2:   // Радиан
         result = value * (Math.PI / 180.)
         break
      case 3:   // Угловая секунда
         result = value * 3600
         break
      case 4:   // Минута дуги
         result = value * 60
         break
      default: 
         alert("Выборите единицу измерения")
         break
   }
   return result
}

// ИЗ РАДИАН
function fromRadian(value, index) {
   let result

   switch(index) {
      case 0:  // Град
         result = value * (200.0 / Math.PI)
         break
      case 1:   // Градус
         result = value * (180.0 / Math.PI)
         break
      case 2:   // Радиан
         result = value
         break
      case 3:   // Угловая секунда
         result = value * (3600.0 * 180.0) / Math.PI
         break
      case 4:   // Минута дуги
         result = value * (60.0 * 180.0) / Math.PI
         break
      default: 
         alert("Выборите единицу измерения")
   }
   return result
}

// ИЗ УГЛОВОЙ СЕКУНДЫ
function fromAngularSecond(value, index) {
   let result

   switch(index) {
      case 0:  // Град
         result = value / 3240.0
         break
      case 1:   // Градус
         result = value / 3600.0
         break
      case 2:   // Радиан
         result = value * Math.PI / (180.0 * 3600)
         break
      case 3:   // Угловая секунда
         result = value
         break
      case 4:   // Минута дуги
         result = value / 60.0
         break
      default: 
         alert("Выборите единицу измерения")
   }
   return result
}

// ИЗ МИНУТЫ ДУГИ
function fromArcMinute(value, index) {
   let result

   switch(index) {
      case 0:  // Град
         result = value / 54.0
         break
      case 1:   // Градус
         result = value / 60.0
         break
      case 2:   // Радиан
         result = value * Math.PI / (60.0 * 180.0)
         break
      case 3:   // Угловая секунда
         result = value * 60
         break
      case 4:   // Минута дуги
         result = value
         break
      default: 
         alert("Выборите единицу измерения")
      
   }
   return result
}

export {Calculation}