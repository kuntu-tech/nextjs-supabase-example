# Next.js + Supabase + Prisma 示例项目

这是一个集成了 Next.js、Supabase 和 Prisma 的完整示例项目，支持一键部署到 Render。

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd nextjs-supabase-example
npm install
```

### 2. 配置环境变量

复制 `env.example` 文件为 `.env.local`：

```bash
cp env.example .env.local
```

然后编辑 `.env.local` 文件，填入你的 Supabase 项目信息：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 3. 设置数据库

```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库 schema 到 Supabase
npm run db:push
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🎯 项目特性

- ✅ **Next.js 14** with App Router
- ✅ **Supabase** 认证和数据库
- ✅ **Prisma** ORM 支持
- ✅ **TypeScript** 类型安全
- ✅ **Tailwind CSS** 样式
- ✅ **一键部署到 Render**

## 🔧 技术栈

- **前端**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: Supabase PostgreSQL
- **ORM**: Prisma
- **认证**: Supabase Auth
- **部署**: Render

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── posts/         # 文章相关 API
│   ├── auth/              # 认证相关页面
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── posts-list.tsx     # 文章列表组件
│   └── ...
├── lib/                   # 工具库
│   ├── prisma.ts          # Prisma 客户端
│   └── supabase/          # Supabase 客户端
└── middleware.ts          # Next.js 中间件
```

## 🚀 部署到 Render

### 方法一：使用 render.yaml（推荐）

1. 将代码推送到 GitHub
2. 在 Render 控制台选择 "New Web Service"
3. 连接你的 GitHub 仓库
4. Render 会自动检测 `render.yaml` 文件
5. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL`
6. 点击 "Deploy"

### 方法二：手动配置

1. 在 Render 创建新的 Web Service
2. 选择 "Build and deploy from a Git repository"
3. 连接你的 GitHub 仓库
4. 配置以下设置：
   - **Build Command**: `npm install && npm run db:generate && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x
5. 添加环境变量（同上）
6. 点击 "Deploy"

## 🔐 配置 Supabase

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 获取项目 URL 和 API Key

### 2. 配置认证提供商

在 Supabase 控制台，进入 `Authentication > Providers`，配置你需要的 OAuth 提供商：

- [Google OAuth 设置指南](https://youtu.be/_XM9ziOzWk4?si=00qdQYmhBqbY1Qcn)
- [GitHub OAuth 设置指南](https://egghead.io/lessons/supabase-create-an-oauth-app-with-github)

### 3. 配置 URL

部署后，在 Supabase 控制台的 `Authentication > URL Configuration` 中设置：
- **Site URL**: `https://your-app.onrender.com`
- **Redirect URLs**: `https://your-app.onrender.com/auth/callback`

## 📚 使用说明

### 认证功能

项目包含完整的用户认证功能：

- **登录/登出**: 支持 Google、GitHub 等 OAuth 提供商
- **用户信息**: 显示用户头像、姓名、邮箱等信息
- **会话管理**: 自动处理用户会话状态

### 文章管理

项目包含一个简单的文章管理系统：

- **创建文章**: 登录用户可以创建新文章
- **查看文章**: 显示所有文章列表
- **作者信息**: 显示文章作者信息

### API 接口

- `GET /api/posts` - 获取所有文章
- `POST /api/posts` - 创建新文章（需要登录）

## 🔧 开发指南

### 添加新的数据模型

1. 在 `prisma/schema.prisma` 中定义新模型
2. 运行 `npm run db:push` 更新数据库
3. 运行 `npm run db:generate` 生成 Prisma 客户端
4. 在 API 路由中使用 Prisma 客户端

### 添加新的 API 路由

在 `src/app/api/` 目录下创建新的路由文件，例如：

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // 处理 GET 请求
}

export async function POST(request: NextRequest) {
  // 处理 POST 请求
}
```

## 🐛 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 `DATABASE_URL` 环境变量是否正确
   - 确保 Supabase 项目已创建并运行

2. **认证失败**
   - 检查 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是否正确
   - 确保在 Supabase 控制台配置了正确的重定向 URL

3. **部署失败**
   - 检查 Render 日志中的错误信息
   - 确保所有环境变量都已正确设置
   - 检查 Node.js 版本是否为 18.x

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 原始 Supabase 配置说明

### Configure Supabase Clients

In `src/lib` directory, create a `supabase` directory and add:

### Browser Client

- [`src/lib/supabase/browser-client.ts`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/lib/supabase/browser-client.ts)

This file contains the function used to call the supabase client in a nextjs client component

### Server Client

- [`src/lib/supabase/server-client.ts`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/lib/supabase/server-client.ts)

This file contains 3 functions used to call the supabase client on the server

- `createSupabaseServerClient()`: used in server actions and route handlers
- `createSupabaseServerComponentClient()`: used in server components
- `createSupabaseReqResClient()`: used in middleware

For more information check out this [video](https://youtu.be/XIj7nmIYtbo?si=KI9yhdYI8Ddcpq5s)

## Configure Middleware

Create the `middleware.ts` in your `src` directory. This intercepts any route specified in the `matcher` and is used to refresh the supabase session cookies and also redirect users based on whether they're authenticated or not.

**This can be used used for creating [protected routes](https://github.com/SamuelSackey/nextjs-supabase-example/blob/ba0d4d1b7f52a2f0435933892ea5d2b5cb7c1c0f/src/middleware.ts#L20).**

An alternative method of creating protected routes is highlighted [here](#page-based-protected-routes).

To run the middleware on every route, simply remove the [`matcher`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/ba0d4d1b7f52a2f0435933892ea5d2b5cb7c1c0f/src/middleware.ts#L28) object from the config.

- [`src/middleware.ts`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/middleware.ts)

## Configure Callback Endpoint

### Callback

In the `app` directory, create the callback endpoint `auth/callback/route.ts`.

This API endpoint uses the code returned from the OAuth provider to sign in the user. The authenticated user is then redirected to the specified URL.

If authentication fails, the user is redirected to an another page specified in the callback.

- [`src/app/auth/callback/route.ts`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/app/auth/callback/route.ts)

### Authentication Error Page

The user is redirected to this page when the authentication fails.

- [`src/app/auth/auth-error/page.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/app/auth/auth-error/page.tsx)

