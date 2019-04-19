<template>
  <v-container fluid class="my-5">
    <v-card class="mx-auto" style="max-width: 500px;">
      <v-system-bar color="deep-purple darken-4" dark>
        <v-spacer></v-spacer>
        <v-icon small>mdi-square</v-icon>
        <v-icon class="ml-1" small>mdi-circle</v-icon>
        <v-icon class="ml-1" small>mdi-triangle</v-icon>
      </v-system-bar>

      <v-form ref="form" v-model="form" class="pa-3 pt-4">
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          box
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.length(6)]"
          box
          color="deep-purple"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
        
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat @click="$refs.form.reset()">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="login"
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="deep-purple accent-4"
          depressed
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email : '',
    password : '',
    agreement: false,
    dialog: false,
    form: false,
    isLoading: false,
    rules: {
      email: v => (v || '').match(/@/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      required: v => !!v || 'This field is required'
    }
  }),
  methods: {
      login() {
          this.axios.post(`users/signin/local`, {
              email : this.email,
              password : this.password
          })
          .then(({data}) => {
              console.log(data);
              
              localStorage.setItem('token', data.token)
              localStorage.setItem('id', data._id)
              localStorage.setItem('email', data.email)
              localStorage.setItem('role', data.role)
              this.$emit('success-login')
            //   console.log('berhasil signin broo')
          })
          .catch(err => {
             this.$swal('Please check your credential', 'warning')
          })
      }
  }
}
</script>

<style scoped>

</style>
