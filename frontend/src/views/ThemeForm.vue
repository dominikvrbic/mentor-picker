<template>
  <v-container>
    <v-form @submit.prevent="saveTheme">
      <v-card>
        <v-card-text>
          <v-select
            :items="fields"
            label="Podrucje"
            item-value="id"
            item-text="name"
            v-model="themeData.field"
          />
          <v-text-field label="Naslov" v-model="themeData.title"></v-text-field>
          <v-textarea label="Opis" v-model="themeData.description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn type="submit" color="primary">Spremi</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
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
      loaded: false,
      fields: null,
      themeData: {
        field: 1,
        title: '',
        description: '',
      },
    };
  },

  created() {
    this.getFields().then((fields) => {
      this.fields = fields;
      this.loaded = true;
    });
    this.getTheme().then((theme) => {
      this.themeData = theme;
    });
  },

  methods: {
    async getFields() {
      const resp = await Api.get('/fields');
      return resp.data;
    },
    async getTheme() {
      const response = await Api.get('/theme');
      return response.data;
    },
    saveTheme() {
      return Api.post('/theme', this.themeData);
    },
  },
};
</script>

<style>
</style>