## Authentication Buttons

Create button components to handle login and logout. We need to interact with the button to call the authentication functions, hence we make them client components and use the supabase browser client.

### Login

You can specify the OAuth provider you're using in the `provider` property in the login function.

The login button also accepts an optional `nextUrl` prop which can be used to redirect the user to the specified URL after they have sign in.

Example:

```tsx
<LoginButton nextUrl="/account" />
```

- [`src/components/login-button.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/login-button.tsx)

### Logout

- [`src/components/logout-button.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/logout-button.tsx)

## Fetching Session and User Data in Server Components

### Fetch session in server components

```tsx
const {
  data: { session },
  error,
} = await createSupabaseServerComponentClient().auth.getSession();

// get user data from session object
const user = session?.user;
```

> [!NOTE]  
> This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. You can use `supabase.auth.getUser()` instead which authenticates the data by contacting the Supabase Auth server.

Example in [`src/components/nav-bar.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/nav-bar.tsx)

### Fetch user data directly in server components

```tsx
const {
  data: { user },
  error,
} = await createSupabaseServerComponentClient().auth.getUser();
```

Example in [`src/components/avatar.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/avatar.tsx)

## Fetching User Data in Client Components

To prevent repeating code when fetching the session in client components, create a custom hook `useSession()` which returns the user session object.

The custom hook: [`src/lib/supabase/use-session.ts`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/lib/supabase/use-session.ts)

Example of usage in [`src/components/user-information.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/user-information.tsx)

## Dynamically Rendering Client Components with User Data

When dealing with a client component that dynamically renders elements based on user data, a common issue arises during the initial load or refresh. In such scenarios, where the session data may not be immediately available in the browser, the component tends to display a false value before rendering the true value, leading to an undesirable flickering effect and poor user experience.

To address this issue, we can implement the following solution:

- Displaying a loading state until the user data is fetched. Example in [`src/components/user-information.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/user-information.tsx)

- If the client component has a server component as its parent, the session can be fetched at the parent level and passed down to the client component.

- Creating a server component wrapper specifically for the client component. The server wrapper is responsible for fetching the session data and passing it down to the client. This setup allows reusability of the component. Example of this method;
  - Server Wrapper: [`src/components/details-button-server.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/details-button-server.tsx)
  - Client Component: [`src/components/details-button-client.tsx`](https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/components/details-button-client.tsx)

For more information, check out this [video](https://egghead.io/lessons/supabase-dynamically-render-ui-based-on-user-session-with-ssr-in-next-js-client-components)

### Page-based Protected Routes

Routes can be protected by checking whether there is a supabase session. If there is no session, the user is redirected to the specified page.

```tsx
// other imports...
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    data: { user },
    error,
  } = await createSupabaseServerComponentClient().auth.getUser();

  if (!user) {
    redirect("/");
  }

  // ...
}
```

## Generating Typescript Definitions (Additional)

Login to the supabase CLI with your supabase access token

```sh
pnpm dlx supabasee login
```

Generate the types using your supabase project id:

```sh
pnpm dlx supabase gen types typescript --project-id your_supabase_project_id > src/lib/supabase/database.types.ts
```

If you're developing locally or on a self-hosted supabase instance, you can use the database URL instead of the project id:

```sh
pnpm dlx supabase gen types typescript --db-url your_supabase_database_url > src/lib/supabase/database.types.ts
```

You can then add the types to you project by including them in the `browser-client.ts` and `server-client.ts` files.

### Example

```ts
import { Database } from "@/lib/supabase/database.types";
// ...

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>();
  // ...
}
```

## Where to go from here

The project is primarily based on this [course](https://egghead.io/courses/build-a-twitter-clone-with-the-next-js-app-router-and-supabase-19bebadb), which includes topics such as querying the database, setting up row-level security, optimistic updates, and many more. Although it utilizes the auth-helpers package, it can be easily modified using the contents of this project.

I would also like to give credit to the providers of the resources used in this project.
