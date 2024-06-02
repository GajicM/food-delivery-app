<template>
  <div class="hello">
    <h1>{{itemName  }}</h1>
    <img alt="Vue logo" width="200px" height="200px" :src="imgUrl" />
    <h2>Price: {{price  }} RSD</h2>
    <h2>Shop: {{shopName}}</h2>
   
  
    
    

  </div>
</template>

<script>
export default {
  name: 'SingleItem',
  props: {
    itemName: String,
    price:Number,
    shopName:String,
    imgUrl:String
  },


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
