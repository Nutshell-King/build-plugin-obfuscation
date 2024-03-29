export { Asset, Importer, VirtualAsset } from '@editor/asset-db';

export * from './public';
export * from './protected/global';
export * from './protected/plugin';
export interface IAsset {
    name: string; // 资源名字
    asset: import('@editor/asset-db').Asset | import('@editor/asset-db').VirtualAsset; // AssetDB 的资源
}

// 如果使用了 datakeys 过滤，请使用此接口定义
export interface IAssetInfo {
    name: string; // 资源名字
    source: string; // url 地址
    path: string; // loader 加载的层级地址
    url: string; // loader 加载地址会去掉扩展名，这个参数不去掉
    file: string; // 绝对路径
    uuid: string; // 资源的唯一 ID
    importer: string; // 使用的导入器名字
    imported: boolean; // 是否结束导入过程
    invalid: boolean; // 是否导入成功
    type: string; // 类型
    isDirectory: boolean; // 是否是文件夹
    library: { [key: string]: string }; // 导入资源的 map

    // dataKeys 作用范围
    displayName?: string; // 资源用于显示的名字
    readonly?: boolean; // 是否只读
    visible?: boolean; // 是否显示
    subAssets?: { [key: string]: IAssetInfo }; // 子资源 map
    // 虚拟资源可以实例化成实体的话，会带上这个扩展名
    instantiation?: string;
    redirect?: IRedirectInfo; // 跳转指向资源
    meta?: any,
    fatherInfo?: any;
    extends?: string[]; // 资源的继承链信息
    mtime?: number; // 资源文件的 mtime
    depends?: string[]; // 依赖的资源 uuid 信息
    dependeds?: string[]; // 被依赖的资源 uuid 信息
}