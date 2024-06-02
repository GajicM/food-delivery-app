<template>
  <div class="hello">
    <h1>Welcome to Food delivery</h1>
    <h2>Featured Shops</h2>
   <ShopList :shops="this.featuredShops"/>

    <h2> Featured Items</h2>
    <ItemList :items="this.featuredItems"  />

  </div>
</template>

<script>
import { mapActions,mapMutations,mapState} from 'vuex';
import ItemList from '@/components/ItemList'
import ShopList from '@/components/ShopList.vue';
export default {
  name: 'Home',
  components:{
    ItemList,
    ShopList
},
  props: {
    msg: String
  },
  methods:{
onClick(name){
 
  this.$router.push({ name: name });},

  ...mapActions([
        'fetchShops',
          "fetchItems"
      ]),

      ...mapMutations([
        'removeToken',
        'setToken',
        'setFeaturedItems',
        'setFeaturedShops'
      ])}
      , 
      computed: {
      ...mapState([
        'shops',
        'items',
        'token',
        'featuredItems',
        'featuredShops'
      ])
    },
  mounted() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

       this.fetchShops();
       this.fetchItems();
      
      
      
     
    },
    watch: {
       $route() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

       this.fetchShops();
       this.fetchItems();
   
        
      }
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
