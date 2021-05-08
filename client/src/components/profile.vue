<template>
  <div class="contain">
    <div class="dropdown">
      <button class="dropbtn">
        <img
        v-if="user.photo===undefined"
          class="photo"
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        />
        <img   v-if="user.photo!==undefined" class="photo" :src="user.photo" />
        {{ user.name }}
      </button>
      <div class="dropdown-content">
        <div class="icon">
          <span class="material-icons"> account_circle </span>
          <a class="routes" href="#">profile</a>
        </div>
        <div class="icon">
          <span class="material-icons"> groups </span>

          <a class="routes"><router-link to="/chat">group chat</router-link></a>
        </div>
        <div class="icon">
          <span class="material-icons"> logout </span>
          <a  class="routes" href="#" @click="logOut()">log out</a>
        </div>
      </div>
    </div>
    <div class="container" v-if="show === false">
      <div class="personal_info">
        <h2>Personal info</h2>
        <p>basic info,like your name and photo</p>
      </div>

      <table>
        <tr class="profile_tr">
          <td class="profile">profile</td>
          <td><button class="profile_btn" @click="click()">edit</button></td>
        </tr>
        <tr class="photo_div">
          <td class="photo_profile">photo</td>
          <td class="button_edit">
            <img
              v-if="user.photo===undefined"
              class="photo_profile"
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            />
            <img
             v-if="user.photo!==undefined"
              class="photo_profile"
              :src="user.photo"
            />
          </td>
        </tr>
        <tr class="col_tr">
          <td class="text_title">NAME</td>
          <td class="text">{{ user.name }}</td>
        </tr>
        <tr class="col_tr">
          <td class="text_title">BIO</td>
          <td class="text">{{ user.bio }}</td>
        </tr>
        <tr class="col_tr">
          <td class="text_title">phone</td>
          <td class="text">{{ user.phone }}</td>
        </tr>
        <tr class="col_tr">
          <td class="text_title">email</td>
          <td class="text">{{ user.email }}</td>
        </tr>
      </table>
    </div>
    <div class="contain_edit" v-else>
      <button class="back_btn" @click="click()">
        <i class="arrow left"></i>Back
      </button>
      <div class="div_inputs">
        <div class="text_div">
          <h5>Change Info</h5>
          <p class="para_small">changes will reflected in every services</p>
        </div>
        <div class="profile-div">
          <img
             v-if="user.photo===undefined"
            class="img-div"
            id="blah"
            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg  "
          />
          <img
            v-if="user.photo!==undefined"
            class="img-div"
            id="blah"
            :src="user.photo"
          />
          <div class="overlay">
            <input id="imgInp" type="file" @change="uploadPhoto" />
            <p class="para-pic">Change Picture</p>
          </div>
        </div>
        <form>
          <div class="edit">
            <p for="name" class="paragraph_input">name</p>
            <input
              id="name"
              type="text"
              class="input"
              data-type="name"
              placeholder="enter your name"
              v-model="name"
            />
          </div>
          <div class="edit">
            <p for="Bio" class="paragraph_input">Bio</p>
            <input
              v-model="bio"
              rows="10"
              id="Bio"
              type="text"
              class="input"
              data-type="Bio"
              placeholder="enter your Bio"
            />
          </div>
          <div class="edit">
            <p for="Phone" class="paragraph_input">Phone</p>
            <input
              v-model="phone"
              id="Phone"
              type="text"
              class="input"
              data-type="Phone"
              placeholder="enter your Phone"
            />
          </div>
          <div class="edit">
            <p for="Email" class="paragraph_input">Email</p>
            <input
              v-model="email"
              id="Email"
              type="email"
              class="input"
              data-type="Email"
              placeholder="enter your Email"
            />
          </div>
          <div class="edit">
            <p for="Password" class="paragraph_input">Password</p>
            <input
              v-model="password"
              id="Password"
              type="password"
              class="input"
              data-type="Password"
              placeholder="enter your Password"
            />
          </div>
          <div class="edit">
            <p for="repeat password" class="paragraph_input">repeat password</p>
            <input
              v-model="repeatPassword"
              id="repeat password"
              type="password"
              class="input"
              data-type="repeat password"
              placeholder="Repeat password"
            />
          </div>
        </form>
        <button @click="editUser()" class="submit">save</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      showPhoto: false,
      show: false,
      user: {},
      name: "",
      bio: "",
      phone: "",
      password: "",
      repeatPassword: "",
      email: "",
      photo: "",
      selected: "",
      has_special: false,
      has_number: false,
    };
  },

  methods: {
    showphoto() {
      if (this.photo === "") {
        return this.showPhoto === true;
      } else {
        return this.showPhoto === false;
      }
    },
    click() {
      this.show = !this.show;
    },

    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    uploadPhoto(event) {
      event.preventDefault();
      this.selected = event.target.files[0];
      console.log("ahahaha", this.selected);
      const image = new FormData();
      image.append("file", this.selected);
      image.append("upload_preset", "fvzq7qqo");
      axios
        .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
        .then(({ data }) => {
          // console.log("imageId", this.photo);
          this.user.photo = data.url;
          this.showPhoto =!this.showPhoto ;
          // console.log("this.is user image :", this.photo);

          this.showphoto();
        })
        .catch((err) => console.log(err));
    },
    editUser() {
  
      this.has_special = /[!@#%*+=._-]/.test(this.password);
      this.has_number = /\d/.test(this.password);

      if (
        this.name === "" ||
        this.password === "" ||
        this.repeatPassword === "" ||
        this.email === ""
      ) {
        swal("Oops!", "Empty fields", "error");
      } else if (!this.has_special && this.has_number) {
        swal(
          "Oops!",
          "Password needs to have at least one special character and one number",
          "error"
        );
      } else if (this.password !== this.repeatPassword) {
        swal("Oops!", "Password does not match!", "error");
      } else {
        const data = {
          name: this.name,
          bio: this.bio,
          phone: this.phone,
          email: this.email,
          password: this.password,
          photo: this.user.photo,
        };
        axios
          .patch(`http://localhost:3000/api/user/${this.user._id}`, data)
          .then(({ data }) => {
            // console.log("user id ", data);
            swal("Welcome", "success");
            this.getUser();
     
          });
      }
    },
    getUser() {
      const token = localStorage.getItem("token");
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      axios.get("http://localhost:3000/api/user/", headers).then(({ data }) => {
        // console.log("USERBEFORE", this.user);
        this.user = data.user;
        // console.log("USERAFTER", this.user);
      });
    },
  },
  mounted() {
    this.getUser();
    this.showphoto();
  },
};
</script>
<style scoped>
.back_btn {
  margin-bottom: 5px;
  color: rgb(0, 132, 255);
}
.arrow {
  border: solid rgb(0, 132, 255);
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.para_small {
  color: grey;
}
.submit {
  color: white;
  margin: 10px 50px;
  border: 1px solid grey;
  text-align: center;
  border-radius: 10px;
  padding: 10px 10px;
  background-color: rgb(0, 132, 255);
}
.text_div {
  margin: 7px 50px;
}
.paragraph_input {
  margin: 0;
}
.edit {
  margin-left: 50px;
  margin-top: 5px;
}
.div_inputs {
  border: 1px solid grey;
  width: 700px;
  height: 850px;
  margin: 0;
  border-radius: 10px;
}
.form {
  margin-top: 10px;
}
.input {
  border: 1px solid grey;
  border-radius: 5px;
  width: 500px;
  padding: 10px;
  height: 50px;
}
.contain_edit {
  margin-top: 5%;
  margin-left: 25%;
  border-radius: 20px;
}
.button_edit {
  padding-left: 50px;
}
.contain {
  width: auto;
  margin: auto;
}
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  min-width: 500px;

  max-height: 600px;
  font-family: "Poppins", sans-serif;
}
.photo_div {
  height: 70px;
}
.personal_info {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
}
.profile_tr {
  height: 80px;
}
.profile {
  padding-left: 10px;
  font-size: 30px;
  font-weight: 500;
}
.button_edit {
  float: left;
  padding-left: 50px;
}
.profile_btn {
  float: right;
  margin-right: 30px;
  border: 1px solid grey;
  text-align: center;
  border-radius: 10px;
  padding: 10px 10px;
}
.photo_profile {
  padding-left: 10px;
  color: grey;
}
.col_tr {
  height: 50px;
}
.text_title {
  padding-left: 10px;
  color: grey;
}
.text {
  padding-left: 50px;
  font-size: 14px;
  font-weight: 700;
}
table tr {
  border: 0.5px solid #ccc;
  border-collapse: collapse;

  min-width: 500px;
  table-layout: fixed;
}
.photo_profile {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 5px;
}
table {
  border-radius: 20px;

}
.dropbtn {
  color: black;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}

