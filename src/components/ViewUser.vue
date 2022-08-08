<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Key</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value, key in user" :key="key">
            <td>{{ key }}</td>
            <td>{{ JSON.stringify(value) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ViewUser",
  data() {
    return {
        user: {}
    };
  },
  mounted() {
    axios.get('/user/profile').then(res => {
        this.user = res.data
    })
  },
};
</script>

<style>
</style>