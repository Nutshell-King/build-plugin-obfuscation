import { IBundleConfig, ISettings } from '../public/build-result';
import { IBuildTaskItemJSON } from '../public/options';
import { IPackOptions, PreviewPackResult } from './texture-packer';

export interface message extends EditorMessageMap {
    'open-devtools': {
        params: [],
        result: void,
    },
    'generate-preview-setting': {
        params: [options: IBuildTaskOption],
        result: {
            settings: ISettings;
            script2library: Record<string, string>;
            bundleConfigs: IBundleConfig[];
        },
    },
    'query-tasks-info': {
        params: [options?: { type: 'build' | 'bundle' }],
        result: {
            list: IBuildTaskItemJSON[],
            queue: Record<string, IBuildTaskItemJSON>,
            free: boolean,
        },
    },
    /**
     * 查询某个构建任务信息
     */
    'query-task': {
        params: [id: string],
        result: IBuildTaskItemJSON,
    },
    /**
     * 预览合图
     * @param {object} pacUuid
     */
    'preview-pac': {
        params: [pacUuid: string, options?: IPackOptions],
        result: PreviewPackResult | null,
    },

    'add-task': {
        params: [options: IBuildTaskOption, shouldWait?: boolean],
        result: TaskAddResult | BuildExitCode,
    },
    'preview-bundle-config': {
        params: [config: CustomBundleConfigItem],
        result: Record<string, { compressionType: BundleCompressionType, isRemote: boolean} >,
    }
}
