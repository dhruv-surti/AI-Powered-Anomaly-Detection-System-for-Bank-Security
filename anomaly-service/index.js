import express from 'express';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// --- AWS Setup ---
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "BranchState"; // The table we created in Week 4

// --- Express App Setup ---
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 8080;

// --- Main Logic Endpoint ---
app.post('/analyze', async (req, res) => {
  const sensorEvent = req.body;

  // Basic validation
  if (!sensorEvent || !sensorEvent.branchId || !sensorEvent.sensorId) {
    return res.status(400).send({ error: 'Invalid sensor event payload' });
  }

  try {
    // 1. Get the current state for context from DynamoDB
    const getStateParams = {
      TableName: tableName,
      Key: { branchId: sensorEvent.branchId },
    };
    const branchStateResult = await dynamo.send(new GetCommand(getStateParams));
    const currentState = branchStateResult.Item?.currentState || "Unknown";

    console.log(`Event for ${sensorEvent.branchId} received. Current state is: ${currentState}`);

    // 2. Apply the "AI" logic
    if (sensorEvent.sensorId === 'motion-vault' && currentState === 'Closed') {
      console.log(`CRITICAL ANOMALY: Motion in vault at ${sensorEvent.branchId} while branch is closed!`);
      // In a real system, this would publish to the AlertingService
      res.status(200).send({ decision: 'ANOMALY_DETECTED', details: 'Vault motion detected after hours.' });
    } else {
      console.log(`Normal event processed for ${sensorEvent.branchId}.`);
      res.status(200).send({ decision: 'NORMAL', details: 'Event is consistent with current branch state.' });
    }
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).send({ error: 'Failed to process event.' });
  }
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`AnomalyDetectionService listening on port ${PORT}`);
});