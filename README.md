# 电力市场学堂

独立静态网页版：递进课程、交互算例与省级规则资料库。部署后访问者不需要 ChatGPT 或 GitHub 账户。

## 功能

- 4 阶段、12 节学习课程，配课后自测。
- 4 个算例：电量与电费、单节点出清、合同差价、日前与实时两结算。
- 10 条带官方来源及版本信息的规则资料入口，按地区、主题和关键词筛选。
- 适配电脑和手机浏览器；学习进度仅保存在本机浏览器。

## 本地运行

需要 Node.js，在仓库根目录运行：

```sh
node server.mjs
```

打开 http://localhost:4173 。无需安装依赖或配置 API 密钥。

## GitHub Pages 发布

1. 在 GitHub 创建 `power-market-learning` 仓库，使用 `main` 分支。使用免费账户发布时建议创建 Public 仓库（源代码将公开）。
2. 上传此目录全部文件，包括 `.github/workflows/pages.yml`，不要上传 ZIP 文件本身。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 在 **Actions** 中运行 **Deploy learning app to GitHub Pages**，或再次推送到 `main`。
5. 以 Actions 部署结果中的网址为准。通常为 `https://<用户名>.github.io/power-market-learning/`。

每次更新 `main` 后自动发布 `dist`。页面使用相对资源路径和 hash 路由，支持 GitHub Pages 仓库子路径。

网站公开访问，未实现独立账号登录与跨设备同步。账号、后台、资料上传和全文检索需要后续增加。

## 编辑内容

课程、题目与规则条目：`dist/data.js`。交互：`dist/app.js`。样式：`dist/style.css`。

规则库尚未覆盖全部地区，资料正文、政策解读与历史版本已分别标识；实际使用需核对最新适用文件。算例是教学简化模型，不是生产结算引擎。

## 官方部署参考

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
