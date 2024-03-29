import { SharedSettings } from './protected'
export interface message extends EditorMessageMap {
    'query-shared-settings': {
        params: [],
        result: SharedSettings,
    };
}
