<template>
  <div class="chat-container">
    <!-- channel container -->
    <div style="background:black" class="channel-container">
      <router-link to="/chat"><a class="channels_link">
       <i class="arrow left"></i> All
        channels </a
      ></router-link>
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
      <div class="dropup">
        <button class="dropbtn">jdidi daoud</button>
        <img
          class="photo"
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        />
        <div class="dropup-content">
          <a href="#"> profile</a>

          <a href="#">log out</a>
        </div>
      </div>
    </div>
    <!-- chat form  -->
    <div style="background:black" class="chat-form">
      <div class="lines">
        <hr class="hr_left" />
        <p class="time_line">today at 5sdcczqxzdxazdpm</p>
        <hr class="hr_right" />
      </div>

      <div class="lines">
        <hr class="hr_left" />
        <p class="time_line">today at m</p>
        <hr class="hr_right" />
      </div>

      <div class="content_message">
        <img
          src="https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg"
          class="message_photo"
        />
        <div class="message_info">
          <div class="name_date">
            <h5 class="message_name">jdidi daoud</h5>
            <h6 class="message_date">10 jan 2019 13:00am</h6>
          </div>
          <p class="message">
            hi samira how are im here what are you doig , i hope everyrithing is
            collés&éesuçà^é n&"edçijhzdjàçzidjéàz edçjàué" "àçué"djç
            ç"eçàé"dfàçuézedjiçzdjçàaézdjéaçzjàdé"adjéàçdféajc djàéçadu éaçdjué&
            çà
          </p>
        </div>
      </div>
    </div>
    <div style="background:black" class="new-message-container">
      <div class="Icon-inside">
        <input class="new_message" type="text" placeholder="type a message" />
        <span class="material-icons">
          send
        </span>
      </div>
    </div>


  
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      oneRoom: {},
      roomUsers: [],
      currentId: null,
    };
  },
  methods: {
    getAllUsersForOneRoom() {
      this.currentId = this.$route.params.id;

      axios
        .get(`http://localhost:3000/api/room/${this.currentId}`)
        .then(({ data }) => {
          console.log("one room with all users", data);
          (this.oneRoom = data.room), (this.roomUsers = data.users);
          console.log("this is one room", this.oneRoom);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getAllUsersForOneRoom();
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
  text-decoration: none !important;
  color: white;
}

.new_message {
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
  color: white;
}
::placeholder {
  color: white;
  opacity: 1; /* Firefox */
}

.Icon-inside {
  width: 80%;
  height: 52px;
  border-radius: 7px;
  position: relative;
}
.material-icons {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  font-size: 50px;
  color: white;
  background-color: #1e90ff;
  border-radius: 7px;
  cursor: pointer;
}

</style>
