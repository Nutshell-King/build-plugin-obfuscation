export interface SharedSettings {
    useDefineForClassFields: boolean;
    allowDeclareFields: boolean;
    loose: boolean;
    guessCommonJsExports: boolean;
    exportsConditions: string[];
    preserveSymlinks: boolean;
    importMap?: {
        json: {
            imports?: Record<string, string>;
            scopes?: Record<string, Record<string, string>>;
        };
        url: string;
    };
}