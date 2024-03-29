import { IBuildPanel, IInternalBuild } from './build-plugin';


// 定义 builder 进程内的全局变量
declare global {
    // 构建进程可用
    const Build: IInternalBuild;

    const __manager: {
        taskManager: any;
        currentCompileTask: any;
        currentBuildTask: any;
        __taskId: string;
        workerMg: any;
    };

    // 渲染进程可用
    const BuildPanel: IBuildPanel;
}
