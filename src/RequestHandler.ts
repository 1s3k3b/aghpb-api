import fetch from 'node-fetch';
import { promisify } from 'util';
import { EventEmitter } from 'events';

const wait = promisify(setTimeout);

export default class RequestHandler extends EventEmitter {
    private resetTimestamp?: number;
    private remainingRequests = 1;
    constructor(private authorization?: string) {
        super();
    }
    public async request<T>(u: string): Promise<T> {
        if (!this.remainingRequests) {
            this.emit('lock', u, this.resetTimestamp!);
            await wait(this.resetTimestamp!);
            this.emit('unlock', u);
        }
        const res = await fetch(u, this.authorization ? {
            headers: {
                Authorization: this.authorization,
            },
        } : {});
        this.resetTimestamp = +res.headers.get('x-ratelimit-reset')! * 1000 - Date.now();
        this.remainingRequests = +res.headers.get('x-ratelimit-remaining')!;
        this.emit('request', u, res.headers.raw());
        return this.remainingRequests ? res.json() : this.request<T>(u);
    }
}