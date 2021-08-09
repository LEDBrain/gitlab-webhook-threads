import { EventEmitter } from 'events';

class WebhookEvent extends EventEmitter {}

export default new WebhookEvent();