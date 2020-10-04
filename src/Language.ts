import Client from './Client';
import Constants from './Constants';
import { Tree, TreeItem } from './types';
import { findBestMatch } from 'string-similarity';

export default class Language {
    public cache?: TreeItem[];
    public constructor(
        public readonly client: Client,
        public readonly raw: TreeItem
    ) {}
    public async fetchRawImages() {
        return this.cache || (this.cache = (await this.client.requestHandler.request<Tree>(this.raw.url)).tree);
    }
    public fetchImageNames() {
        return this.fetchRawImages().then(d => d.map(x => x.path));
    }
    public fetchImages() {
        return this.fetchImageNames().then(d =>
            d.map(x => `${Constants.USERCONTENT_URL}/${Constants.REPO_PATH}/master/${this.raw.path}/${x}`)
        );
    }
    public async search(str: string) {
        return findBestMatch(str, await this.fetchImages())
            .ratings.sort((a, b) => b.rating - a.rating)
            .map(x => x.target);
    }
}