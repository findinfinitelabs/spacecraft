# Introduction

To get started, this app runs in Node.js and Express.js.

It also uses Kafka to run a simulated event stream to a queue that is reflected via the UI values on each of the monitors.

## Issues with Permissions

If you are running into issues after installation of Zookeeper and Kafka, use the following commands to run the services and assign yourselves permissions.

```
sudo chown -R $(whoami) ~/Library/LaunchAgents
sudo chmod -R u+rwX ~/Library/LaunchAgents
```


## Start Zookeeper
```brew services start zookeeper```
## Start Kafka
```brew services start kafka```

## Run the App

To run the app type node app.js