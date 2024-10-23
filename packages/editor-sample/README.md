# htmlBuilder

Use this as a sample to self-host HtmlBuilder

To run this locally, fork the repository and then in this directory run:

- `npm install`
- `npx vite`

Once the server is running, open http://localhost:5173/email-builder-js/ in your browser.

## development

    "build:development": "NODE_ENV=development vite build",
## production

    "build": "vite build",

ps: 注意下面的依赖包，需要发布到npm 才能使用，放在这只是方便调试和修改。

```
@digitalc/block-columns-container
CEE @digitalc/document compatible ColumnsContainer component

@digitalc/block-divider
CEE @digitalc/document compatible Divider component

@digitalc/email-builder
CEE DIY React component to render email messages
```


## 预览模式：

preview/#code/+base64编码的json
