import TransportStream from "winston-transport";

declare interface LokiTransportOptions extends TransportStream.TransportStreamOptions{
    host: string;
    basicAuth?: `${string}:${string}`;
    headers?: Record<string, string>;
    interval?: number;
    json?: boolean;
    batching?: boolean;
    labels?: Record<string, string>;
    clearOnError?: boolean,
    replaceTimestamp?: boolean,
    gracefulShutdown?: boolean,
    timeout?: number,
    onConnectionError?(error: unknown): void
}

declare class LokiTransport extends TransportStream {

    constructor(opts: LokiTransportOptions);
}

export = LokiTransport;
