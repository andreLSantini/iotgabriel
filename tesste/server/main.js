import { Meteor } from 'meteor/meteor';

var mqtt = require('mqtt')
	var client  = mqtt.connect('mqtt://test.mosquitto.org')
	var awsIot = Meteor.npmRequire('aws-iot-device-sdk');
	var Fiber = Meteor.npmRequire('fibers');

	console.log('awsIot---->',awsIot)

	var device = awsIot.device({
       keyPath: 'C:/Users/Snt/tesste/server/certificados/private.pem',
       certPath: 'C:/Users/Snt/tesste/server/certificados/cert.pem',
       caPath: 'C:/Users/Snt/tesste/server/certificados/rootCA.pem',
      clientId: 'platform',
        region: 'us-west-2'
    });

Meteor.startup(() => {
 	
 	


	device
	  .on('connect', function() {
	    console.log('connect');
	    device.subscribe('topic1');
	    device.publish('topic1','1');
	    });

	device
	  .on('message', function(topic, payload) {
	    console.log('message teste se publico', topic, payload.toString());
	  })

	  // device
	  // .on('teste publica',function(topic, playload){
	  // 	device.subscribe('topic1/client1');
	  // 	device.publish('topic1/client1','1');
	  // })

	client.on('connect', function () {
	  client.subscribe('presence')
	  client.publish('presence', 'Hello mqtt')
	})
	 
	client.on('message', function (topic, message) {
	  // message is Buffer 
	  console.log('messagem ai carai-->'+ message.toString())
	  client.end()
	})


});

Meteor.methods({
    
    publishMessage: function(topic, message) {
        console.log("message to ssend: " + topic + ": " + message);   	
		 device.publish(topic, message, function() {
            console.log("message sent: " + message);
        });
        
    }
});



