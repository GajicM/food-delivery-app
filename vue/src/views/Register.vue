<template>
  <div id="app">
    <Header subtitle="Create account"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
        <b-form-invalid-feedback :state="emailVal">
        Must be email. example@example.com
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="emailVal">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>
      
      <b-form-group label="First Name:" label-for="firstname">
        <b-form-input id="firstname" v-model="form.firstName" type="text" placeholder="Enter first name" required></b-form-input>
        <b-form-invalid-feedback :state="nameVal">
       Must contain only lettters
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="nameVal">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>
      
      <b-form-group label="last Name:" label-for="lastname">
        <b-form-input id="lastname" v-model="form.lastName" type="text" placeholder="Enter last name" required></b-form-input>
        <b-form-invalid-feedback :state="nameVal">
        Must contain only letters
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="nameVal">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.username" type="text" placeholder="Enter username" required></b-form-input>
        <b-form-invalid-feedback :state="validation">
        Username must be 4-12 characters long. No Special chars allowed
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        <b-form-invalid-feedback :state="passVal">
       Password has to be have at least 5 chars. No Special Chars allowed
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="passVal">
        Looks Good.
      </b-form-valid-feedback>
     
      </b-form-group>
      <b-form-group label="Confirm Password:" label-for="password2">
        <b-form-input id="password2" v-model="form.password2" type="password" required></b-form-input>
        <b-form-invalid-feedback :state="passVal2">
          Passwords must match
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="passVal2">
        Looks Good.
      </b-form-valid-feedback>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import { computed } from 'vue';
import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
    },

    data() {
      return {
        form: {
        firstName:'',
        lastName: '',
        email:'',
        admin:false,
        password:'',
        moderator: false,
        username:'',
        password2:''
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
       e.preventDefault();

        if(this.nameVal && this.passVal && this.passVal2 && this.emailVal && this.validation){
        this.register(this.form).then(res=>{
        if(res.msg)
          alert(res.msg)
        else
        this.$router.push({ name: 'home' });})
        }else
        alert("Invalid information provided");
      }
    },  
    computed:{
      nameVal(){
        let regex=/[.,?@$#%^&@()+_!*|":}{;1234567890 ]/
       return !regex.test(this.form.firstName) && !regex.test(this.form.lastName)
      },
      passVal(){
        let regex=/[.,?@$#%^&@()+_!*|":}{; ]/
        return !regex.test(this.form.password) && this.form.password.length>4
      },
      passVal2(){
        return this.form.password==this.form.password2 && this.form.password2.length>0;
      },
      validation() {
        let regex=/[.,?@$#%^&@()+_!*|":}{; ]/
        return this.form.username.length >3 && this.form.username.length < 13 && !regex.test(this.form.username)
      },
      emailVal(){
        let regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(this.form.email);

      }
    }
  }
</script>

<style scoped>

</style>