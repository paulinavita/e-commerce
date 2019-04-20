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
          v-model="name"
          :rules="[rules.length(4)]"
          style="min-height: 96px"
          label="Name"
          required
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
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          box
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="address"
          :rules="[rules.length(9)]"
          style="min-height: 96px"
          label="Address"
          required
        ></v-text-field>
        <v-checkbox v-model="agreement" :rules="[rules.required]" color="deep-purple">
          <template v-slot:label>
            I agree to the&nbsp;
            <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
            &nbsp;and&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Privacy Policy</a>*
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat @click="$refs.form.reset()">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="register"
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
    name : '',
    email: '',
    password: '',
    address :'',
    agreement: false,
    dialog: false,
    form: false,
    isLoading: false,
    rules: {
      name : v => (v && v.length >= 4) || "Name must be more than 4 characters",
      email: v => (v || "").match(/@/) || "Please enter a valid email",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      required: v => !!v || "This field is required"
    }
  }),
  methods: {
    register() {
        this.axios
            .post(`/users`, {
                name : this.name,
                password : this.password,
                address : this.address,
                email : this.email
            })
            .then(({data}) => {
                this.$router.push({ path: 'login' })
                // console.log('berhasil register');
                this.$emit('success-register')
            })
            .catch((err) => {
                this.$swal('Please check your credential', 'warning')
            })
    }
  },
};
</script>

<style scoped>
.container {
  width: 50%;
}
</style>


