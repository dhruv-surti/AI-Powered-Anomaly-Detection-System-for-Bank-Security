# SIT314: AI-Powered Anomaly Detection System for Bank Security

This repository contains the source code and final report for the SIT314 Distinction project.

## Project Description

This project is a cloud-native, scalable IoT security system built on AWS. It uses an event-driven microservice architecture to provide intelligent, context-aware anomaly detection for a network of bank branches. The core feature is its ability to automatically scale under load, which was verified through a load-testing experiment.

## AWS Services Used

* **Amazon ECS (with Fargate):** To run and scale the containerized application.
* **Amazon ECR:** To store the Docker container image.
* **Amazon DynamoDB:** As the NoSQL database for storing branch state.
* **Amazon CloudWatch:** For monitoring, logging, and triggering auto-scaling alarms.
* **AWS IAM:** For managing secure access and permissions.
* **AWS IoT Core:** (If used for the initial data ingestion pipeline).

## How to Run

The project consists of two main components:

1.  **`anomaly-service`**: This is the main Dockerized application. It can be built using the provided `Dockerfile`.
2.  **`load-tester`**: This is a Node.js script used to simulate a high volume of traffic. To run it, navigate to the `load-tester` directory and run `npm install`, then `node load-tester.js` after configuring the target IP address.

## Final Report

The complete project report, including the scalability test results and evidence, can be found in the `final-report` directory.

[**View Final Project Report](./final-report/project_report.pdf)**