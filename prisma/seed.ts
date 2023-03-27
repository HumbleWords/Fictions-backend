import { PrismaClient, Prisma, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_USER_DATA: Prisma.UserCreateInput = {
  username: 'Admin',
  email: 'admin@example.mail',
  password: 'admin123',
  birthdate: '2003-03-31',
  role: Role.ADMIN,
};

const main = async () => {
  const users_deleted = await prisma.user.deleteMany();
  console.log({ users_deleted });

  const adminUser = await prisma.user.upsert({
    where: { email: ADMIN_USER_DATA.email },
    update: {},
    create: {
      username: ADMIN_USER_DATA.username,
      email: ADMIN_USER_DATA.email,
      password: await hash(ADMIN_USER_DATA.password, 10),
      birthdate: ADMIN_USER_DATA.birthdate,
      role: ADMIN_USER_DATA.role,
    },
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
