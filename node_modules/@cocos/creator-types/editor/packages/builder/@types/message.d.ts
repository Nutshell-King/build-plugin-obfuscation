export interface message extends EditorMessageMap {
    'open': {
        params: [
            panel: 'default' | 'build-bundle',
        ],
        result: void,
    },
    'query-worker-ready': {
        params: [],
        result: boolean,
    },
}
