/// <reference types="node" />
import { EventEmitter } from 'events';
export default class RequestHandler extends EventEmitter {
    private authorization?;
    private resetTimestamp?;
    private remainingRequests;
    constructor(authorization?: string | undefined);
    request<T>(u: string): Promise<T>;
}
