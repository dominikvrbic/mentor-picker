<template>
<v-app id="mentor-picker">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Nesto</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Nesto drugo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Odabir mentora</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          {{user.display_name}} ({{user.username}})
            &nbsp;
            <v-icon>account_circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-subheader>Dopustenja: </v-subheader>
        <v-list>
          <template v-for="(role, index) in user.roles">
            <v-list-tile :key="role.id">
              <v-list-tile-title>{{role.name}}</v-list-tile-title>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < user.roles.length"
              :key="index"
            ></v-divider>
        </template>
        </v-list>
      </v-container>
    </v-content>
</v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),

  methods: {
    logout() {
      this.$emit('logout');
    },
  },
  props: {
    user: Object,
  },
};
</script>
