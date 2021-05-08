<template>
  <div class="chat-container">
    <!-- create one room -->
    <div style="background:black" class="channel-container">
      <p class="one_channels">Channels</p>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@getbootstrap"
      >
        +
      </button>
    </div>

    <!-- group container -->

    <div style="background:black" class="group-container">
      <input
        class="inputs_groups"
        name="search"
        type="text"
        maxlength="50"
        rows="4"
        placeholder="search"
        v-model="search"
      />
      <div>
        <div class="div_members">
          <div v-for="room in filteredList" :key="room._id" class="member">
            <div
              @click="sharedata(room._id, room)"
              style="background:#1e90ff"
              class="group_logo"
            >
              {{ room.group_name.toUpperCase().slice(0, 1) }}
            </div>
            <h5 @click="sharedata(room._id)" class="name_member">
              {{ room.group_name }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <!-- profile container -->
    <div style="background:black" class="profile-container">
      <div class="dropup">
        <button class="dropbtn">{{ currentUser.name }}</button>
        <img class="photo" :src="currentUser.photo" />
        <div class="dropup-content">
          <a> profile</a>

          <a @click="logOut()">log out</a>
        </div>
      </div>
    </div>
    <!-- chat form  -->
    <div style="background:black" class="chat-form"></div>
    <div style="background:black" class="new-message-container"></div>

    <!-- popup create room -->

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Channel</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >Room name</label
                >
                <input
                  v-model="group_name"
                  type="text"
                  class="form-control"
                  id="recipient-name"
                />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >Description</label
                >
                <textarea
                  v-model="description"
                  class="form-control"
                  id="message-text"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="create_room()"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
import * as io from "socket.io-client";
export default {
  data() {
    return {
      allRooms: [],
      users: [],
      currentUser: {},
      group_name: "",
      description: "",
      show: false,
      search: "",
      // socket: io("http://localhost:3000"),
    };
  },
  methods: {
    sharedata(id) {
      this.$router.push({
        path: `/room/${id}`,
      });
    },

    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    getALLRooms() {
      axios
        .get("http://localhost:3000/api/room/")
        .then(({ data }) => {
          this.allRooms = data;
          console.log("all rooms", this.allRooms);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    create_room() {
      if (this.description === "" || this.group_name === "") {
        swal("Oops!", "Empthy field", "error");
      } else {
        this.users.push(this.currentUser._id);
        // console.log("this.c",this.users)
        const data = {
          users: this.users,
          group_name: this.group_name,
          description: this.description,
        };
        axios
          .post("http://localhost:3000/api/room/", data)
          .then(({ data }) => {
            console.log("the post is done", data);
            this.getALLRooms();
            swal("Succefully posted", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getUser() {
      const token = localStorage.getItem("token");
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      axios.get("http://localhost:3000/api/user/", headers).then(({ data }) => {
        this.currentUser = data.user;
        console.log("currentuser", this.currentUser);
      });
    },
  },
  computed: {
    filteredList() {
      return this.allRooms.filter((room) => {
        return room.group_name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },


  mounted() {

    this.getUser();
    this.getALLRooms();
  },
};
</script>

<style>
.chat-form::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/* all group container */
.inputs_groups {
  padding: 10px 10px;
  color: white;
  margin: 20px 20px 20px 13px;
  height: 30px;
  font-size: 13px;
  width: 80%;
  background: grey;
}
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

.dropbtn {
  grid-area: dropbtn;

  color: white;

  font-size: 16px;
  border: none;
  width: 100%;
  height: 100%;
}

.dropup {
  gap: 0;

  display: grid;
  grid: " photo dropbtn " 60px;
  justify-items: center;
  width: 100%;
}

.dropup-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  bottom: 30px;
  right: 30px;
  left: 30px;
  z-index: 1;
  border-radius: 5px;
}

.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-radius: 5px;
}

.dropup-content a :hover {
  background-color: grey;
}

.dropup:hover .dropup-content {
  display: block;
}

.dropup:hover .dropbtn {
  background-color: grey;
}
.photo {
  grid-area: photo;
  width: 60px;
  height: 60px;
  margin-right: 3px;
  border-radius: 5px;
}

/* chat message */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
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
.message_name {
}
.message_date {
  font-size: 10px;
}
.message {
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
.div_members {
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
.description {
}

.chat-container {
  display: grid;
  grid:
    "channel-container title-container" 60px
    "group-container    chat-form" 1fr
    " profile-container   new-message-container" 78px
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
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
}
.title-container {
  grid-area: title-container;
  opacity: 0.5;
  opacity: 0.5;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
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
  box-shadow: 5px 1px 5px -1px rgba(0, 0, 0, 0.75);
}
.new-message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: new-message-container;
  opacity: 0.8;
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
}
</style>
