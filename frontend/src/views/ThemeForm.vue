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
          <v-subheader>Profesori: </v-subheader>
          <v-list>
            <v-list-tile v-for="professor in availableProfessors" :key="professor.id">
              <v-list-tile-action>
                <v-checkbox
                  v-model="themeData.professors"
                  :value="professor.id"
                ></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{professor.display_name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            type="submit"
            color="primary"
            :disabled="themeAccepted || validationErrs.length > 0">
            Spremi
          </v-btn>
        </v-card-actions>
        <v-alert :value="true" type="error" v-if="validationErrs.length > 0">
            <div v-for="(err, index) in validationErrs" :key="index">
              {{err}}
            </div>
          </v-alert>
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
        professors: [],
      },
      availableProfessors: [],
    };
  },

  created() {
    this.getFields().then((fields) => {
      this.fields = fields;
      this.loaded = true;
    });
    this.getTheme().then((theme) => {
      if (theme) {
        this.themeData = theme;
      }
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
    validationErrs() {
      const errs = [];
      if (!this.themeData.title.trim().length) {
        errs.push('Morate dati naslov teme');
      }
      if (!this.themeData.professors.length) {
        errs.push('Morate odabrati barem jednog profesora');
      }
      return errs;
    },
  },
  watch: {
    'themeData.field': {
      immediate: true,
      handler(newField) {
        Api.get(`/fields/${newField}/professors`).then((professors) => {
          this.availableProfessors = professors.data;
        });
      },
    },
  },
};
</script>

<style>
</style>
