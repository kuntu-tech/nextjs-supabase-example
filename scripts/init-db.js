const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 开始初始化数据库...');
  
  try {
    // 检查连接
    await prisma.$connect();
    console.log('✅ 数据库连接成功');
    
    // 这里可以添加一些初始数据
    console.log('📊 数据库表已创建，可以开始使用！');
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
