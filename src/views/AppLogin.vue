<template>
  <div class="main-container">
    <div class="inner-container">
      <div class="login-container">
        <div class="image-container">
          <div class="logo">
            <span class="capitalletter">J</span>ob
            <span class="capitalletter">R</span>egistration
          </div>
        </div>
        <div class="login-form">
          <div class="login-header">Login</div>
          <div class="input-container">
            <v-text-field
              type="text"
              placeholder="username"
              v-model="username"
              solo
            >
              <v-icon color="black" slot="prepend-inner">mdi-account</v-icon>
            </v-text-field>
            <v-text-field
              type="password"
              placeholder="password"
              v-model="password"
              solo
            >
              <v-icon color="black" slot="prepend-inner"
                >mdi-form-textbox-password</v-icon
              >
            </v-text-field>
          </div>
          <v-btn class="login-button" dark rounded @click="login()"
            >Login</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template> <script>
import { setToken } from "@/StorageFactory";
import axios from "axios";
export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        axios
          .post("/user/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            setToken(res.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
            this.$store.dispatch("GET_CURRENT_USER");
            if (res.data.isAdmin) {
              this.$router.push("/admin");
            } else {
              this.$router.push("/user");
            }
          });
      }
    },
  },
};
</script> 

<style lang="scss" scoped>
::v-deep .v-input__slot {
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1) !important;
  height: 62px !important;
  border-radius: 20px !important;
  .v-text-field__slot {
    padding-left: 10px !important;
  }
}
.main-container {
  height: 100%;
  .inner-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: white;
    background: linear-gradient(-9deg, #1777f2, #fefefe);
    .login-container {
      padding: 60px 48px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0px 0px 152px rgba(0, 0, 0, 0.161);
      .image-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
          font-weight: bolder;
          font-size: 24px;
          color: black;
          .capitalletter {
            font-size: 32px;
            color: black;
          }
        }
      }
      .login-form {
        width: 100%;
        text-align: center;
        .login-button {
          color: white;
          padding: 20px 50px;
        }
        .login-header {
          font-size: 24px;
          font-weight: 700;
          color: black;
          line-height: 1.2;
          text-align: center;
          width: 100%;
          padding-bottom: 54px;
        }
        .button-container {
          padding: 12px 0;
          .v-btn {
            font-size: 20px;
            line-height: 1.5;
            color: #fff;
            text-transform: uppercase;
            width: 100%;
            height: 50px;
            border-radius: 25px;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 25px;
            transition: all 0.4s;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .main-container {
    .inner-container {
      .login-container {
        display: flex;
        flex-direction: column;
        padding: 30px 48px;
        .image-container {
          padding-bottom: 10px;
        }
        .login-form {
          .login-header {
            padding-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>
