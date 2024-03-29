import { BundleCompressionType, IAssetPathInfo, IBuildPaths, IBuildTaskOption, IBundleConfig, IJsonPathInfo, ISettings, UUID, IBuildSceneItem, ITextureCompressType, ITextureCompressFormatType } from '../public';
import { IAssetInfo, BuilderAssetCache } from './asset-manager';
import { ImportMapWithImports } from './import-map';
import { IInternalBuildOptions } from '../protect';

// 已经约定好的一些统计 key （不完整）
export const enum BuildMetricKey {
    platform = 'B100001',
    gameName = 'B100004',
    packageName = 'B100005',
    sceneNum = 'B100006',
    scriptNum = 'B100007',
    assetNum = 'B100008',
    includeModules = 'B100009',
    size = 'B100010',
    server = 'B100012',
    orientation = 'B100011',
    is3D = 'B100014',
    sceneOrPrefab = 'B100016',
    audioClip = 'B100038',
    appid = 'B100013',
    dimension = 'B100014',
    meshNum = 'B100015',
    prefabNum = 'B100016',
    useSplashScreen = 'B100018',
    designResolution = 'B100017',
    buildTime = 'B100042',
    makeTime = 'B100043',
    error = 'B100044',
    customCompress = 'B100145',
    renderPipeline = 'B100031',
    splashSettings = 'B100039',
}

export const enum BuildCrashMetricKey {
    platform = 'B100000',
    projectId = 'B100002',
    gameName = 'B100003',
    packageName = 'B100004',
    sceneNum = 'B100005',
    scriptNum = 'B100006',
    assetNum = 'B100007',
    includeModules = 'B100008',
    appid = 'B100009',
}

export class TextureCompress {
    _taskMap: Record<string, IImageTaskInfo>;
    platform: string;
    async init(): Promise<void>;
    async updateUserConfig(): Promise<void>;
    addTask(assetInfo: IAssetInfo): IImageTaskInfo;
    async run(): Promise<void>;
}

export enum BuiltinBundleName {
    RESOURCES = 'resources',
    MAIN = 'main',
    START_SCENE = 'start-scene',
    INTERNAL = 'internal',
}

export interface IBundleManager {
    bundleMap: Record<string, IBundle>;
    bundles: IBundle[];
    destDir: string;
    scriptBuilder: ScriptBuilder;
    packResults: PacInfo;
    cache: BuilderAssetCache;
    hookMap: Record<string, string>;

    buildAsset(): Promise<void>;
    initBundle(): Promise<void>;
    initAsset(): Promise<void>;
    buildScript(): Promise<any>;
    outputBundle(): Promise<void>;
    bundleDataTask(): Promise<void>;

    runPluginTask(hookName: string): Promise<void>;
}

export class InternalBuildResult {
    settings: ISettings;

    // 脚本资源包分组（子包/分包）
    scriptPackages: string[];
    // MD5 后缀 map
    pluginVers: Record<UUID, string>;
    importMap: ImportMapWithImports;
    // 传入构建的 options
    rawOptions: IBuildTaskOption;
    // 输出路径集合
    paths: IBuildPaths;
    // 允许的自定义编译选项
    compileOptions?: any;
    staticsInfo: Record<string, any>;

    // addPlugin: (plugin: UUID) => void;
    // removePlugin: (plugin: UUID) => void;
}

export interface ICompressConfig {
    src: string;
    mipmapFiles?: string[];
    dest: string;
    compressOptions: Record<string, any>;
    format: ITextureCompressType;
    customConfig?: ICustomConfig;
    uuid: string;
    suffix: string;
    formatType: ITextureCompressFormatType;
} 

export interface ImageCompressTask {
    src: string;
    // 需要预生成的 mipmaps 源地址
    mipmapFiles?: string[];
    presetId: string;
    compressOptions: Record<string, any>;
    // suffixMap: Record<string, string>;

    dest?: string[]; // 纹理压缩生成后，会将地址输出在此
    suffix?: string[];
    mtime?: any;
}

export interface IImageTaskInfo {
    src: string;
    presetId: string;
    hasAlpha: boolean;
    mtime: string | number;
    hasMipmaps: boolean;
    compressOptions: Record<string, any>;

    // 不同纹理压缩类型的生成压缩地址
    dest: string[];
    suffix: string[];

    dirty?: boolean;
}

export interface ISuffixMap {
    native: Record<string, string[]>;
    import: Record<string, string[]>;
}

export interface IVersionMap {
    import: Record<UUID, string>;
    native: Record<UUID, string>;
}

