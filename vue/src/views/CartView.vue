<template>
  <div class="hello">
    <h1 v-if="this.cartItems.length<1 && !this.order">Your cart is empty</h1>
    <h2 v-if="this.cartItems.length>0"> Your Items</h2>
    <h1 v-if="this.cartItems.length>0">Total number of articles  {{ this.cartItems.length }}</h1>
    <b-list-group>
    <b-container class="ItemsList">
      
    <b-row v-for="dep in this.cartItems" :key="dep.id" > <b-list-group-item   >
      <img alt="Vue logo" width="200px" height="200px" :src="dep.imgUrl" />{{dep.itemName}}  
      <h2>  Price:{{dep.price}}RSD  Quantity:{{ dep.quant }} </h2>
      <b-button variant="danger" @click="removeFromCart(dep)">Remove From Cart</b-button> 
      <b-button variant="success" @click="addQuant(dep)">+</b-button>
      <b-button variant="info" @click="remQuant(dep)">-</b-button>
    </b-list-group-item> <!--src ce biti u bazi-->
    </b-row>
    </b-container>
    </b-list-group>
    <h1 v-if="this.cartItems.length>0">Total price  {{this.totalPrice }} </h1>
      <b-button variant="success" v-if="this.cartItems.length>0" @click="dorder()">Make Order</b-button>
      <CheckOrder v-if="this.order && this.cartItems.length<1" :titl="this.titl" :order="this.order" :order-items="this.orderItems" />




  </div>
</template>

<script>
import { mapActions,mapMutations,mapState} from 'vuex';
import CheckOrder from '@/components/CheckOrder.vue';
export default {
  name: 'CartView',
  components:{
    CheckOrder
},
  props: {
    msg: String,
    price:Number
  },
  data(){
      return({
        changed:0,
        totalPrice:0,
        titl:"Your order",
       
      })
    },  
    methods:{
        ...mapMutations([
        'removeCart',
      ]),
      removeFromCart(id){
        this.removeCart(id);
        this.changed++;
      },
      addQuant(item){
        item.quant++;
        this.changed++;
      },
      remQuant(item){
        item.quant--;
        this.changed++;
        if(item.quant<1)
          this.removeFromCart(item);
      },
      dorder(){
        console.log(this.token);
        this.fetchPostOrder(this.cartItems);
        this.changed++;
        if(this.order!=null)
        
        this.titl="Your order id is ";
        this.clearCart();
       
      },
      hideModal(){
        this.$refs['modal-success'].hide();
        if(this.order!=null)
        this.titl="Your order id is ";
      },
  ...mapActions([
        'fetchShops',
          "fetchItems",
          'fetchPostOrder',
       
      ]),

      ...mapMutations([
        'removeToken',
        'setToken',
        'setFeaturedItems',
        'setFeaturedShops',
        'clearCart'
      ])}
      , 
      computed: {
      ...mapState([
        'shops',
        'items',
        'token',
        'cartItems',
        'order',
        'orderItems'
        
      ])
    },
    mounted(){
      var pricee=0;
        this.cartItems.forEach(element => {
        pricee+=element.price*element.quant;
        });
       this.totalPrice=pricee;
       if(this.order!=null)
       this.titl="Your order id is ";
    },
    watch: {
       changed() {
        console.log(this.cartItems);
        var pricee=0;
        this.cartItems.forEach(element => {
        pricee+=element.price*element.quant;
        });
       this.totalPrice=pricee;
       if(this.order!=null)
       console.log(this.order)
       this.titl="Your order id is ";
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
