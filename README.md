# Gateway Demo

## Running The Solution

### Pre-requisities

- Docker

### Steps

In order to start up the solution, all you need to do is open the root folder, start up a command prompt and run `docker-compose up --build`;

### Populating the Database

To populate with sample data, uncomment the `seedDB function and import` from index.js in `services/gateway-api` folder. Please note that any previous gateway/peripheral data will be deleted. To preven this, go to `helpers\db-seeder.js` and comment out the first 2 lines in the function that `deleteMany`;

### Running Tests

In order to run tests you need to have a mongodb instance running on port `27017`. This can be easily achieved by commenting out everything except the DB definition in docker-compose and starting up the container.

### Developer Comments

The solution uses a **non-persistent** MongoDB that gets started up with the compose. Even though its a non-persistent, unless the container created by docker-compose is deleted, the data will be kept by Docker.

## Client

A simple angular client with a dashboard functionality to view and add gateways as well as add/view/delete peripheral devices associated with said gateways.

## Services

### Gateway API

This API provides a simple REST service for managing devices and gateways. 

#### Routes

##### `GET localhost:3000/api/gateways`

Returns a list of all gateways with their respective peripheral devices.

##### `POST localhost:3000/api/gateways`

###### Payload
```json
{
	"serialNumber": "CV213SDAE123",
	"name": "Home Router",
	"ipv4": "192.168.0.1"
}
```

##### `POST localhost:3000/api/gateways/:gateId/peripherals`

- **gateId**: The id of the gateway.

###### Payload
```json
{
	"vendor": "TP-Link",
	"status": "online"
}
```

##### `DELETE localhost:3000/api/gateways/:gateId/peripherals/:id`

- **gateId**: The id of the gateway the device is connected to.
- **id**: The id of the device to be removed.