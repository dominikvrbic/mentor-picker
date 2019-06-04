<template>
  <v-container>
    <v-subheader>Teme: </v-subheader>
    <v-list>
      <v-list-tile v-for="theme in themes" :key="theme.id">
        <v-list-tile-action>
          <v-checkbox v-model="acceptStates[theme.id]" @change="() => toggleAccept(theme.id)"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{theme.name}}</v-list-tile-title>
          <v-list-tile-sub-title>
            <strong>{{theme.display_name}}</strong>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import Api from '../api';

export default {
  props: {
    user: Object,
  },

  data() {
    return {
      themes: [],
      acceptStates: {},
    };
  },

  methods: {
    async getThemes() {
      const response = await Api.get('/professorThemes');
      return response.data;
    },
    toggleAccept(themeID) {
      if (this.acceptStates[themeID]) {
        console.log('Accept');
        Api.put(`/professorThemes/${themeID}/accept`);
      } else {
        console.log('Unaccept');
        Api.delete(`/professorThemes/${themeID}/accept`);
      }
    },
  },

  created() {
    this.getThemes().then((themes) => {
      themes.forEach((theme) => {
        this.acceptStates[theme.id] = theme.professor_id == this.user.id;
      });
      this.themes = themes;
    });
  },
};
</script>

<style>
</style>
