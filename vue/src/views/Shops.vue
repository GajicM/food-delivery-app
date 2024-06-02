<template>
  <div class="shops">
    <h1>List of available shops</h1>
   
    <ShopList :shops="shops" />
    <br>
    <br>
  </div>
</template>

<script>
  import { mapActions,mapMutations,mapState} from 'vuex';
  import ShopList from '@/components/ShopList.vue';
export default {
  components:{
    ShopList
  },
  name: 'Shops',
  props: {
    msg: String
  },
  methods: {
      ...mapActions([
        'fetchShops'
      ]),

      ...mapMutations([
        'removeToken',
        'setToken'
      ])}
      , 
      computed: {
      ...mapState([
        'shops',
        'token'
      ])
    },
  mounted() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

       this.fetchShops();
    
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
