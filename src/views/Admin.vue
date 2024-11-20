<template>
    <div class="admin-container">
      <h1>Admin Panel</h1>
  
      <!-- Tabs til sektioner -->
      <v-tabs v-model="activeTab">
        <v-tab>Brugere</v-tab>
        <v-tab>Leaderboard</v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="activeTab">
        <!-- Brugere Sektion -->
        <v-tab-item>
          <h2>Brugere</h2>
          <v-data-table :headers="userHeaders" :items="users" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Liste over brugere</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="openAddUserModal">Tilføj ny bruger</v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn small color="primary" @click="editUser(item)">Redigér</v-btn>
              <v-btn small color="info" @click="openUserChoicesModal(item)">Se Valg</v-btn>
              <v-btn small color="error" @click="deleteUser(item.id)">Slet</v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
  
        <!-- Leaderboard Sektion -->
        <v-tab-item>
          <h2>Leaderboard</h2>
          <v-data-table
            :headers="leaderboardHeaders"
            :items="leaderboard"
            class="elevation-1"
            :sort-by="['total_score']"
            sort-desc
          ></v-data-table>
        </v-tab-item>
      </v-tabs-items>
  
      <!-- Modals -->
      <AddEditUserModal
        v-if="showUserModal"
        :isOpen="showUserModal"
        @update:isOpen="showUserModal = $event"
        @save="saveUser"
        :user="selectedUser"
      />
  
      <v-dialog v-model="showUserChoicesModal" max-width="800px">
  <v-card>
    <v-card-title>
      Valg for {{ selectedUser?.username || 'ukendt bruger' }}
    </v-card-title>
    <v-card-text>
      <template v-if="userChoices.length">
        <v-list>
          <v-list-item v-for="choice in userChoices" :key="choice.id">
            <v-list-item-content>
              <v-list-item-title>
                Spørgsmål: {{ choice.question?.question_text || 'ukendt spørgsmål' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Valg: {{ choice.option?.option_text || 'ukendt valg' }} 
                ({{ choice.option?.points || 0 }} point)
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <template v-else>
        <p>Ingen valg fundet for denne bruger.</p>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="showUserChoicesModal = false">Luk</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import AddEditUserModal from "@/components/AddEditUserModal.vue";
  
  export default {
    name: "AdminPanel",
    components: {
      AddEditUserModal,
    },
    data() {
      return {
        activeTab: 0, // Aktiv tab
        users: [], // Liste over brugere
        leaderboard: [], // Liste over leaderboard data
        userChoices: [], // Liste over brugerens valg
        showUserModal: false, // Modal tilføj/redigér bruger
        showUserChoicesModal: false, // Modal til at vise brugerens valg
        selectedUser: null, // Bruger der redigeres eller ses
        userHeaders: [
          { text: "ID", value: "id" },
          { text: "Brugernavn", value: "username" },
          { text: "Handlinger", value: "actions", sortable: false },
        ],
        leaderboardHeaders: [
          { text: "Rank", value: "rank" },
          { text: "Brugernavn", value: "username" },
          { text: "Total Point", value: "total_score" },
        ],
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get("http://localhost:3000/api/users");
          this.users = response.data;
        } catch (error) {
          console.error("Fejl ved hentning af brugere:", error.message);
        }
      },
      async fetchLeaderboard() {
        try {
          const response = await axios.get("http://localhost:3000/api/scores/leaderboard");
          this.leaderboard = response.data.map((item, index) => ({
            ...item,
            rank: index + 1,
          }));
        } catch (error) {
          console.error("Fejl ved hentning af leaderboard:", error.message);
        }
      },
      async fetchUserChoices(user) {
  try {
    // Opdater API-stien til at matche backend
    const response = await axios.get(`http://localhost:3000/userAnswer/users/${user.id}`);
    this.userChoices = response.data; // Sæt de hentede data i `userChoices`
    this.selectedUser = user; // Gem den valgte bruger
    this.showUserChoicesModal = true; // Åbn modal
  } catch (error) {
    console.error('Fejl ved hentning af brugerens valg:', error.message);
    this.userChoices = []; // Ryd data, hvis der opstår en fejl
    this.showUserChoicesModal = false; // Luk modal, hvis der er fejl
  }
}
,
      openUserChoicesModal(user) {
        this.selectedUser = user;
        this.fetchUserChoices(user);
        this.showUserChoicesModal = true;
      },
      async saveUser(user) {
        try {
          if (user.id) {
            await axios.put(`http://localhost:3000/api/users/${user.id}`, user);
          } else {
            await axios.post("http://localhost:3000/api/users", user);
          }
          this.fetchUsers();
        } catch (error) {
          console.error("Fejl ved gemning af bruger:", error.message);
        }
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${userId}`);
          this.fetchUsers();
        } catch (error) {
          console.error("Fejl ved sletning af bruger:", error.message);
        }
      },
      editUser(user) {
        this.selectedUser = { ...user };
        this.showUserModal = true;
      },
      openAddUserModal() {
        this.selectedUser = null;
        this.showUserModal = true;
      },
      closeUserModal() {
        this.showUserModal = false;
        this.fetchUsers();
      },
    },
    mounted() {
      this.fetchUsers();
      this.fetchLeaderboard();
    },
  };
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
  }
  </style>
  