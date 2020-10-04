import Constants from './Constants';
import Language from './Language';
import RequestHandler from './RequestHandler';
import { Tree, TreeItem } from './types';
import { findBestMatch } from 'string-similarity';

export default class Client {
    public readonly requestHandler: RequestHandler;
    public languages: {
        [key: string]: Language | undefined;
    } = {};
    public all?: TreeItem[];
    public urls?: string[];
    constructor(authorization?: string) {
        this.requestHandler = new RequestHandler(authorization);
    }
    public async init() {
        this.languages = Object.fromEntries(
            (await this.requestHandler.request<Tree>(`${Constants.API_URL}/repos/${Constants.REPO_PATH}/git/trees/master`))
                .tree.filter(x => !x.path.endsWith('.md'))
                .map(x => [x.path, new Language(this, x)])
        );
        return this;
    }
    public get languageProxy() {
        return new Proxy(<{ [key: string]: Language | undefined }>{}, {
            get: (_, k) =>
                this.languages[String(k)] || this.languages[
                    Object
                        .keys(this.languages)
                        .find(x => String(k).toLowerCase() === x.toLowerCase())!
                ],
        });
    }
    public async fetchAll() {
        return this.all
            || (this.all = (await Promise
                .all(Object
                    .values(this.languages)
                    .map(x => x!.fetchRawImages()))
            ).flat()
            );
    }
    public fetchAllNames() {
        return this.fetchAll().then(d => d.map(x => x.path));
    }
    public async fetchAllURLs() {
        return this.urls
            || (this.urls = (await Promise
                .all(Object
                    .values(this.languages)
                    .map(x => x!.fetchImages()))
            ).flat()
            );
    }
    public search(str: string) {
        return Promise
            .all(
                Object
                    .values(this.languages)
                    .map(async x => findBestMatch(str, await x!.fetchImages()).ratings)
            )
            .then(d =>
                d
                    .flat()
                    .sort((a, b) => b.rating - a.rating)
                    .map(x => x.target)
            );
    }
}