export interface IMD5Map {
    'raw-assets': Record<UUID, string>;
    import: Record<UUID, string>;
    plugin?: Record<UUID, string>;
}
export interface IAtlasResult {
    assetsToImage: Record<string, string>;
    imageToAtlas: Record<string, string>;
    atlasToImages: Record<string, string[]>;
}

export class IBuilder {
    cache: BuilderAssetCache;
    result: InternalBuildResult;
    options: IInternalBuildOptions;
    bundleManager: IBundleManager;
    hooksInfo: IBuildHooksInfo;

    updateProcess: (message: string, increment?: number) => void;
}

export interface IBuildHooksInfo {
    pkgNameOrder: string[];
    infos: Record<string, { path: string; internal: boolean }>;
}

export class IBundle {
    readonly scenes: IBuildSceneItem[]; // 该 bundle 中的所有场景，包含重定向的
    readonly assets: UUID[]; // 该 bundle 中的所有资源，包含重定向的
    readonly assetsWithoutRedirect: UUID[]; // 该 bundle 中的未重定向的资源
    readonly scripts: UUID[]; // 该 bundle 中的所有参与编译的脚本（不包含插件脚本）
    readonly rootAssets: UUID[]; // 该 bundle 中的根资源，即直接放在 bundle 目录下的资源，包含重定向的资源
    readonly isSubpackage: boolean; // 该 bundle 是否是子包
    pluginScript: Set<UUID>; // 插件脚本
    root: string; // bundle 的根目录, 开发者勾选的目录，如果是 main 包，这个字段为 ''
    dest: string; // bundle 的输出目录
    importBase: string;
    nativeBase: string;
    scriptDest: string; // 脚本的输出目录
    name: string; // bundle 的名称
    priority: number; // bundle 的优先级
    compressionType: BundleCompressionType; // bundle 的压缩类型
    assetVer: IVersionMap; // bundle 内的资源版本
    version: string; // bundle 本身的版本信息
    readonly isRemote: boolean; // bundle 是否是远程包
    redirect: Record<UUID, string>; // bundle 中的重定向资源
    deps: Set<string>; // bundle 的依赖 bundle
    groups: IGroup[]; // 该 bundle 中的资源分组
    configOutPutName: string;
    config: IBundleConfig; // 该 bundle 的资源清单
    readonly isZip: boolean; // 该 bundle 是否是 zip 模式
    zipVer: string; // Zip 压缩模式，压缩包的版本
    // 存储纹理压缩 image uuid 与对应的纹理资源地址
    public compressRes: Record<string, string[]> = {};
    atlasRes: IAtlasResult;
    compressTask: Record<UUID, IImageTaskInfo> ;
    _rootAssets: Set<UUID>; // 该 bundle 直接包含的资源
    _scenes: Record<string, IBuildSceneItem>;
    _scripts: Set<UUID>; // 所有脚本，包含插件脚本
    _assets: Set<UUID>;
    output: boolean;
    md5Cache: boolean;
    debug: boolean;
    public paths: Record<string, string[]> = {};

    // addScene(scene: UUID): void;
    // addScript(script: UUID): void;
    build(): void;
    initConfig(): void;
    initAssetPaths(): Promise<void>;
    addRootAsset(asset: IAssetInfo): void;
    addAsset(asset: IAssetInfo): void;
    removeAsset(asset: UUID): void;
    addRedirect(asset: UUID, redirect: string): void;
    addAssetWithUuid(asset: UUID): void;
    getRedirect(uuid: UUID): string | undefined;
    addGroup(type: IJSONGroupType, uuids: UUID[]): void;
    addToGroup(type: IJSONGroupType, uuid: UUID): void;
    removeFromGroups(uuid: UUID): void;
    containsAsset(uuid: string, deep?: boolean): boolean;
}

export type ICompressImageResult = Record<UUID, {
    formats: string[],
    files: string[],
}>;

export interface IGroup {
    // 分组名字
    name: string;
    // 分组类型
    type: IJSONGroupType;
    // 该组中的资源 uuid 列表
    uuids: UUID[];
}

export type IJSONGroupType = 'NORMAL' | 'TEXTURE' | 'IMAGE';

export interface IDefaultGroup {
    assetUuids: UUID[];
    scriptUuids: UUID[];
    jsonUuids: UUID[];
}


export interface BundleFilterConfig {
    range: 'include' | 'exclude';
    type: 'asset' | 'url';
    patchOption?: {
        patchType: 'glob' | 'beginWith' | 'endWith' | 'contain';
        value: string;
    };
    assets?: string[];
}