.dropdown {
  font-family: "Poppins", sans-serif;
  float: right;
  margin: 20px 40px;
}

.dropdown-content {
  font-size: 15px;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 20px;
 
}

.dropdown-content a {
  color: grey;

  text-decoration: none;
  display: block;
}
.icon {
  padding-bottom: 2px;
}

.dropdown-content :hover {
  background-color: rgb(192, 184, 184);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown .dropbtn .dropdown-content :hover {
  background-color: rgb(112, 107, 107);
}
.photo {
  width: 50px;
  height: 50px;
  margin-right: 3px;
  border-radius: 50%;
}
.icon {
display:grid;
grid:"material-icons routes"40px;
width:100%
}
.span{
  top:0;
  grid-area:material-icons

}
.profile-div {
  margin: 20px 50px;
  max-width: 200px;
  position: relative;
  border-radius: 50%;
}
.profile-div:hover .overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
.profile-div:hover .overlay .para-pic {
  display: block;
}
.profile-div .img-div {
  display: block;
  width: 100%;
  border-radius: 50%;
  height: auto;
}
.profile-div .overlay {
  position: absolute;
  width: 100%;
  bottom: 0;
  overflow: hidden;
  height: 100%;
  border-radius: 50%;
}
.profile-div .overlay input {
  width: 100%;
  position: absolute;
  opacity: 0;
  bottom: 20px;
  z-index: 2;
  cursor: pointer;
}
.profile-div .overlay .para-pic {
  position: absolute;
  bottom: 10px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  width: 100%;
  display: none;
}
</style>
