<div align="center"><p><a href="https://nodei.co/npm/aghpb-api/"><img src="https://nodei.co/npm/aghpb-api.png?downloads=true&stars=true"></a></p><p><a href="https://www.npmjs.com/package/aghpb-api"><img src="https://img.shields.io/npm/v/aghpb-api.svg?maxAge=3600" alt="Version"></a><a href="https://www.npmjs.com/package/aghpb-api"><img src="https://img.shields.io/npm/dt/aghpb-api.svg?maxAge=3600" alt="Downloads"></a></p></div>

## Installation
`npm i aghpb-api`

## About
aghpb-api is a module to easily interact with [laynH/Anime-Girls-Holding-Programming-Books](https://github.com/laynH/Anime-Girls-Holding-Programming-Books/) (aghpb for short) using the [GitHub REST API v3](https://developer.github.com/v3/). Due to [strict non-authorized GitHub ratelimits](https://developer.github.com/v3/#rate-limiting), some form of authorization is recommended ([OAuth](https://developer.github.com/v3/oauth_authorizations/) / [other](https://developer.github.com/v3/auth/)).

## Examples
[Test](https://github.com/1s3k3b/aghpb-api/tree/master/test/index.ts)

## Basic Documentation
[Typings](https://github.com/1s3k3b/aghpb-api/tree/master/typings)

#### `createClient(authorization?: string): Promise<Client>`
Shortener for `new Client(authorization).init()`
<br>
#### `Client`
The class used to make requests and store API data.

`constructor(authorization?: string)`
`authorization`: an optional string used to authorize HTTP requests

`init(): Promise<Client>`
Fetches all directories of the repository, and populates `.languages`

`fetchAll(): Promise<TreeItem[]>`
Fetches the contents of all directories in the repository

`fetchAllNames(): Promise<string[]>`
Fetches all image names in the repository

`fetchAllURLs(): Promise<string[]>`
Fetches all image URLs in the repository

`search(str: string): Promise<string[]>`
Sorts all image URLs by similarity to the passed string

`.languages: Record<string, Language>`
An object with the repository's directory names as keys, and `Language` instances as values. (empty before `init` is called)

`.languageProxy: Record<string, Language>`
A proxy for accessing case-insensitive properties on `.languages`
<br>
#### `Language`
The class for managing a directory. (should not be manually constructed, instances are available through `Client.prototype.languages`)

`fetchRawImages(): Promise<TreeItem[]>`
Fetches the raw contents of the directory

`fetchImageNames(): Promise<string[]>`
Fetches the image names of the directory

`fetchImages(): Promise<string[]>`
Fetches the image URLs of the directory

`search(str: string): Promise<string[]>`
Sorts the directory's image URLs by similarity to the passed string 
<br>
#### `TreeItem`
[Raw file data returned from the GitHub API.](https://developer.github.com/v3/git/trees/)

`.path: string`
The filename

`.mode: string`
The file mode

`.type: string`
Either `blob`, `tree`, or `commit`

`.sha: string`
The SHA1 checksum ID of the object in the tree

`.url: string`
The API URL
