import { PrismaClient, Prisma, Role } from '@prisma/client';

const prisma = new PrismaClient();

const ADMIN_USER_DATA: Prisma.UserCreateInput = {
  username: 'Admin',
  email: 'admin@example.mail',
  password: 'admin123',
  birthdate: '2003-03-31',
  role: Role.ADMIN,
};

const main = async () => {
  const adminUser = await prisma.user.upsert({
    where: { email: ADMIN_USER_DATA.email },
    update: {},
    create: ADMIN_USER_DATA,
  });
  console.log({ adminUser });
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
