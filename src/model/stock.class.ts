export class Stock {

    private _open: string;
    private _high: string;
    private _low: string;
    private _close: string;
    private _volume: string;

    constructor() {}

    get open() { return this._open; }
    set open(open: string) { this._open = open; }

    get high() { return this._high; }
    set high(high: string) { this._high = high; }

    get low() { return this._low; }
    set low(low: string) { this._low = low; }

    get close() { return this._close; }
    set close(close: string) { this._close = close; }

    get volume() { return this._volume; }
    set volume(volume: string) { this._volume = volume; }

}