import { BuildHook, IBuildResult, ITaskOptions } from '../@types';
import { PACKAGE_NAME } from './global';
import Obfuscater from './obfuscater';

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

let allAssets = [];

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function() {
    console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    allAssets = await Editor.Message.request('asset-db', 'query-assets');
};

export const onBeforeBuild: BuildHook.onBeforeBuild = async function(options: ITaskOptions, result: IBuildResult) {
    // TODO some thing
    log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
    Editor.Message.send('builder', 'open-devtools');
};

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function(options: ITaskOptions, result: IBuildResult) {
    console.debug('get settings test', result.settings);
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function(options: ITaskOptions, result: IBuildResult) {
    // Todo some thing
    console.log('webTestOption', 'onAfterCompressSettings');
};

export const onAfterBuild: BuildHook.onAfterBuild = async function(options: ITaskOptions, result: IBuildResult) {
    const config = options.packages[PACKAGE_NAME];
    // 开始混淆代码
    Obfuscater.Instance.obfuscateAllCodeFiles(result.paths.assets, config);
};

export const unload: BuildHook.unload = async function() {
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};

export const onError: BuildHook.onError = async function(options, result) {
    // Todo some thing
    console.warn(`${PACKAGE_NAME} run onError`);
};

export const onBeforeMake: BuildHook.onBeforeMake = async function(root, options) {
    console.log(`onBeforeMake: root: ${root}, options: ${options}`);
};

export const onAfterMake: BuildHook.onAfterMake = async function(root, options) {
    console.log(`onAfterMake: root: ${root}, options: ${options}`);
};
