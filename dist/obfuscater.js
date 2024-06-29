"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class Obfuscater {
    constructor() {
        // 初始化代码
    }
    static get Instance() {
        if (!Obfuscater.instance) {
            Obfuscater.instance = new Obfuscater();
        }
        return Obfuscater.instance;
    }
    // 混淆代码文件
    obfuscateCodeFiles(filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const obfuscateConfig = {
                target: 'node',
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                //中度混淆
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                debugProtection: false,
                debugProtectionInterval: 0,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                renameGlobals: false,
                rotateStringArray: true,
                selfDefending: true,
                shuffleStringArray: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 0.75,
                // transformObjectKeys: true, // 这个混淆选项打开会影响贪吃蛇游戏，勿打开
                unicodeEscapeSequence: false,
                //轻度混淆
                // compact: true,
                // controlFlowFlattening: false,
                // debugProtection: false,
                // debugProtectionInterval: false,
                // disableConsoleOutput: true,
                // identifierNamesGenerator: 'hexadecimal',
                // log: false,
                // renameGlobals: false,
                // rotateStringArray: true,
                // selfDefending: true,
                // shuffleStringArray: true,
                // splitStrings: false,
                // stringArray: true,
                // stringArrayEncoding: false,
                // stringArrayThreshold: 0.75,
                // unicodeEscapeSequence: false,
                //重度混淆
                // compact: true,
                // controlFlowFlattening: true,
                // controlFlowFlatteningThreshold: 1,
                // debugProtection: true,
                // debugProtectionInterval: true,
                // disableConsoleOutput: true,
                // identifierNamesGenerator: 'hexadecimal',
                // log: false,
                // renameGlobals: false,
                // rotateStringArray: true,
                // selfDefending: true,
                // shuffleStringArray: true,
                // splitStrings: true,
                // splitStringsChunkLength: 5,
                // stringArray: true,
                // stringArrayEncoding: 'rc4',
                // stringArrayThreshold: 1,
                // transformObjectKeys: true, // 这个混淆选项打开会影响贪吃蛇游戏，勿打开
                // unicodeEscapeSequence: false
            };
            // for (const filePath of filePaths) {
            //     const code = await readFile(filePath, 'utf8');
            //     const obfuscatedCode = obfuscate(code, midconfig).getObfuscatedCode();
            //     if (obfuscatedCode) {
            //         console.log(`混淆文件成功: ${filePath}`);
            //         writeFile(filePath, obfuscatedCode, 'utf8');
            //     }else{
            //         console.error(`混淆文件失败: ${filePath}`);
            //     }
            // }
            let toolsPath = Editor.Project.path + "/tool/obfuscator";
            let obfuscateConfigPath = toolsPath + "/ObfuscatorOptions.json";
            let result = yield this.exec(`node -r ts-node/register ${toolsPath}/source/index.ts -p '${JSON.stringify(filePaths)}' -c ${obfuscateConfigPath}`, {
                env: Object.assign(Object.assign({}, process.env), { LANG: 'en_US.UTF-8' // 设置所需的字符编码
                 })
            });
            let succ = result.isSuccess;
            let err = result.err;
            let data = result.data;
            console.log("混淆代码data", JSON.stringify(data));
            if (succ || err == null) {
                console.log("混淆代码成功");
            }
            else {
                console.error("混淆代码失败: ", JSON.stringify(err));
            }
        });
    }
    obfuscateAllCodeFiles(folderPath, config) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("obfuscate config", JSON.stringify(config));
            if (!config.isObfuscate) {
                return;
            }
            const pluginPath = (0, path_1.join)(__dirname, "..");
            console.log("插件路径: ", pluginPath);
            let toolsPath = "./tools";
            let obfuscateConfigPath = "";
            switch (config.obSelect) {
                case "low":
                    console.log("选择轻度混淆");
                    obfuscateConfigPath = (0, path_1.join)(pluginPath, toolsPath + "/configs/ObfuscatorOptionsLow.json");
                    break;
                case "medium":
                    console.log("选择中度混淆");
                    obfuscateConfigPath = (0, path_1.join)(pluginPath, toolsPath + "/configs/ObfuscatorOptionsMedium.json");
                    break;
                case "high":
                    console.log("选择重度混淆");
                    obfuscateConfigPath = (0, path_1.join)(pluginPath, toolsPath + "/configs/ObfuscatorOptionsHigh.json");
                    break;
                case "config":
                    console.log("选择重度混淆");
                    obfuscateConfigPath = config.obConfigPath;
                    break;
                default:
                    console.error("未知的混淆选项");
                    return;
            }
            // 转化为绝对路径
            console.log("混淆配置文件路径: ", obfuscateConfigPath.toString());
            //检查配置文件是否存在
            try {
                yield (0, promises_1.stat)(obfuscateConfigPath);
                console.log("配置文件存在: ", obfuscateConfigPath);
            }
            catch (error) {
                console.error("配置文件不存在: ", obfuscateConfigPath);
                return;
            }
            const execName = process.platform === 'win32' ? 'index.exe' : 'index';
            let result = yield this.spawn(
            // toolsPath + "/index.exe",
            (0, path_1.join)(pluginPath, toolsPath, execName), ["-p", folderPath, "-c", obfuscateConfigPath], {
                env: Object.assign(Object.assign({}, process.env), { LANG: 'en_US.UTF-8' // 设置所需的字符编码
                 })
            });
            let succ = result.isSuccess;
            let err = result.err;
            let data = result.data;
            console.log("混淆代码data", JSON.stringify(data));
            if (succ || err == null) {
                console.log("混淆代码成功");
            }
            else {
                console.error("混淆代码失败: ", JSON.stringify(err));
            }
        });
    }
    // 递归获取所有.js文件的地址
    getAllJsFilePaths(folderPath, jsFilePaths = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, promises_1.readdir)(folderPath);
            for (const file of files) {
                const filePath = (0, path_1.join)(folderPath, file);
                const fileStats = yield (0, promises_1.stat)(filePath);
                if (fileStats.isDirectory()) {
                    if (file === 'cocos-js' || file === 'plugin' || file === 'jsb-adapter') {
                        // 如果文件夹名字是"cocos-js"，跳过处理
                        continue;
                    }
                    // 如果是子文件夹，递归处理子文件夹中的文件
                    yield this.getAllJsFilePaths(filePath, jsFilePaths);
                }
                else if (fileStats.isFile() && file.endsWith('.js')) {
                    // 如果是.js文件，将其地址存储在数组中
                    jsFilePaths.push(filePath);
                }
            }
            return jsFilePaths;
        });
    }
    /**@description 执行命令 */
    exec(cmd, options, isLog = true) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            isLog && console.log(`执行命令 : ${cmd}`);
            let result = (0, child_process_1.exec)(cmd, options, (err, stdout, stderr) => {
                if (err) {
                    isLog && console.error(`执行命令 : ${cmd}失败`);
                    isLog && console.error("err", err);
                    isLog && console.error("stderr", stderr);
                    resolve({ isSuccess: false, data: stdout, err: err });
                }
                else {
                    resolve({ isSuccess: true, data: stdout, err: err });
                }
            });
            (_a = result.stdout) === null || _a === void 0 ? void 0 : _a.on("data", (data) => {
                isLog && console.log(data);
            });
            (_b = result.stderr) === null || _b === void 0 ? void 0 : _b.on("error", (data) => {
                isLog && console.error(data);
            });
        });
    }
    spawn(cmd, args, options, isLog = true) {
        return new Promise((resolve, reject) => {
            isLog && console.log(`执行命令 cmd: ${cmd}`);
            isLog && console.log(`执行命令 args: ${args}`);
            let ls = (0, child_process_1.spawn)(cmd, args, options);
            ls.stdout.on("data", (data) => {
                // buffer转字符串
                let str = data.toString();
                isLog && console.log("data", str);
            });
            ls.stderr.on("data", (data) => {
                let str = data.toString();
                isLog && console.error("stderr", str);
            });
            ls.on("close", (code) => {
                if (code == 0) {
                    resolve({ isSuccess: true, data: code, err: null });
                }
                else {
                    resolve({ isSuccess: false, data: code, err: null });
                }
            });
        });
    }
}
exports.default = Obfuscater;
