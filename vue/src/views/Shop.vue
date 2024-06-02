<template>
  <div class="shop">
    
    <SingleShop v-if="shop!=null" :shopName="shop.ShopName" :itemList="this.items" :imgUrl="shop.imgUrl" />
    <h2 v-else >This store has no available items</h2>
    
    <h2 v-if="shop!=null"> Other items in this store</h2>
    <ItemList v-if="shop!=null" :items="this.items"  />
    <br>
    <br>
  </div>
</template>

<script>
  import { mapActions,mapMutations,mapState} from 'vuex';
  import SingleShop from '@/components/SingleShop.vue';
  import ItemList from "@/components/ItemList.vue"
export default {
  components:{
    SingleShop,
    ItemList
  },
  name: 'Shop',
  props: {
    itemName: String,
    
  },
  data() {
      return {
        id:'',
        
      }
    },

  methods:{
  ...mapActions([
       "fetchItemById",
        "fetchShopById",
        'fetchShopItemByItemId',
        'fetchItems',
        'fetchShopItemByShopId'
      ]),

      ...mapMutations([
        'removeToken',
        'setToken'
      ])}
      , 
      computed: {
      ...mapState([
        'item',
        'shop',
        'shopItem',
        'token',
        'items'
      ])
    },
     watch: {
       $route() {
        this.id = this.$route.params.id;
      
       
      this.fetchShopItemByShopId(this.id).then(()=>{
        console.log(this.item);
       })

      
        
      }
    },
    mounted() {
       
       this.id = this.$route.params.id;
       
       
       this.fetchShopItemByShopId(this.id).then(()=>{
        console.log(this.item);
       })

    
    
   
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
