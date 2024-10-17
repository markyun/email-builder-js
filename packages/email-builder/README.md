# digitalc/email-builder

<!-- 用这个编译 -->
npm run build
<!-- 先不用这个 -->
npm run builds
<!--
  npm version patch 更新一个补丁
	npm version minor更新一个小改动
	npm version major更新一个大改动

  -->
<!-- 发布 npm publish --access public -->

```js

  // 如果是 isPreview 路由，只渲染页面。
  if (isPreview) {
    return (
      <Box sx={mainBoxSx} data-cee="preview">
        {/* 渲染 EmailBuilder.js 的 json 配置成 html */}
        <Reader document={document} rootBlockId="root" />
      </Box>
    );
  }

```