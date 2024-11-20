<template>
    <v-dialog :value="isOpen" @input="handleClose" max-width="500px">
      <v-card>
        <v-card-title>{{ localOption.id ? 'Rediger Farvevalg' : 'Tilføj Farvevalg' }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="Farvenavn"
            v-model="localOption.option_text"
            outlined
          ></v-text-field>
          <v-text-field
            label="HEX-kode"
            v-model="localOption.color"
            outlined
          ></v-text-field>
          <v-text-field
            label="Point"
            type="number"
            v-model="localOption.points"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="saveOption">Gem</v-btn>
          <v-btn text color="secondary" @click="handleClose">Annuller</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'AddEditOptionModal',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      option: {
        type: Object,
        default: () => ({
          option_text: '',
          color: '',
          points: 0,
        }),
      },
    },
    data() {
      return {
        localOption: { ...this.option }, // Lokal kopi til redigering
      };
    },
    methods: {
      handleClose() {
        this.$emit('close'); // Udsend lukke-event
      },
      saveOption() {
        this.$emit('save', this.localOption); // Udsend gem-event med redigerede data
        this.handleClose(); // Luk modal
      },
    },
  };
  </script>
  