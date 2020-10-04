import { Client } from '../src';
import { config } from 'dotenv';

config();

(async () => {
    // authorize requests to make ratelimits less strict
    const client = new Client('Bearer ' + process.env.GITHUB_TOKEN);

    // debugging
    client.requestHandler
        .on('request', u => console.log(`Making request to ${u}`))
        .on('lock', (u, n) => console.log(`Locked at ${u} for ${n / 1000 / 60}m`))
        .on('unlock', u => console.log(`Unlocked at ${u}`));

    // fetch all directories of the repository
    await client.init();

    // fetch all directories' contents in the repository
    await client.fetchAll();

    console.log('Ada image names:', await client.languages.Ada!.fetchImageNames());
    console.log('JavaScript images via proxy:', await client.languageProxy.javascript!.fetchImages());
    console.log('All image names:', await client.fetchAllNames());
    console.log('All images:', await client.fetchAllURLs());
    console.log('"umaru doma" search', (await client.search('umaru doma')).slice(0, 10));
})();