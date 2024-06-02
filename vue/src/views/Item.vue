<template>
  <div class="item">
   
    <SingleItem v-if="item!=null" :price="item.price" :itemName="item.itemName" :shopName="shop.ShopName" :imgUrl="item.imgUrl"/>
    <h2 v-else >Ovaj proizvod nije dostupan</h2>
    <b-button v-if="item!=null && token!=''" v-b-modal.modal-success variant="success" @click="addToCart() ">Add To Cart</b-button>
    <b-button disabled v-else-if="item!=null" variant="secondary">Login to add to cart </b-button>
   
    <b-modal ref="modal-success" id="modal-success" hide-footer title="One more step!">
    <p class="my-4"></p>
    <b-form-group
      label="Select Quantity"
      label-for="input-formatter"
      description="Default quantity is 1"
      class="mb-0"
    >
      <b-form-input
        id="input-formatter"
        v-model="quant"
        placeholder="1"
        type="number"
      ></b-form-input>
    </b-form-group>
    <b-button class="mt-3" variant="outline-success" block @click="hideModal()">Great</b-button>
    </b-modal>
    <h2> Featured Items </h2>
    <ItemList :items="this.items"  />

    <br>
    <br>
  </div>
</template>

<script>
  import { mapActions,mapMutations,mapState} from 'vuex';
  import SingleItem from '@/components/SingleItem.vue';
  import ItemList from "@/components/ItemList.vue"
export default {
  components:{
    SingleItem,
    ItemList
  },
  name: 'Item',
  props: {
    itemName: String,
    
  },
  data() {
      return {
        id:'',
        quant:1,
      }
    },

  methods:{
   


  ...mapActions([
       "fetchItemById",
        "fetchShopById",
        'fetchShopItemByItemId',
        'fetchItems',
        'fetchShopItemByShopId',
       
      ]),

      ...mapMutations([
        'removeToken',
        'setToken',
        'setFeaturedItems',
        "addCart"
      ]),
      hideModal() {
        this.$refs['modal-success'].hide();
        if(this.quant>0){
        this.item.quant=this.quant;
        this.addCart(this.item);
      }else alert('quantity cant be <1')
        console.log(this.item);
    
      },
      addToCart(){
       
        this.$refs['modal-success'].show()
      
    },

    }
      , 
      computed: {
      ...mapState([
        'item',
        'shop',
        'shopItem',
        'token',
        'items',
        'featuredItems',
        'cartItems'
      ])
    },
     watch: {
       $route() {
        this.id = this.$route.params.id;
       
        console.log('pre fetch');
        this.fetchShopItemByItemId(this.id);
        

        
      }
    },
    mounted() {
       this.id = this.$route.params.id;
       this.fetchShopItemByItemId(this.id)
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
