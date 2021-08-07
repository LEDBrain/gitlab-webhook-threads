const EventEmitter = require('events');

class WebhookEvent extends EventEmitter {}

module.exports = new WebhookEvent();
