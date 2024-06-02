<template>
  <div class="items">
    <h1>List Of Items</h1>
    <br>
    <ItemList :items="items"/>
  </div>
</template>

<script>
  import { mapActions,mapMutations,mapState} from 'vuex';
  import ItemList from '@/components/ItemList.vue'
export default {
  components:{
    ItemList
  },
  name: 'Items',
  props: {
    msg: String
  },
  methods: {
      ...mapActions([
        'fetchItems'
      ]),

      ...mapMutations([
        'removeToken',
        'setToken'
      ])}
      , 
      computed: {
      ...mapState([
        'items',
        'token'
      ])
    },
  mounted() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

       this.fetchItems();
      
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
