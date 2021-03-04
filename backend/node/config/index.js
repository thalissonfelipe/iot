const config = require('../mqtt.config.json');

module.exports = {
    getMQTTAddress: () => `mqtt://${config.mqtt.address}`,
    getMQTTUsername: () => config.mqtt.username,
    getMQTTPassword: () => config.mqtt.password
};
