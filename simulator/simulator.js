// Import the MQTT library that we installed
const mqtt = require('mqtt');

// For this test, we connect to a public MQTT broker.
// In Week 3, you will change this to your own AWS IoT endpoint.
const client = mqtt.connect('mqtt://broker.hivemq.com');

// Constants for our simulation
const BRANCH_COUNT = 100;
const SENSORS = ['motion-vault', 'door-main', 'audio-lobby', 'window-contact'];

// This function runs once the connection to the broker is successful
client.on('connect', () => {
  console.log('✅ Simulator successfully connected to MQTT broker.');

  // Start a loop that calls the simulateBankEvent function every 2000 milliseconds (2 seconds)
  setInterval(simulateBankEvent, 2000);
});

// This function generates and publishes one simulated event
function simulateBankEvent() {
  // Pick a random branch and sensor for this event
  const branchId = `B${Math.floor(Math.random() * BRANCH_COUNT) + 1}`; // e.g., "B78"
  const sensorId = SENSORS[Math.floor(Math.random() * SENSORS.length)];

  // Create the JSON payload for the message
  const payload = {
    branchId: branchId,
    sensorId: sensorId,
    // Randomly set status to 'detected' or 'clear'
    status: Math.random() < 0.3 ? 'detected' : 'clear', 
    timestamp: Date.now()
  };

  // Publish the payload as a string to the 'bank/events' topic
  client.publish('bank/events', JSON.stringify(payload));

  // Log the action to the console so we can see it's working
  console.log(`📡 Published event: `, payload);
}