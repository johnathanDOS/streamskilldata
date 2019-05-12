const WebSocket = require('ws');

// Use your Misty's IP address
const ip = "10.0.0.99";

//Randomize EventName to avoid connecting to a subscription with the same name
//
var id = Math.floor((Math.random() * 1000000) + 1);
var eventName = "SkillData" + id

function streamSkillData() {
  //Create a new WebSocket connection to the robot.
  const ws = new WebSocket("ws://" + ip + "/pubsub");

  //When the WebSocket's open, send the subscribe message.
  ws.onopen = function(event) {
    console.log("WebSocket opened.");
    ws.send(JSON.stringify({
        "Operation": "subscribe",
        "Type": "SkillData",
        "DebounceMs": null,
        "EventName": eventName,
        "Message": "",
        "ReturnProperty": null
    }));
  };

  //Handle the WebSocket data from the server.
  ws.onmessage = function(event) {

    var data = event.data

    console.log(data);
  };
};

streamSkillData();