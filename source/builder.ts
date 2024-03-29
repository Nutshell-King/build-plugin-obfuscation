import { join } from 'path';
import { BuildPlugin } from '../@types';
import { PACKAGE_NAME } from './global';

export const load: BuildPlugin.load = function() {
    console.debug(`${PACKAGE_NAME} load`);
};
export const unload: BuildPlugin.load = function() {
    console.debug(`${PACKAGE_NAME} unload`);
};

const complexTestItems = {
    number: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestNumber`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestNumber`,
        default: 80,
        render: {
            ui: 'ui-num-input',
            attributes: {
                step: 1,
                min: 0,
            },
        },
    },
    string: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestString`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestString`,
        default: 'cocos',
        render: {
            ui: 'ui-input',
            attributes: {
                placeholder: `i18n:${PACKAGE_NAME}.options.enterCocos`,
            },
        },
        verifyRules: ['ruleTest'],
    },
    boolean: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestBoolean`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestBoolean`,
        default: true,
        render: {
            ui: 'ui-checkbox',
        },
    },
};

export const configs: BuildPlugin.Configs = {
    '*': {
        hooks: './hooks',
        // doc: join(__dirname, "../readme.md"),
        options: {
            doc: {
                label: `i18n:${PACKAGE_NAME}.options.doc`,
                default: join(__dirname, "../README.md"),
                render: {
                    ui: 'ui-link',
                },
            },
            isObfuscate: {
                label: `i18n:${PACKAGE_NAME}.options.isObfuscate`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            obSelect:{
                label: `i18n:${PACKAGE_NAME}.options.obSelect`,
                default: 'low',
                render: {
                    ui: 'ui-select',
                    items: [
                        {
                            label: `i18n:${PACKAGE_NAME}.options.low`,
                            value: 'low',
                        },
                        {
                            label: `i18n:${PACKAGE_NAME}.options.medium`,
                            value: 'medium',
                        },
                        {
                            label: `i18n:${PACKAGE_NAME}.options.high`,
                            value: 'high',
                        },
                        {
                            label: `i18n:${PACKAGE_NAME}.options.config`,
                            value: 'config',
                        }
                    ],
                },
            },
            obConfigPath: {
                label: `i18n:${PACKAGE_NAME}.options.obConfigPath`,
                render: {
                    ui: 'ui-file'
                },
                verifyRules: [],
            },
            // remoteAddress: {
            //     label: `i18n:${PACKAGE_NAME}.options.remoteAddress`,
            //     default: 'https://www.cocos.com/',
            //     render: {
            //         ui: 'ui-input',
            //         attributes: {
            //             placeholder: 'Enter remote address...',
            //         },
            //     },
            //     verifyRules: ['required'],
            // },
            // enterCocos: {
            //     label: `i18n:${PACKAGE_NAME}.options.enterCocos`,
            //     description: `i18n:${PACKAGE_NAME}.options.enterCocos`,
            //     default: '',
            //     render: {
            //         /**
            //          * @en Please refer to Developer -> UI Component for a list of all supported UI components
            //          * @zh 请参考 开发者 -> UI 组件 查看所有支持的 UI 组件列表
            //          */
            //         ui: 'ui-input',
            //         attributes: {
            //             placeholder: `i18n:${PACKAGE_NAME}.options.enterCocos`,
            //         },
            //     },
            //     verifyRules: ['ruleTest'],
            //     verifyLevel: 'warn',
            // },
            // selectTest: {
            //     label: `i18n:${PACKAGE_NAME}.options.selectTest`,
            //     description: `i18n:${PACKAGE_NAME}.options.selectTest`,
            //     default: 'option2',
            //     render: {
            //         ui: 'ui-select',
            //         items: [
            //             {
            //                 label: `i18n:${PACKAGE_NAME}.options.selectTestOption1`,
            //                 value: 'option1',
            //             },
            //             {
            //                 label: `i18n:${PACKAGE_NAME}.options.selectTestOption2`,
            //                 value: 'option2',
            //             },
            //         ],
            //     },
            // },
            // objectTest: {
            //     label: `i18n:${PACKAGE_NAME}.options.objectTest`,
            //     description: `i18n:${PACKAGE_NAME}.options.objectTest`,
            //     type: 'object',
            //     default: {
            //         number: complexTestItems.number.default,
            //         string: complexTestItems.string.default,
            //         boolean: complexTestItems.boolean.default,
            //     },
            //     itemConfigs: complexTestItems,
            // },
            // arrayTest: {
            //     label: `i18n:${PACKAGE_NAME}.options.arrayTest`,
            //     description: `i18n:${PACKAGE_NAME}.options.arrayTest`,
            //     type: 'array',
            //     default: [complexTestItems.number.default, complexTestItems.string.default, complexTestItems.boolean.default],
            //     itemConfigs: JSON.parse(JSON.stringify(Object.values(complexTestItems))),
            // },
        },
        // panel: './panel',
        verifyRuleMap: {
            ruleTest: {
                message: `i18n:${PACKAGE_NAME}.ruleTest_msg`,
                func(val, buildOptions) {
                    if (val === 'cocos') {
                        return true;
                    }
                    return false;
                },
            },
        },
    },
};

export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';
