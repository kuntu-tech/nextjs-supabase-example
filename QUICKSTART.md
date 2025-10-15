# 🚀 快速开始指南

## 1. 安装依赖

```bash
npm install
```

## 2. 配置环境变量

复制 `env.example` 为 `.env.local`：

```bash
cp env.example .env.local
```

然后编辑 `.env.local` 文件，填入你的 Supabase Anon Key：

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_anon_key
```

> 你可以在 Supabase 控制台的 Settings > API 中找到这个 key

## 3. 设置数据库

运行以下命令来设置数据库：

```bash
npm run setup
```

这个命令会：
- 生成 Prisma 客户端
- 使用 Prisma 自动创建数据库表结构
- 初始化数据库

**重要**：Prisma 会自动根据 `prisma/schema.prisma` 文件创建所有需要的表，无需手动在 Supabase 控制台创建！

## 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用！

## 5. 部署到 Render

### 方法一：使用 GitHub + Render

1. 将代码推送到 GitHub
2. 在 Render 创建新的 Web Service
3. 连接你的 GitHub 仓库
4. Render 会自动检测 `render.yaml` 文件
5. 设置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://ucaoayvazjnlteikwkqs.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的 anon key
   - `DATABASE_URL`: `postgresql://postgres:GQofJuUPTL9tiqmKZfqk@db.ucaoayvazjnlteikwkqs.supabase.co:5432/postgres`
6. 点击 Deploy

### 方法二：直接部署

你也可以直接在 Render 控制台创建服务，使用以下配置：

- **Build Command**: `npm install && npm run db:generate && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.x

## 🎯 项目功能

- ✅ 用户认证（Google、GitHub 等）
- ✅ 文章管理系统
- ✅ 数据库操作（Prisma + Supabase）
- ✅ 响应式设计
- ✅ TypeScript 支持

## 📊 数据库表

项目会自动创建以下表：

- `users` - 用户表
- `posts` - 文章表

## 🔧 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run db:push      # 推送 schema 到数据库
npm run db:generate  # 生成 Prisma 客户端
npm run db:studio    # 打开 Prisma Studio
npm run setup        # 一键设置项目
```

## 🆘 需要帮助？

如果遇到问题，请检查：

1. 环境变量是否正确设置
2. Supabase 项目是否正常运行
3. 数据库连接是否正常
4. Node.js 版本是否为 18.x

祝你使用愉快！🎉
