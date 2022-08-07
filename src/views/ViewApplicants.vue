<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.experience`]="{ item }">
        {{
          item.jobDetails.reduce((acc, job) => acc + job.experienceInYears, 0)
        }}
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt) }}
      </template>

      <template v-slot:[`item.updatedAt`]="{ item }">
        {{ new Date(item.updatedAt) }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          color="green"
          class="mr-2"
          @click="
            $router.push({ name: 'EditApplicant', params: { id: item._id } })
          "
        >
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-snackbar :color="snackbarColor" v-model="snackbar" timeout="1000">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ViewApplicants",
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "green",
      headers: [
        { text: "First Name", sortable: false, value: "firstName" },
        { text: "Last Name", sortable: false, value: "lastName" },
        { text: "Experience", sortable: false, value: "experience" },
        { text: "Applied On", sortable: false, value: "createdAt" },
        { text: "Last Updated", sortable: false, value: "updatedAt" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      users: [],
    };
  },
  mounted() {
    this.getApplicants();
  },
  methods: {
    getApplicants() {
      axios.get("/user/admin/find").then((res) => (this.users = res.data));
    },
    deleteItem(item) {
      axios.delete(`/user/admin/user/${item._id}`).then(() => {
        this.snackbar = true;
        this.snackbarText = "Success";
        this.getApplicants();
      });
    },
  },
};
</script>