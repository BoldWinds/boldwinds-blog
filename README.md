# boldwinds-blog

Bowen Liu（刘博文）的个人技术网站仓库，用于承载个人主页、技术博客、项目展示与论文展示内容。

## 站点内容

- 首页：个人简介与精选内容入口
- 博客：技术文章与工程实践记录
- 项目：训练、推理与系统工程相关项目展示
- Publications：论文、预印本或技术报告列表
- About：固定个人介绍页面

## 技术栈

- Astro 6
- Tailwind CSS 4
- TypeScript 风格的 Astro 组件与内容集合
- Biome（格式化 / lint）
- npm

## 工具链版本

- Node.js: 22.x
- npm: 使用仓库当前 `package-lock.json`

## 目录说明

- `src/`：页面、组件、布局
- `content/configuration.toml`：站点全局配置与首页 hero 内容
- `content/blogs/`：博客文章内容
- `content/projects/`：项目内容
- `content/publications/`：论文/出版物内容
- `public/`：静态资源

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

本地预览生产构建：

```bash
npm run preview
```

## 代码质量

格式化：

```bash
npm run format
```

Lint：

```bash
npm run lint
```

## 部署

当前部署目标为 Vercel。

建议配置：

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: `22.x`

## 说明

这个仓库最初基于 Zaggonaut Astro 主题进行定制，但当前 README 说明的是本仓库本身，而不是上游主题模板。
