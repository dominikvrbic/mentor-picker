<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    :rules="usernameValid"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    :rules="passwordValid"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.prevent="submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import api from '../api';

  export default {
    props: {
      source: String
    },
    data() {
      return {
          username: '',
          password: '',
      };
    },
    computed: {
        usernameValid() {
            if (!this.username.length) {
                return ['Required'];
            } else {
                return [];
            }
        },
        passwordValid() {
            if (!this.password.length) {
                return ['Required'];
            } else {
                return [];
            }
        }
    },
    methods: {
        async submit() {
            if (!this.username && !this.password) {
                return;
            }

            const resp = await api.post('http://localhost:8000/login', {
                username: this.username,
                password: this.password
            }, {withCredentials: true});


        }
    }
  }
</script>