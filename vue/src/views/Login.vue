<template>
  <div id="app">
    <Header subtitle="Log In"/>

    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.username" type="text" :state="validation"   placeholder="Enter username" required></b-form-input>
      <b-form-invalid-feedback :state="validation">
        Username must be 3-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        <b-form-invalid-feedback :state="validationP">
       Password must have at least 4 chars, must not contains special chars.
        </b-form-invalid-feedback>
       <b-form-valid-feedback :state="validationP">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import { mapActions} from 'vuex';

  export default {
    name: 'Login',
    
    components: {
    },

    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
  

    

    computed:{
      validation() {
        let regex=/[.,?@$#%^&@()+_!*|":}{; ]/
        return this.form.username.length >3 && this.form.username.length < 13 && !regex.test(this.form.username)
      },
      validationP(){
        let regex=/[.,?@$#%^&@()+_!*|":}{; ]/
        return this.form.password.length>4 && !regex.test(this.form.password)
      },
     
    },




    methods: {
      ...mapActions([
        'login',
       
      ]),

      async onSubmit(e) {
     
        e.preventDefault();
        if(this.validation && this.validationP){
      this.login(this.form).then(res=>{
        if(res.msg)
          alert(res.msg)
        else
        this.$router.push({ name: 'home' });
      });

        }else alert('Invalid username/password');
      }
    }
  }
</script>

<style scoped>

</style>
