/// <reference path='../../../@types/index'/>

export * from '@cocos/creator-types/editor/packages/builder/@types/protected';

import { IInternalBuildOptions } from '@cocos/creator-types/editor/packages/builder/@types/protected';

export type IOrientation = 'auto' | 'landscape' | 'portrait';

export type IDevToolsLaunchMethod = 'full' | 'lite';

export interface IOptions {
    appid: string;
    buildOpenDataContextTemplate: boolean;
    orientation: IOrientation;
    physX: {
        use: 'physX' | 'project';
        notPackPhysXLibs: boolean;
        multiThread: boolean;
        subThreadCount: number;
        epsilon: number;
    };

    subpackages?: { name: string, root: string }[];
    wasmSubpackage: boolean;

    devToolsLaunchMethod: IDevToolsLaunchMethod;
}

export interface ITaskOption extends IInternalBuildOptions {
    packages: {
        'bytedance-mini-game': IOptions;
    };
}
