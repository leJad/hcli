const HackChat = require("/home/jeff/Desktop/hcli/src/hack.chat.js");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const chat = new HackChat();
const room = () => {
  console.log('Type the room you want to join and your nickname (for example: lobby Ecma')
  readline.question("", (messg) => {
    const arr = messg.split(' ')
    chat.join(arr[0],arr[1])
  });
};
room()
//TODO: Add new commands

chat.on("nicknameTaken", () => console.log("Nickname is taken"));

chat.on("nicknameInvalid", () => console.log("Nickname is invalid"));

chat.on("ratelimit", () => console.log("Ratelimited bruh"));

chat.on("joining", (session) => {
  session.sendMessage("Hello!");
  const inp = () => {
    readline.question("", (messg) => {
      session.sendMessage(messg);
      inp();
    });
  };
  inp();
});

chat.on("onlineSet", function (session, users) {
  console.log(`Users online in ${session.channel}: ${users.join(", ")}`);
});

chat.on("onlineAdd", function (session, user) {
  console.log(`${user} Joined to ${session.channel}`);
});

chat.on("onlineRemove", function (session, user) {
  console.log(`${user} Left the ${session.channel}`);
});

chat.on("invitation", (session,nick, channel) =>{
  console.log(`${nick} Invited you to ${channel}`)
})

chat.on("chat", function (session, nick, text) {
  console.log(`${nick}@${session.channel}: ${text}`);
});
