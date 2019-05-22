<template>
  <v-app id="mentor-picker">
    <v-layout row justify-center v-if="loading">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="100" color="primary"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-layout>
    <Login v-else-if="!loggedIn" @loggedIn="onLogin" />
    <Main :user="user" @logout="logout" v-else />
  </v-app>
</template>

<script>
import Api from './api';

import Login from './views/Login.vue';
import Main from './views/Main.vue';

export default {
  name: 'App',
  components: {
    Login,
    Main,
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      try {
        const resp = await Api.get('/authStatus');
        console.log('Response: ', resp);
        this.loggedIn = resp.data.loggedIn;
        this.user = resp.data.user;
        this.loading = false;
      } catch (err) {
        if (err.response.status === 401) {
          this.loggedIn = false;
          this.loading = false;
        } else {
          console.error('Unexpected error: ', err);
        }
      }
    },
    async logout() {
      await Api.post('/logout', {});
      this.init();
    },
    onLogin() {
      this.init();
    },
  },
  data() {
    return {
      loading: true,
      loggedIn: false,
      user: null,
    };
  },
};
</script>
