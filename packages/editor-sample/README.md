# @usewaypoint/editor-sample

Use this as a sample to self-host EmailBuilder.js.

To run this locally, fork the repository and then in this directory run:

- `npm install`
- `npx vite`

Once the server is running, open http://localhost:5173/email-builder-js/ in your browser.




EmailBuilder
已完成：

1、支持单个组件内容修改，在主工程调整参数，能传递给子应用包生效
2、打包优化，之前的包只有一个整体，现在按 功能模块、material组件库、react分开打包。
3、移出了 usewaypoint 官方自带的链接和专有的第三方产品描述特征，
4、新增上下移动，Duplicate（复制）的快捷按钮。
5、添加 variables 变量，在发送前，由发送方替换成真实data；

待优化：

1、栅格系统，设置各自占比
2、文字支持Markdown  编辑，比如 控制部分颜色 高亮，加粗等。（@uiw/react-markdown-editor ） https://uiwjs.github.io/react-markdown-editor/
3、移动鼠标时，hover显示当前组件名称。组件名 编辑时不展示，只能在布局中点击选择，容易误操作。
5、添加 variables 变量，在发送前，替换成真实data；
6、保存 json 和html格式的数据到接口。
7、后期配合json 树状图，添加 Navigator 组件，实现大范围的drag and drop
8、自动保存配置的数据


