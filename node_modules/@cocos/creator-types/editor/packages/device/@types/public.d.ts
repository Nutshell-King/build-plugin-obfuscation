export interface IDevices {
    devices: IDeviceItem[];
    custom: IDeviceItem[];
    enable: string;
}

export interface IDeviceItem {
    name: string;
    width: number;
    height: number;
    ratio: number;
}