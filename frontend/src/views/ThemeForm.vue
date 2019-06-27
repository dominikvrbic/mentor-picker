<template>
  <v-container>
    <v-alert value="true" type="success" v-if="themeAccepted">
      <h3>Tema prihvacena!</h3>
      <strong>Profesor: </strong> {{themeData.professorName}}
    </v-alert>
    <v-form @submit.prevent="saveTheme">
      <v-card>
        <v-card-text>
          <v-select
            :items="fields"
            label="Podrucje"
            item-value="id"
            item-text="name"
            v-model="themeData.field"
            :disabled="themeAccepted"
          />
          <v-text-field
            label="Naslov"
            v-model="themeData.title"
            :disabled="themeAccepted"
          ></v-text-field>
          <v-textarea
            label="Opis"
            v-model="themeData.description"
            :disabled="themeAccepted"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn type="submit" color="primary" :disabled="themeAccepted">Spremi</v-btn>
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

  computed: {
    themeAccepted() {
      return this.themeData && !!this.themeData.professorID;
    },
  },
};
</script>

<style>
</style>
