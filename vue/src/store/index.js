
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shops:[],
    items:[],
    shopItems:[],
    item:null, 
    shop:null,
    shopItem:null,
    token:"",
    featuredItems:[],
    featuredShops:[],
    cartItems:[],
    order:null,
    orderItems:[],
    
  },
  getters: {
  },
  
  mutations: {
  
    addShops(state, shps) {
      state.shops = shps;
      const shuffledArray = state.shops.sort(() => 0.5 - Math.random()); // shuffles array
      const featuredShops = shuffledArray.slice(0, 3); // gets first n elements after shuffle
      state.featuredShops= featuredShops;
    
    },
    addItems(state, itms) {
      state.items = itms;
      const shuffledArray = state.items.sort(() => 0.5 - Math.random()); // shuffles array
      const featuredItems = shuffledArray.slice(0, 3); // gets first n elements after shuffle
      state.featuredItems= featuredItems;
    },
    setToken(state, token) {
      if(token.msg)
      console.log(token.msg)
      state.token = token;
      localStorage.token = token;
   
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    addItem(state, itms) {
      state.item = itms;
    },
   
    addShop(state,shp){
      state.shop=shp;
    },
    addShopItems(state,shi){
      var items=[]; var i=0;
    shi.forEach(element => {
      items[i]=element.item;
      i++;
    });
    state.items=items;
    if(shi[0])
    state.shop=shi[0].shop;
    else
    state.shop=null;
    },



    addShopItem(state, shi) {
      console.log(shi);
      var items=[]; var i=0;
      state.item=shi.item;
      state.shop=shi.shop;
      shi=shi.items;
     
      
      shi.forEach(element => {
     
        items[i]=element.item;
        i++;
      });
      state.items=items;
     
      
    },
    setFeaturedItems(state,items){
      state.featuredItems=items;
    },
    setFeaturedShops(state,shops){
      state.featuredShops=shops;
    },
    addCart(state,item){
      console.log('aaaaaa');
      state.cartItems.push(item);
    },
    removeCart(state,item){
    state.cartItems.splice(state.cartItems.indexOf(item),1)  ;
    },
    addOrder(state,res){
      console.log(res.order.rows);
      console.log(res.items);
      state.order=res.order.rows;
      state.orderItems=res.items;
    },
    clearCart(state){
      state.cartItems=[];
    }

  },
  actions: {
    fetchShops({ commit }) {
      fetch('https://rest-api-food-delivery.onrender.com/admin/shops')
        .then( obj => obj.json() )
          .then( res =>  commit('addShops', res) );
    }, 

    fetchItems({ commit }) {
      fetch('https://rest-api-food-delivery.onrender.com/admin/items')
        .then( obj => obj.json() )
          .then( res =>  commit('addItems', res) );
    },

    register({commit},obj){
      return new Promise( (resolve, reject) => {  
        //alternativno http://127.0.0.1:9000/register
      fetch('https://app-auth-food-delivery.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })  
      .then( obj => obj.json() )
      .then( res => {
        if(res.token)
        commit('setToken',res.token);
        resolve(res);
      });
      });
    },

    login({commit},obj){
      return new Promise( (resolve, reject) => {  
      fetch('https://app-auth-food-delivery.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
        .then( res => res.json() )
        .then( res=>{
          if(res.token)
          commit('setToken',res.token);
          resolve(res);
        })
        .catch(err=>console.log(err))
      })
    },

    fetchItemById({commit},id){
      fetch('https://rest-api-food-delivery.onrender.com/admin/items/'+id)
        .then( obj => obj.json() )
          .then( res =>  commit('addItem', res) );



    },
    
    fetchShopItemByItemId({commit},id){
     
      fetch('https://rest-api-food-delivery.onrender.com/admin/shopItems/items/'+id)
      .then( obj => obj.json() )
        .then( res => commit('addShopItem',res,id) );



    },
    fetchShopById({commit},id){
      fetch('https://rest-api-food-delivery.onrender.com/admin/shops/'+id)
        .then( obj => obj.json() )
          .then( res => {console.log(res); commit('addShop', res)} );
    },

    fetchShopItemByShopId({commit},id){
      fetch('https://rest-api-food-delivery.onrender.com/admin/shopItems/shops/'+id)
      .then( obj => obj.json() )
        .then( res => {console.log(res); commit('addShopItems', res)} );

    },
    fetchPostOrder({commit},obj){
      console.log(this.state.token)
      fetch("https://rest-api-food-delivery.onrender.com/admin/orders/postOrder",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.state.token}` },
        body: JSON.stringify(obj)
      }
        ).then(obj=>obj.json()).then(res=>{
          let x={
            order:res,
            items:obj
          }

        fetch("https://rest-api-food-delivery.onrender.com/admin/orderItems/postOrder",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.state.token}` },
        body: JSON.stringify(x)
         }).then(obj=>obj.json()).then(b=>{commit('addOrder',b)});
        })},

      
      
      },
      
        

        
        
  
  modules: {
  },

})
