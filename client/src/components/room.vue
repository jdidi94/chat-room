<template>
  <div class="chat-container">
    <!-- channel container -->
    <div style="background:black" class="channel-container">
      <router-link to="/chat"
        ><a class="channels_link">
          <i class="arrow left"></i> All channels
        </a></router-link
      >
    </div>
    <div style="background:black" class="title-container">
      <h3>{{ oneRoom.group_name }}</h3>
    </div>

    <div style="background:black" class="group-container">
      <div class="description_div">
        <h4 class="title_room">{{ oneRoom.group_name }}</h4>
        <p class="description">
          {{ oneRoom.description }}
        </p>
        <button
          type="button"
          @click="beAMemeber()"
          class="btn btn-outline-primary"
          id="memberShip"
        >
          be a memeber
        </button>
      </div>

      <div class="div_members">
        <div class="title_member">Members</div>
        <div v-for="user in roomUsers" :key="user._id" class="member">
          <img :src="user.photo" class="member_img" />
          <h5 class="name_member">{{ user.name }}</h5>
        </div>
      </div>
    </div>

    <!-- profile container -->
    <div style="background:black" class="profile-container">
      <div class="drop">
        <img class="tof" :src="user.photo" />
        <button class="drop_button">{{ user.name }}</button>
        <div class="drop-content">
          <router-link to="/profile">profile</router-link>

          <a @click="logOut()">log out</a>
        </div>
      </div>
    </div>
    <!-- chat form  -->
    <div style="background:black" class="chat-form" v-chat-scroll>
      <div class="lines">
        <!-- <hr class="hr_left" />
        <p class="time_line">time</p>
        <hr class="hr_right" /> -->
      </div>

      <div
        v-for="message in allMessages"
        :key="message._id"
        class="content_message"
      >
        <img :src="message.send.photo" class="message_photo" />
        <div class="message_info">
          <div class="name_date">
            <h5 class="message_name">{{ message.send.name }}</h5>
            <h6 class="message_date">{{ currentDateTime(message.date) }}</h6>
          </div>
          <p class="message">
            {{ message.message }}
          </p>
        </div>
      </div>
    </div>
    <div style="background:black" class="new-message-container">
      <div class="input-group mb-3">
        <input
          v-model="message"
          type="text"
          class="form-control"
          placeholder="Type a message"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            <span @click="create_message()" class="material-icons">send </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

