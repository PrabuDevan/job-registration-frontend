<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="isFormValid">
        <v-row>
          <v-col sm="6" cols="12">
            <v-text-field
              v-model="applicantDetails.firstName"
              :rules="[(v) => !!v || 'First Name is required']"
              label="First Name"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field
              v-model="applicantDetails.lastName"
              :rules="[(v) => !!v || 'Last Name is required']"
              label="Last Name"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12" v-if="!isUpdateForm">
            <v-text-field
              v-model="applicantDetails.username"
              :rules="[(v) => !!v || 'Username is required']"
              label="Username"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12" v-if="!isUpdateForm">
            <v-text-field
              v-model="applicantDetails.password"
              type="password"
              :rules="[(v) => !!v || 'Password is required']"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field
              v-model="applicantDetails.mobileNo"
              type="phone"
              :rules="[(v) => !!v || 'Mobile Number is required']"
              label="Mobile Number"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-radio-group
              label="Sex"
              :rules="[(v) => !!v || 'Sex is required']"
              v-model="applicantDetails.sex"
            >
              <v-radio label="Male" value="male"></v-radio>
              <v-radio label="Female" value="female"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click.prevent="addNewQualification" color="primary"
            >Add new Qualification</v-btn
          >
        </v-row>
        <template v-for="(qualification, index) in qualifications">
          <v-row :key="index + 'i'">
            <v-col sm="6" cols="12">
              <v-select
                v-model="qualification.type"
                :rules="[(v) => !!v || 'Type is required']"
                :items="['Secondary', 'Higher Secondary', 'UG', 'PG']"
                label="Type"
                required
              ></v-select>
            </v-col>
            <v-col sm="6" cols="12">
              <v-text-field
                v-model="qualification.percentage"
                :rules="[(v) => !!v || 'Percentage is required']"
                label="Percentage"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="6" cols="12">
              <v-text-field
                v-model="qualification.courseDuration"
                :rules="[(v) => !!v || 'Course Duration is required']"
                label="Course Duration"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="6" cols="12">
              <DatePicker
                v-model="qualification.courseStartDate"
                label="Course Started"
              />
            </v-col>
            <v-col sm="6" cols="12">
              <DatePicker
                v-model="qualification.courseEndDate"
                label="Course Ended"
              />
            </v-col>
          </v-row>
        </template>
        <v-row>
          <v-btn @click.prevent="addNewExperience" color="primary"
            >Add new Experience</v-btn
          >
        </v-row>
        <template v-for="(jobDetail, index) in jobDetails">
          <v-row :key="index + 'j'">
            <v-col sm="6" cols="12">
              <v-text-field
                v-model="jobDetail.company"
                :rules="[(v) => !!v || 'Company Name is required']"
                label="Company Name"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="6" cols="12">
              <v-text-field
                v-model="jobDetail.jobTitle"
                :rules="[(v) => !!v || 'Job Title is required']"
                label="Job Title"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="6" cols="12">
              <v-text-field
                v-model.number="jobDetail.experienceInYears"
                @keypress="isNumber"
                @click.right.prevent
                @copy.prevent
                @paste.prevent
                :rules="[(v) => !!v || 'Total Experience is required']"
                label="Total Experience Duration"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="6" cols="12">
              <DatePicker
                v-model="jobDetail.startDate"
                label="Experience start date"
              />
            </v-col>
            <v-col sm="6" cols="12">
              <DatePicker
                v-model="jobDetail.endDate"
                label="Experience end date"
              />
            </v-col>
          </v-row>
        </template>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isFormValid"
          v-if="isUpdateForm"
          color="primary"
          @click="submitForm"
        >
          Save
        </v-btn>
        <v-btn
          :disabled="!isFormValid"
          v-else
          color="primary"
          @click="submitForm"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar :color="snackbarColor" v-model="snackbar" timeout="1000">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import axios from "axios";
export default {
  name: "CreateUpdateApplicant",
  components: {
    DatePicker,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "green",
      isUpdateForm: false,
      applicantDetails: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobileNo: "",
        sex: "male",
      },
      isFormValid: false,
      qualifications: [
        {
          type: "",
          percentage: "",
          courseDuration: "",
          courseStartDate: "",
          courseEndDate: "",
        },
      ],
      jobDetails: [
        {
          company: "",
          jobTitle: "",
          experienceInYears: "",
          startDate: "",
          endDate: "",
        },
      ],
    };
  },
  created() {
    if (this.$route.params.id) this.isUpdateForm = true;
  },
  mounted() {
    if (this.isUpdateForm) {
      axios.get(`/user/admin/user/${this.$route.params.id}`).then((res) => {
        this.qualifications = res.data.qualifications;
        this.jobDetails = res.data.jobDetails;
        this.applicantDetails.firstName = res.data.firstName;
        this.applicantDetails.lastName = res.data.lastName;
        this.applicantDetails.mobileNo = res.data.mobileNo;
        this.applicantDetails.sex = res.data.sex;
      });
    }
  },
  methods: {
    isNumber(evt) {
      const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const keyPressed = evt.key;
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
    submitForm() {
      if (this.isUpdateForm) {
        delete this.applicantDetails
        axios
          .put(`/user/admin/user/${this.$route.params.id}`, {
            ...this.applicantDetails,
            qualifications: this.qualifications,
            jobDetails: this.jobDetails,
          })
          .then(() => {
            this.snackbarText = "Success";
            this.snackbarColor = "green";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push({ name: "ViewApplicants" });
            }, 1000);
          });
      } else {
        axios
          .post("/user/admin/user", {
            ...this.applicantDetails,
            qualifications: this.qualifications,
            jobDetails: this.jobDetails,
          })
          .then(() => {
            this.snackbarText = "Success";
            this.snackbarColor = "green";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push({ name: "ViewApplicants" });
            }, 1000);
          });
      }
    },
    addNewQualification() {
      this.qualifications.push({
        type: "",
        percentage: "",
        courseDuration: "",
        courseStartDate: "",
        courseEndDate: "",
      });
    },
    addNewExperience() {
      this.jobDetails.push({
        company: "",
        jobTitle: "",
        experienceInYears: "",
        startDate: "",
        endDate: "",
      });
    },
  },
};
</script>

<style>
</style>