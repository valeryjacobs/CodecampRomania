'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var connectionString = 'HostName=vjiot.azure-devices.net;DeviceId=Device00000001;SharedAccessKey=pLwiv8chaNjIesQYOUWISH276Ao6TUUpYTQUI=';
var client = clientFromConnectionString(connectionString);
console.log('Starting simulation with a 2 second interval');

var tid = setInterval(sendMessage, 2000);

function sendMessage() {
    var windSpeed = 10 + (Math.random() * 4);
    var data = JSON.stringify({ deviceId: 'Device00000001', windSpeed: windSpeed });
    var message = new Message(data);
    console.log("Sending message: " + message.getData());
    client.sendEvent(message, printResultFor('send'));
}

function abortTimer() { // to be called when you want to stop the timer
    clearInterval(tid);
}

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

