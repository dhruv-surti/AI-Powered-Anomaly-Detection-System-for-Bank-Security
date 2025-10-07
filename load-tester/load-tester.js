import axios from 'axios';

// --- Configuration ---
// PASTE THE PUBLIC IP ADDRESS OF YOUR ECS TASK HERE
const SERVICE_IP = '15.134.34.126';
const SERVICE_URL = `http://${SERVICE_IP}:8080/analyze`;

const TEST_DURATION_SECONDS = 120; // Run test for 2 minutes
const REQUESTS_PER_SECOND = 50;   // Send 50 requests every second

const SENSORS = ['motion-vault', 'door-main', 'audio-lobby', 'window-teller'];
const getRandomBranchId = () => `B${Math.floor(Math.random() * 200)}`;
const getRandomSensorId = () => SENSORS[Math.floor(Math.random() * SENSORS.length)];

const sendRequest = async () => {
  const payload = {
    branchId: getRandomBranchId(),
    sensorId: getRandomSensorId(),
    status: 'detected',
    timestamp: Date.now()
  };
  try {
    await axios.post(SERVICE_URL, payload, { timeout: 2000 });
    process.stdout.write('.');
  } catch (error) {
    process.stdout.write('E');
  }
};

const runLoadTest = () => {
  console.log(`--- STARTING LOAD TEST on ${SERVICE_URL} ---`);
  let requestsSent = 0;
  const intervalId = setInterval(() => {
    for (let i = 0; i < REQUESTS_PER_SECOND; i++) {
      sendRequest();
      requestsSent++;
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    console.log(`\n--- LOAD TEST COMPLETE ---`);
    console.log(`Total requests sent: ~${requestsSent}`);
  }, TEST_DURATION_SECONDS * 1000);
};

runLoadTest();