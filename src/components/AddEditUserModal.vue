<template>
    <v-dialog :model-value="localIsOpen" @update:model-value="updateIsOpen" max-width="500px">
      <v-card>
        <v-card-title>{{ user?.id ? "Rediger Bruger" : "Tilføj Ny Bruger" }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="Brugernavn" v-model="localUser.username" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="save">Gem</v-btn>
          <v-btn text @click="close">Annuller</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: "AddEditUserModal",
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        localIsOpen: this.isOpen, // Lokalt felt til at synkronisere modalens åben/luk status
        localUser: { ...this.user }, // Lav en lokal kopi af brugeren
      };
    },
    watch: {
      isOpen(newVal) {
        this.localIsOpen = newVal; // Opdater lokal isOpen når prop ændrer sig
      },
      user(newVal) {
        this.localUser = { ...newVal }; // Opdater lokal bruger når prop ændrer sig
      },
    },
    methods: {
      updateIsOpen(val) {
        this.$emit("update:isOpen", val); // Emit event for at synkronisere med forældren
      },
      save() {
        this.$emit("save", this.localUser); // Emit event for at gemme brugerdata
        this.updateIsOpen(false); // Luk modalen efter gem
      },
      close() {
        this.updateIsOpen(false); // Luk modalen uden at gemme
      },
    },
  };
  </script>
  