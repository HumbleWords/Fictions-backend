import { PrismaService } from '../prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindAllUsersDto,
  PublicUserInfo,
  UserJwtSignedModel,
} from './users.dto';
import { OrderByEnum } from '../common/common.dto';
import { hash } from 'bcrypt';
import { Role } from '../common/role.enum';
import { ConflictException } from '@nestjs/common';

const TEST_USER_DATA = {
  username: 'test_user',
  email: 'testuser@test.com',
  password: 'testuser123',
  birthdate: '2001-01-01',
  role: Role.User,
};
const TEST_ADMIN_DATA = {
  username: 'test_admin',
  email: 'testadmin@test.com',
  password: 'testadmin123',
  birthdate: '2001-01-01',
  role: Role.Admin,
};
const CREATE_USER_DATA: CreateUserDto = {
  username: 'create_user',
  email: 'createuser@test.com',
  password: 'createuser123',
  birthdate: '2001-01-01',
  role: Role.User,
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let prisma: PrismaService;

  let users: PublicUserInfo[];

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.user.upsert({
      where: {
        username: TEST_USER_DATA.username,
      },
      create: {
        username: TEST_USER_DATA.username,
        email: TEST_USER_DATA.email,
        password: await hash(TEST_USER_DATA.password, 10),
        birthdate: TEST_USER_DATA.birthdate,
      },
      update: {
        username: TEST_USER_DATA.username,
        email: TEST_USER_DATA.email,
        password: await hash(TEST_USER_DATA.password, 10),
        birthdate: TEST_USER_DATA.birthdate,
      },
    });
    await prisma.user.upsert({
      where: {
        username: TEST_ADMIN_DATA.username,
      },
      create: {
        username: TEST_ADMIN_DATA.username,
        email: TEST_ADMIN_DATA.email,
        password: await hash(TEST_ADMIN_DATA.password, 10),
        birthdate: TEST_ADMIN_DATA.birthdate,
      },
      update: {
        username: TEST_ADMIN_DATA.username,
        email: TEST_ADMIN_DATA.email,
        password: await hash(TEST_ADMIN_DATA.password, 10),
        birthdate: TEST_ADMIN_DATA.birthdate,
      },
    });
    users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  });

  beforeEach(() => {
    prisma = new PrismaService();
    usersService = new UsersService(prisma);
    usersController = new UsersController(usersService);
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  describe('getAll', () => {
    it('should return an array of all users', async () => {
      const params: FindAllUsersDto = {
        skip: 0,
        take: 0,
        where: '',
        orderBy: OrderByEnum.asc,
      };

      const result: PublicUserInfo[] = [
        {
          id: 1,
          username: 'user1',
        },
        {
          id: 2,
          username: 'user2',
        },
      ];

      jest.spyOn(usersService, 'getAll').mockImplementation(async () => result);

      expect(await usersController.getAll(params)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a UserJwtSignedModel', async () => {
      const result = {
        id: 1,
        username: CREATE_USER_DATA.username,
        role: CREATE_USER_DATA.role,
      };

      jest.spyOn(usersService, 'create').mockImplementation(async () => result);

      expect(await usersController.create(CREATE_USER_DATA)).toBe(result);
    });

    it('should throw ConflictException', async () => {
      await expect(usersController.create(TEST_USER_DATA)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getById', () => {
    it('should return found user', async () => {
      const result: PublicUserInfo = {
        id: 1,
        username: 'user1',
      };
      jest
        .spyOn(usersService, 'getById')
        .mockImplementation(async () => result);

      expect(await usersController.getById(result.id)).toBe(result);
    });
    it('should not return a user', async () => {
      expect(await usersController.getById(-1)).toBeNull();
    });
  });
});
