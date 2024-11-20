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
              <v-btn small color="error" @click="deleteUser(item.id)">Slet</v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
  
        <!-- Leaderboard Sektion -->
        <v-tab-item>
          <h2>Leaderboard</h2>
          <v-data-table :headers="leaderboardHeaders" :items="leaderboard" class="elevation-1" :sort-by="['total_score']" sort-desc>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
  
      <!-- Modals til CRUD -->
      <AddEditUserModal v-if="showUserModal" @close="closeUserModal" @save="saveUser" :user="selectedUser" />
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
        showUserModal: false, // Modal tilføj/redigér bruger
        selectedUser: null, // Bruger der redigeres
        userHeaders: [
          { text: "ID", value: "id" },
          { text: "Brugernavn", value: "username" },
          { text: "Email", value: "email" },
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
      // Hent brugere
      async fetchUsers() {
        try {
          const response = await axios.get("http://localhost:3000/api/users");
          this.users = response.data;
        } catch (error) {
          console.error("Fejl ved hentning af brugere:", error.message);
        }
      },
      // Hent leaderboard
      async fetchLeaderboard() {
        try {
          const response = await axios.get("http://localhost:3000/api/leaderboard");
          this.leaderboard = response.data;
        } catch (error) {
          console.error("Fejl ved hentning af leaderboard:", error.message);
        }
      },
      // Tilføj eller redigér en bruger
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
      // Slet en bruger
      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${userId}`);
          this.fetchUsers();
        } catch (error) {
          console.error("Fejl ved sletning af bruger:", error.message);
        }
      },
      // Åbn modal for at redigere en bruger
      editUser(user) {
        this.selectedUser = { ...user };
        this.showUserModal = true;
      },
      // Åbn modal for at tilføje en ny bruger
      openAddUserModal() {
        this.selectedUser = null;
        this.showUserModal = true;
      },
      // Luk modal
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
  