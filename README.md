# Gateway Demo

## Client

Work in Progress.

## Services

### Gateway API

This API provides a simple REST service for managing devices and gateways. 

#### Routes

##### `GET localhost:3000/api/gateways`

Returns a list of all gateways with their respective peripheral devices.

##### `POST localhost:3000/api/gateways`

###### Payload
```
{
	"serialNumber": "CV213SDAE123",
	"name": "Home Router",
	"ipv4": "192.168.0.1"
}
```

##### `POST localhost:3000/api/gateways/:gateId/peripherals`

- **gateId**: The id of the gateway.

###### Payload
```
{
	"vendor": "TP-Link",
	"status": "online"
}
```

##### `DELETE localhost:3000/api/gateways/:gateId/peripherals/:id`

- **gateId**: The id of the gateway the device is connected to.
- **id**: The id of the device to be removed.