import * as  io from "socket.io-client";
export default {
  data() {
    return {
      user: {},
      oneRoom: {},
      roomUsers: [],
      allMessages: [],
      currentId: "",
      message: "",
      date: "",
      socket: io("http://localhost:3000"),

      lastdate: "",
      beforelastDate: "",
      showDate: false,
    };
  },
  methods: {
    buttonState() {},
    getUser() {
      const token = localStorage.getItem("token");
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      axios.get("http://localhost:3000/api/user/", headers).then(({ data }) => {
        this.user = data.user;
      });
    },
    beAMemeber() {
      console.log("this.roomUsers", this.roomUsers);
      console.log("(user._id", this.user._id);
      if (!this.oneRoom.users.includes(this.user._id)) {
        const data = {
          message: true,
          users: this.user._id,
        };
        axios
          .put(`http://localhost:3000/api/room/${this.oneRoom._id}`, data)
          .then((data) => {
            console.log("this from the create memeber", data);
            this.getAllUsersForOneRoom();
            swal("You are a member now", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (this.oneRoom.users.includes(this.user._id)) {
          const data = {
            message: false,
            users: this.user._id,
          };
          axios
            .put(`http://localhost:3000/api/room/${this.oneRoom._id}`, data)
            .then((data) => {
              console.log("this from the create memeber", data);
              this.getAllUsersForOneRoom();
              swal("you are removed from this group ", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    create_message() {
      if (this.message === "") {
        swal("Oops!", "Empty fields", "error");
      } else if (!this.oneRoom.users.includes(this.user._id)) {
        swal("Oops!", "You should be a member", "error");
      } else {
        this.currentId = this.$route.params.id;
        const data = {
          user: this.user._id,
          room: this.currentId,
          message: this.message,
        };
        const data1 = {
          send: this.user,
          room: this.currentId,
          message: this.message,
        };
        this.socket.emit("save-message", data1);
        // this.socket.emit('save-message',{message:this.message});
        // console.log("heyyyyy",data)
        console.log(this.socket.connected);
        axios
          .post(`http://localhost:3000/api/message/`, data)
          .then(({ data }) => {
            this.message = "";
            console.log("message posted", data);

            this.getAllMessagesForOneRoom();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    currentDateTime(date) {
      const dateNow = moment();
      // return    moment(date).format('MMMM Do YYYY, h:mm:ss a');
      if (dateNow.diff(date, "seconds") <= 60) {
        return moment(date)
          .startOf("seconds")
          .fromNow();
      } else if (dateNow.diff(date, "minutes") > 1) {
        return moment(date)
          .startOf("minutes")
          .fromNow();
      } else if (dateNow.diff(date, "hours") >= 1) {
        return moment()
          .endOf("day", "hours", "minutes")
          .fromNow();
      } else {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },

    getAllUsersForOneRoom() {
      this.currentId = this.$route.params.id;

      axios
        .get(`http://localhost:3000/api/room/${this.currentId}`)
        .then(({ data }) => {
          // console.log("one room with all users", data);
          this.oneRoom = data.room;
          this.roomUsers = data.users;
          if (this.oneRoom.users.includes(this.user._id)) {
            document.getElementById("memberShip").innerHTML =
              "You are a member";
          } else {
            document.getElementById("memberShip").innerHTML = "be a memeber";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    getAllMessagesForOneRoom() {
      this.currentId = this.$route.params.id;

      axios
        .get(`http://localhost:3000/api/message/${this.currentId}`)
        .then(({ data }) => {
          this.allMessages = data;
          // console.log("all massages", data);
          this.lastdate = data[data.length - 1].date;
          this.beforelastDate = data[data.length - 2].date;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {},
  mounted() {
    this.getUser();
    this.getAllUsersForOneRoom();
    this.getAllMessagesForOneRoom();
    this.socket.on("new-message", (data) => {
      if (data.room===this.currentId){
      console.log(data);
      this.allMessages.push(data);

      // console.log("message data", this.socket.origin);
      console.log("all messages", this.allMessages);
    }});
  },
};
</script>

<style scoped>
.chat-form::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/* all group container */

.group_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border-radius: 5px;
}
/* popup */
.modal-title {
  color: black;
}
.btn .btn-primary {
  /* width: 100px;
  height: 30px; */
  float: right;
  margin-top: 5px;
  background-color: #1e90ff;
  border-radius: 3px;
  width: 30%;
  height: 10%;
}
.col-form-label {
  color: black;
}

/* all channel */
.one_channels {
  top: 40px;
  padding-top: 20px;
  font-size: 20px;
}
.create_room {
  font-size: 20px;
  font-weight: 600;
  width: 50px;
}

/*profile dropdown*/

.drop {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.drop-content {
  display: none;
  position: absolute;
  background-color: grey;
  min-width: 160px;
  bottom: 50px;
  z-index: 4;
  border-radius: 5px;
}

.drop-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.drop-content a :hover {
  background-color: white;
  cursor: pointer;
  color: grey;
}

.drop:hover .drop-content {
  display: block;
  cursor: pointer;
}
/* 
.drop:hover .drop_button {
  background-color:red;
} */
.tof {
  width: 50px;
  height: 50px;

  border-radius: 5px;
}
/* chat message */

.lines {
  display: flex;

  align-items: center;
  justify-content: row;
}
.hr_left {
  border: 0.5px solid grey;
  width: 100%;
  margin-right: 75px;
}
.time_line {
  font-size: 12px;
  height: 0;
  width: 100%;
  position: inherit;
}
.hr_right {
  border: 0.5px solid grey;
  width: 100%;
}
.content_message {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: row;
  padding: 40px 0px;
}
.name_date {
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: row;
}
.message_photo {
  width: 50px;
  height: 50px;

  border-radius: 5px;
}

.message_date {
  font-size: 10px;
}

/* group chat  memeber */
.description_div {
  padding: 20px 10px 10px 10px;
}

.title_room {
  font-size: 19px;
}
.description {
  font-size: 15px;
}

.title_member {
  padding: 5px 10px 20px 10px;
}
.name_member {
  font-size: 15px;
}
.member {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  padding: 5px 10px 1px 10px;
  cursor: pointer;
}
.member_img {
  width: 40px;
  height: 40px;

  border-radius: 5px;
}

.chat-container {
  display: grid;
  grid:
    "channel-container title-container" 60px
    "group-container    chat-form" 1fr
    " profile-container  new-message-container" 78px
    /275px 1fr;
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 95vh;
  color: white;
  border-radius: 10px;
  opacity: 1;
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #7f8c8d 74%);
}
.channel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50%;
  padding: 0 10px;
  grid-area: channel-container;
  opacity: 0.5;
  box-shadow: inset 0 0 6px rgba(240, 234, 234, 0.3);
}
.title-container {
  grid-area: title-container;
  opacity: 0.5;
  opacity: 0.5;
  box-shadow: inset 0 0 6px rgba(240, 234, 234, 0.3);
  padding: 15px 0px 0px 40px;
}
.group-container {
  grid-area: group-container;
  opacity: 0.5;
}
.profile-container {
  justify-content: center;
  grid-area: profile-container;
  opacity: 0.5;
  box-shadow: inset 0 0 6px rgba(240, 234, 234, 0.3);
}
.new-message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: new-message-container;
  opacity: 0.8;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 3%;
}
.chat-form {
  grid-area: chat-form;
  opacity: 0.8;
  padding: 0px 120px 10px 100px;
  overflow-y: scroll;
}
/* channels box */
.arrow {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.channels_link {
  font-size: 20px;
  cursor: pointer;
  text-decoration: none !important;
  color: white;
}

.input-group .mb-3 {
  color: white;
  background: grey;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  display: block;
  padding-left: 60px;
  padding-right: 60px;
  border-radius: 7px;
  font-size: 20px;
  color: grey;
}
::placeholder {
  color: grey;
  opacity: 1; /* Firefox */
}

.form-control {
  width: 20px;
  height: 50px;
  border-radius: 7px;
  position: relative;
  padding-left: 60px;
  padding-right: 60px;
}
.btn .btn-outline-secondary .material-icons {
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  font-size: 52px;
  color: #1e90ff;
  background: #1e90ff;
  border-radius: 7px;
  cursor: pointer;
}
</style>
