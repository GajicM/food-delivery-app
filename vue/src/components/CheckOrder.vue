<template>
  <div class="hello">
    
    <h1>{{ this.titl }} {{ this.order.id }}</h1>
    <p class="my-4"></p>
    <b-list-group>
    <b-container class="ItemsList">
    <b-row v-for="dep in this.orderItems" :key="dep.id"> 
    <b-col>
    <b-list-group-item >  
     {{dep.itemName}}  </b-list-group-item></b-col>
     <b-col> <b-list-group-item >{{ dep.price*dep.quant }} RSD</b-list-group-item></b-col> 
    </b-row>
    </b-container>
    </b-list-group>
      <h3 v-if="this.order!=null">{{ this.order.TotalCost }} RSD</h3>
    <b-button  class="mt-3" variant="outline-success" block to="/">Return to Home</b-button>
    
 
    
    

  </div>
</template>

<script>
export default {
  name: 'CheckOrder',
  props: {
    titl: String,
    orderItems:[],
    order:Object,
  },
  watch:{
    titl(){

    }
  }

}
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
