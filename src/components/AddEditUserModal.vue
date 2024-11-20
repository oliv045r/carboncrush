<template>
    <div>
      <v-dialog :model-value="localIsOpen" @update:model-value="updateIsOpen" max-width="500px">
        <v-card>
          <v-card-title>{{ user ? 'Rediger Bruger' : 'Tilføj Bruger' }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="localUser.username" label="Brugernavn"></v-text-field>
            <v-text-field v-model="localUser.score" label="Score" type="number"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="save">Gem</v-btn>
            <v-btn text @click="close">Annuller</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddEditUserModal",
    props: {
      user: {
        type: Object,
        default: null,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        localIsOpen: this.isOpen,
        localUser: this.user
          ? { ...this.user }
          : { username: "", score: 0 },
      };
    },
    methods: {
      save() {
        this.$emit("save", this.localUser);
        this.close();
      },
      close() {
        this.localIsOpen = false;
        this.$emit("update:isOpen", this.localIsOpen);
      },
      updateIsOpen(newValue) {
        this.localIsOpen = newValue;
      },
    },
    watch: {
      user(newValue) {
        this.localUser = newValue ? { ...newValue } : { username: "", score: 0 };
      },
    },
  };
  </script>
  