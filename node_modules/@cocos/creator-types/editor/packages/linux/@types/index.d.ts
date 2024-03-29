/// <reference path='../../../@types/index'/>
export * from '@cocos/creator-types/editor/packages/builder/@types/protected';
import { IInternalBuildOptions, InternalBuildResult } from '@cocos/creator-types/editor/packages/builder/@types/protected';

export interface ITaskOption extends IInternalBuildOptions {
    packages: {
        'linux': IOptions;
        native: any;
    }
}

interface IOptions {
    renderBackEnd: {
        metal: boolean;
        gles3: boolean;
        gles2: boolean;
    },
}
