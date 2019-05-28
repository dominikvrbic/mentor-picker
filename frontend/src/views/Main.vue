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
      <v-container v-if="loaded">
        <v-form @submit.prevent="saveTheme">
          <v-card>
            <v-card-text>
              <v-select :items="fields" label="Podrucje" item-value="id" item-text="name" v-model="themeData.field" />
              <v-text-field label="Naslov" v-model="themeData.title"></v-text-field>
              <v-textarea label="Opis" v-model="themeData.description"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary">Spremi</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
    </v-content>
</v-app>
</template>

<script>
import Api from '../api';
export default {
  data: () => ({
    drawer: null,
    loaded: false,
    fields: null,
    themeData: {
      field: 1,
      title: '',
      description: '',
    }
  }),

  created() {
    this.getFields().then((fields) => {
      this.fields = fields;
      console.log(fields);
      this.loaded = true;
    });
  },

  methods: {
    logout() {
      this.$emit('logout');
    },
    async getFields() {
      const resp = await Api.get('/fields');
      return resp.data;
    },
    saveTheme() {
      return Api.post('/theme', this.themeData);
    }
  },
  props: {
    user: Object,
  },
};
</script>
