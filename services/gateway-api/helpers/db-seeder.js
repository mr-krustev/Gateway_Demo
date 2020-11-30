const Gateway = require('../models/Gateway')
const Peripheral = require('../models/Peripheral');
const gatewayDal = require('../dals/gateway-dal');

const seedDB = async () => {
    try {
        console.log('Removing old stuff from DB.')
        await Gateway.deleteMany({});
        await Peripheral.deleteMany({});

        console.log('Adding new gateways.')
        const gatewayIds = []
        for (let index = 0; index < 5; index++) {
            let gateway = {
                serialNumber: 'CV2543LGK' + index,
                name: 'Home_Router_' + index,
                ipv4: '192.168.0.' + (index + 1)
            }
            let response = await gatewayDal.addGateway(gateway);
            gatewayIds.push(response._id);
            console.log(response)
        }

        console.log('Adding new peripherals.')
        for (let index = 0; index < gatewayIds.length; index++) {
            const gatewayID = gatewayIds[index];
            let peripheralCount = (index + 1) * 2;
            for (let j = 0; j < peripheralCount; j++) {
                const peripheral = {
                    vendor: 'Lenovo_' + j,
                    status: j % 2 == 0 ? 'online' : 'offline'
                }
                let response = await gatewayDal.addPeripheral(gatewayID, peripheral);
                console.log(response)
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB