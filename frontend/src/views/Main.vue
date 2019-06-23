<template>
<v-app id="mentor-picker">
    <v-toolbar color="primary" dark fixed app>
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
      <ThemeForm v-if="isStudent" :user="user" />
      <ProfessorThemeList v-if="isProfessor" :user="user" />
    </v-content>
</v-app>
</template>

<script>
import ThemeForm from './ThemeForm.vue';
import ProfessorThemeList from './ProfessorThemeList.vue';

export default {
  components: {
    ThemeForm,
    ProfessorThemeList,
  },

  props: {
    user: Object,
  },

  data() {
    return {};
  },

  computed: {
    isAdmin() {
      return this.user.roles.some(role => role.is_admin);
    },
    isStudent() {
      return this.user.roles.some(role => role.is_student);
    },
    isProfessor() {
      return this.user.roles.some(role => role.is_professor);
    },
  },

  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>
