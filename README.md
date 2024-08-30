# Vercel Region OpenAI Proxy

Use Vercel Edge Functions to proxy requests to OpenAI services, addressing accessibility issues in regions where OpenAI is unavailable (e.g., Hong Kong, Mainland China).

You can also refer to this example to request other proxy services by specifying the region, not limited to OpenAI.

## Deployment

Register a Vercel account, then click the button below to deploy this project to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchen86860%2Fvercel-openai-proxy&project-name=vercel-openai-proxy)

## Usage

After deployment, you will receive a URL like `https://your-project-name-xxxx.vercel.app`. The proxy request URL should be `https://your-project-name-xxxx.vercel.app/openai/`, and you can use this URL to proxy requests to OpenAI services.

### Example

Using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make a request:

```js
// request openai api, just replace https://api.openai.com to https://your-project-name-xxxx.vercel.app/openai/
const response = await fetch('https://your-project-name-xxxx.vercel.app/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer OPENAI_KEY_HERE',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello, world!' }],
  }),
});
```

Using the [openai](https://www.npmjs.com/package/openai) library to make a request:

```js
const openai = new OpenAI({
  apiKey: 'OPENAI_KEY_HERE',
  // Just set the baseURL
  baseURL: 'https://your-project-name-xxxx.vercel.app/openai/',
});
```

## Configuration

By default, unsupported regions have been excluded. If you need to add or modify regions, you can do so in `src/app/openai/[...path]/route.ts`.

## License

[MIT](./LICENSE)
