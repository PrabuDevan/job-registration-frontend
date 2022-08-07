<template>
  <v-dialog
    ref="dialog"
    v-model="dialog"
    :return-value.sync="propValue"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="propValue"
        :rules="[(v) => !!v || `${label} is required`]"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker value="mm-yyyy" v-model="propValue" type="month" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dialog = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(propValue)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    value: String,
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    propValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>