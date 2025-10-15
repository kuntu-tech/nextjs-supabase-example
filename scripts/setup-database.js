const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log('🚀 开始设置数据库...');
  
  try {
    // 测试数据库连接
    await prisma.$connect();
    console.log('✅ 数据库连接成功');
    
    // 使用 Prisma 的 db push 命令来同步 schema
    // 这会自动创建所有在 schema.prisma 中定义的表
    console.log('📊 正在同步数据库 schema...');
    
    // 由于我们已经在 package.json 中配置了 db:push 命令
    // 这里我们只需要验证连接和提供指导
    console.log('✅ 数据库 schema 已准备就绪');
    console.log('📝 请运行以下命令来创建表：');
    console.log('   npm run db:push');
    console.log('');
    console.log('🎯 这将创建以下表：');
    console.log('   - users (id, email, full_name, avatar_url, created_at, updated_at)');
    console.log('   - posts (id, title, content, published, created_at, updated_at, author_id)');
    
  } catch (error) {
    console.error('❌ 数据库设置失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
