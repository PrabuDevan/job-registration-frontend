<template>
  <v-container>
    <template>
      <v-stepper v-model="tab">
        <v-stepper-header>
          <v-stepper-step :complete="tab > 1" step="1">
            Application Details
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="tab > 2" step="2">
            Education Details
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Job Details </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat>
              <v-form ref="form" v-model="applicantDetailsValidStatus">
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
                  <v-col sm="6" cols="12">
                    <v-text-field
                      v-model="applicantDetails.username"
                      :rules="[(v) => !!v || 'Username is required']"
                      label="Username"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" cols="12">
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
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!applicantDetailsValidStatus"
                  color="primary"
                  @click="tab = 2"
                >
                  Save & Next
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat></v-card>
            <v-card-title class="px-0">
              <v-btn @click.prevent="addNewQualification" color="primary"
                >Add new Qualification</v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-form v-model="qualificationsValidStatus">
                <template v-for="(qualification, index) in qualifications">
                  <v-row :key="index">
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
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!qualificationsValidStatus"
                color="primary"
                @click="tab = 3"
              >
                Save & Next
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat>
              <v-card-title class="px-0">
                <v-btn @click.prevent="addNewExperience" color="primary"
                  >Add new Experience</v-btn
                >
              </v-card-title>
              <v-card-text>
                <v-form v-model="jobDetailsValidStatus">
                  <template v-for="(jobDetail, index) in jobDetails">
                    <v-row :key="index">
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
                          :rules="[
                            (v) => !!v || 'Total Experience is required',
                          ]"
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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!jobDetailsValidStatus"
                  color="primary"
                  @click.prevent="register"
                >
                  Save & Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template></v-container
  >
</template>
  </v-container>
</template>

<script>
import DatePicker from "../components/DatePicker.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    DatePicker,
  },
  data() {
    return {
      tab: 1,
      applicantDetailsValidStatus: false,
      applicantDetails: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobileNo: "",
        sex: "male",
      },
      qualificationsValidStatus: false,
      qualifications: [
        {
          type: "",
          percentage: "",
          courseDuration: "",
          courseStartDate: "",
          courseEndDate: "",
        },
      ],
      jobDetailsValidStatus: false,
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
  methods: {
    isNumber(evt) {
      const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const keyPressed = evt.key;
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
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
    register() {
      axios
        .post("/user/register", {
          ...this.applicantDetails,
          qualifications: this.qualifications,
          jobDetails: this.jobDetails,
        })
        .then((res) => console.log(res.data));
    },
  },
};
</script>
