<template>
  <div class="chat-container">
    <div style="background:black" class="channel-container">
      <a class="channels_link"> <i class="arrow left"></i> All channels</a>
    </div>
    <div style="background:black" class="title-container">
      <h3>front end developer</h3>
    </div>
    <div style="background:black" class="group-container">
      <div class="description_div">
        <h4 class="title_room">front-end developer</h4>
        <p class="description">
          here we gho gopjazsd sdisdik diozd ,d pdzod zpod o,dzdijd zdko, zd
          zid,zod ,
        </p>
      </div>

      <div class="div_members">
        <div class="title_member">Members</div>
        <div class="member">
          <img
            src="https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg"
            class="member_img"
          />
          <h5 class="name_member">jdidi daoud</h5>
        </div>
        <div class="member">
          <img
            src="https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg"
            class="member_img"
          />
          <h5 class="name_member">jdidi daoud</h5>
        </div>
      </div>
    </div>
    <div style="background:black" class="profile-container">
      profile-container
    </div>

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
        <img src="https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg" class="message_photo" />
        <div class="message_info">
          <div class="name_date">
            <h5 class="message_name">jdidi daoud</h5>
            <h6 class="message_date">10 jan 2019 13:00am</h6>
          </div>
          <p class="message">
            hi samira how are im here what are you doig , i hope everyrithing is
            coll
          </p>
        </div>
        
      </div>
            <div class="content_message">
        <img src="https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg" class="message_photo" />
        <div class="message_info">
          <div class="name_date">
            <h5 class="message_name">jdidi daoud</h5>
            <h6 class="message_date">10 jan 2019 13:00am</h6>
          </div>
          <p class="message">
            hi samira how are im here what are you doig , i hope everyrithing is
            coll
          </p>
        </div>
        
      </div>
            <div class="content_message">
        <img src="https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg" class="message_photo" />
        <div class="message_info">
          <div class="name_date">
            <h5 class="message_name">jdidi daoud</h5>
            <h6 class="message_date">10 jan 2019 13:00am</h6>
          </div>
          <p class="message">
            hi samira how are im here what are you doig , i hope everyrithing is
            collés&éesuçà^é n&"edçijhzdjàçzidjéàz edçjàué" "àçué"djç ç"eçàé"dfàçuézedjiçzdjçàaézdjéaçzjàdé"adjéàçdféajc djàéçadu éaçdjué& çà
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

<style>
/* chat message */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
/* ::-webkit-scrollbar-thumb {
  background: red; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
} */
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
  gap:20px;
  align-items: center;
  justify-content: row;
  padding:40px 0px
}
.name_date {
  display: flex;
   gap:40px;
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
  font-size:10px
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
  display: grid;
  align-items: center;
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
  overflow-y:scroll ;
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
/* .search-container .conversation-list .new-message-container {
  background: black;
}
.search-container {
  grid-area: search-container;
  border-radius: 10px 0 0 0;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
  z-index: 1;
}
.new-message-container {
  grid-area: new-message-container;
  border-top: 1px solid white;
  border-radius: 0 0 0 10px;
}
.conversation-list {
  grid-area: conversation-container;
}
.chat-title .chat-form {
  background: #000000;
}
.chat-title {
  grid-area: chat-title;
}
.chat-form {
  grid-area: chat-form;
}

.chat-message-list {
  grid-area: chat-message-list;
} */
</style>
