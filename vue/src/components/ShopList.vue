<template>
  <div class="hello">
    <b-list-group>
    <b-container class="ShopList">
      
    <b-row> <!--ovde staviti href=shops/:id i ime -->
    <b-col v-for="dep in shops" :key="dep.id" > <b-list-group-item  :to="`/shops/${dep.id}`" >
      <img alt="Vue logo" width="200px" height="200px" :src="dep.imgUrl" />{{dep.ShopName}} </b-list-group-item></b-col> <!--src ce biti u bazi-->
    </b-row>
    </b-container>
    </b-list-group>
  
    
    

  </div>
</template>

<script>
export default {
  name: 'ShopList',
  props: {
    shops:[]
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
