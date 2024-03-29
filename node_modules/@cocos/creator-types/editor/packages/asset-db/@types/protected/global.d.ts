import { AssetDB } from "@editor/asset-db";
import { Meta } from "@editor/asset-db/libs/meta";
import { deprecate } from "util";
import { AssetInfo, IAssetWorkerInfo } from "../private";

declare global {
    const Manager: IAssetWorkerManager;
}

export interface IAssetWorkerManager {
    /**
     * @deprecated use `Manager.assetDBManager.assetDBMap` instead
     */
    AssetWorker: Record<string, AssetDB>;
    AssetInfo: IAssetWorkerInfo;
    Utils: {
        queryAssetDependeds(uuid: string): string[] | PromiseLike<string[]>;
        queryAssets: (options?: ISearchOptions, dataKeys?: string[]) => Promise<AssetInfo[]>,
        queryAssetInfo: (uuid: string, dataKeys?: string[]) => Promise<AssetInfo | null>;
        queryAssetMeta: (uuid: string) => Promise<Meta | null>;
        queryAssetMtime: (uuid: string) => Promise<number | null>;
        queryAssetDependencies: (uuid: string, type: 'asset' | 'script' = 'asset') => Promise<string[]>;
        encodeAsset: (database: AssetDB, asset: Asset | VirtualAsset) => IAssetInfo;
        url2uuid(url: string): string;
    },
    assetDBManager: {
        pause(source: string): Promise<boolean>;
        resume(): Promise<boolean>;
        assetDBMap: Record<string, AssetDB>;
    }
}