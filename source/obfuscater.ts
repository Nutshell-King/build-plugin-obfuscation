import { ExecOptions, exec, spawn } from 'child_process';
import { readFile, readdir, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { IOptions } from '../@types';


/**@description 命令行执行结果 */
export interface ResultCmd {
    data: any;
    err: any;
    isSuccess: boolean;
}

export default class Obfuscater {
    private static instance: Obfuscater;

    private constructor() {
        // 初始化代码
    }

    public static get Instance(): Obfuscater {
        if (!Obfuscater.instance) {
            Obfuscater.instance = new Obfuscater();
        }
        return Obfuscater.instance;
    }

    // 混淆代码文件
    private async obfuscateCodeFiles(filePaths:string[]) {
        const obfuscateConfig: any = {
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
        }
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

        let result = await this.exec(
            `node -r ts-node/register ${toolsPath}/source/index.ts -p '${JSON.stringify(filePaths)}' -c ${obfuscateConfigPath}`,
            {
                env: {
                    ...process.env,
                    LANG: 'en_US.UTF-8' // 设置所需的字符编码
                }
            })
        let succ = result.isSuccess;
        let err = result.err;
        let data = result.data;

        console.log("混淆代码data", JSON.stringify(data));

        if (succ || err == null) {
            console.log("混淆代码成功");
        } else {
            console.error("混淆代码失败: ", JSON.stringify(err));
        }
    }
    
    async obfuscateAllCodeFiles(folderPath:string, config: IOptions) {
        console.log("obfuscate config", JSON.stringify(config));

        if (!config.isObfuscate) {
            return;
        }

        const pluginPath = join(__dirname, "..");
        console.log("插件路径: ", pluginPath);

        let toolsPath = "./tools";
        let obfuscateConfigPath = "";

        switch (config.obSelect) {
            case "low":
                console.log("选择轻度混淆");
                obfuscateConfigPath = join(pluginPath, toolsPath + "/configs/ObfuscatorOptionsLow.json");
                break;
            case "medium":
                console.log("选择中度混淆");
                obfuscateConfigPath = join(pluginPath, toolsPath + "/configs/ObfuscatorOptionsMedium.json");
                break;
            case "high":
                console.log("选择重度混淆");
                obfuscateConfigPath = join(pluginPath, toolsPath + "/configs/ObfuscatorOptionsHigh.json");
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
            await stat(obfuscateConfigPath);
            console.log("配置文件存在: ", obfuscateConfigPath);
        } catch (error) {
            console.error("配置文件不存在: ", obfuscateConfigPath);
            return;
        }

        const execName = process.platform === 'win32' ? 'index.exe' : 'index';
        let result = await this.spawn(
            // toolsPath + "/index.exe",
            join(pluginPath, toolsPath, execName),
            ["-p", folderPath, "-c", obfuscateConfigPath],
            {
                env: {
                    ...process.env,
                    LANG: 'en_US.UTF-8' // 设置所需的字符编码
                }
            })
            
        let succ = result.isSuccess;
        let err = result.err;
        let data = result.data;

        console.log("混淆代码data", JSON.stringify(data));

        if (succ || err == null) {
            console.log("混淆代码成功");
        } else {
            console.error("混淆代码失败: ", JSON.stringify(err));
        }
    }

    
    // 递归获取所有.js文件的地址
    private async getAllJsFilePaths(folderPath: string, jsFilePaths: string[] = []) {
        const files = await readdir(folderPath);

        for (const file of files) {
            const filePath = join(folderPath, file);
            const fileStats = await stat(filePath);

            if (fileStats.isDirectory()) {
                if (file === 'cocos-js' || file === 'plugin' || file === 'jsb-adapter') {
                    // 如果文件夹名字是"cocos-js"，跳过处理
                    continue;
                }
                // 如果是子文件夹，递归处理子文件夹中的文件
                await this.getAllJsFilePaths(filePath, jsFilePaths);
            } else if (fileStats.isFile() && file.endsWith('.js')) {
                // 如果是.js文件，将其地址存储在数组中
                jsFilePaths.push(filePath);
            }
        }

        return jsFilePaths;
    }

    

    /**@description 执行命令 */
    exec(cmd: string,  options?: ExecOptions, isLog = true) {
        return new Promise<ResultCmd>((resolve, reject) => {
            isLog && console.log(`执行命令 : ${cmd}`);
            let result = exec(cmd, options, (err, stdout, stderr) => {
                if (err) {
                    isLog && console.error(`执行命令 : ${cmd}失败`);
                    isLog && console.error("err", err);
                    isLog && console.error("stderr", stderr);
                    resolve({ isSuccess: false, data: stdout , err: err});
                } else {
                    resolve({ isSuccess: true,  data: stdout , err: err});
                }
            });
            result.stdout?.on("data", (data) => {
                isLog && console.log(data)
            });
            result.stderr?.on("error", (data) => {
                isLog && console.error(data);
            })
        })
    }

    spawn(cmd: string, args: string[], options?: ExecOptions, isLog = true) {
        return new Promise<ResultCmd>((resolve, reject) => {
            isLog && console.log(`执行命令 cmd: ${cmd}`);
            isLog && console.log(`执行命令 args: ${args}`);

            let ls = spawn(cmd, args, options);

            ls.stdout.on("data", (data:Buffer) => {
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
                } else {
                    resolve({ isSuccess: false, data: code, err: null });
                }
            });

        })
    }

}
