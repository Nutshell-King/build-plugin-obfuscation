import { AssetInfo, AssetDBOptions, ExecuteAssetDBScriptMethodOptions } from '../public';
import { message as publicMessage } from '../message';
import { IData } from '@editor/asset-db/libs/data';
import { MissingAssetInfo } from '@editor/asset-db/libs/info';
export interface message extends publicMessage {
    /**
     * 查询已被删除的资源信息
     */
    'query-missing-asset-info': {
        params: [
            urlOrPath: string, // uuid | path
        ],
        result: MissingAssetInfo | null,
    },
    /**
     * 查询资源依赖的 uuid 数组
     */
    'query-asset-dependinces': {
        params: [
            string
        ],
        result: string[],
    },
    'query-asset-mtime': {
        params: [
            string
        ],
        result: string | null,
    },
    /**
     * 查询资源被哪些资源直接使用到
     */
    'query-asset-used': {
        params: [
            string
        ],
        result: string | null,
    },
    /**
     * 查询资源的 data 信息
     */
    'query-asset-data': {
        params: [
            string
        ],
        result: IData | null,
    },
    /**
     * 检查刷新所有的数据库
     */
    'refresh': {
        params: [],
        result: void,
    },
    /**
     * 检查是否已有资源处理任务
     */
    'is-busy': {
        params: [],
        result: boolean,
    },
    /**
     * 暂停资源处理
     */
    'pause': {
        params: [
            string,
        ],
        result: boolean,
    },
    /**
     * 恢复资源处理
     */
    'resume': {
        params: [],
        result: boolean,
    },
    'open-devtools': {
        params: [],
        result: void,
    },
    /**
     * 查询指定名称的数据库信息
     * @name 数据库名称
     */
    'query-db-info': {
        params: [
            string,
        ],
        result: AssetDBOptions,
    },
    /**
     * 查询所有的数据库名称列表
     */
    'query-db-list': {
        params: [],
        result: string[],
    },
    /**
     * 指定类型弹出创建资源的对话框
     * @param type cc.Material cc.Mesh 格式
     * @param url 可选，指定路径
     */
    'create-asset-dialog': {
        params: [
            string,
        ] | [
            string,
            string,
        ],
        result: string | null,
    },
    /**
     * 将一个虚拟资源实例化成一个实体资源
     * @param source 需要实例化的虚拟资源
     * @param target 生成到到某个路径内
     */
    'init-asset': {
        params: [
            string,
            string,
        ],
        result: AssetInfo | null,
    },
    /**
     * 查询出所有的 importer
     */
    'query-all-importer': {
        params: [],
        result: string[],
    },
    /**
     * 查询出所有的 assetTypes
     */
    'query-all-asset-types': {
        params: [],
        result: string[],
    },
    /**
     * 执行指定的 db 脚本
     */
    'execute-script': {
        params: [ExecuteAssetDBScriptMethodOptions];
        result: any;
    }
}
