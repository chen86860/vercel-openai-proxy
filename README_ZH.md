# Vercel Region OpenAI Proxy

使用 Vercel Edge Functions 代理请求 OpenAI 服务，以解决 OpenAI 在某些地区（例如香港和中国大陆）无法访问的问题。

你也可以参考这个示例，通过指定区域来请求其他代理服务，不仅限于 OpenAI。

## 部署

注册一个 Vercel 账号，然后点击下面的按钮，将这个项目部署到 Vercel。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchen86860%2Fvercel-openai-proxy&project-name=vercel-openai-proxy)

## 使用方法

部署完成后，你将得到一个类似 `https://your-project-name-xxxx.vercel.app` 的 URL，那么代理请求 URL 应该是 `https://your-project-name-xxxx.vercel.app/opeai/`，你可以使用这个 URL 来代理请求 OpenAI 服务。

### 示例

使用 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 请求:

```js
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

使用 [openai](https://www.npmjs.com/package/openai) 库请求:

```js
const openai = new OpenAI({
  apiKey: 'OPENAI_KEY_HERE',
  // 设置 baseURL 即可
  baseURL: 'https://your-project-name-xxxx.vercel.app/opeai/',
});
```

## 配置

默认情况已排除了不支持的区域，如果需要添加，可以在 `src/app/openai/[...path]/route.ts` 中添加或修改。

## License

[MIT](./LICENSE)
