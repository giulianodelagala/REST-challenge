import { prismaMock } from '../../../singleton';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getOneAccount,
  getUserAccount,
  updateAccount,
} from '../accounts.services';

describe('Account Services', () => {
  test('should get one account info', async () => {
    const query = await getAccounts();
    const account = query[0];

    await expect(getOneAccount(account.id)).resolves.toEqual({
      id: account.id,
      username: account.username,
      role: account.role,
      emailVerifiedAt: account.emailVerifiedAt,
    });
  });

  test('should get one account user info', async () => {
    const query = await getAccounts();
    const account = query[0];

    await expect(getUserAccount(account.id)).resolves.toEqual({
      username: account.username,
      name: expect.any(String),
      isNamePublic: expect.any(Boolean),
      isEmailPublic: expect.any(Boolean),
      role: account.role,
      createdAt: expect.any(Date),
    });
  });

  test('should create, update account info and delete', async () => {
    const user = {
      username: 'New User7',
      password: '1234',
      email: 'user+7@gmail.com',
    };
    const newName = { name: 'New Name' };

    const newUser = await createAccount(user);

    expect(newUser).toEqual({
      id: expect.any(Number),
      username: user.username,
      email: user.email,
      name: null,
      isNamePublic: expect.any(Boolean),
      isEmailPublic: expect.any(Boolean),
      role: 'USER',
      createdAt: expect.any(Date),
      verifyCode: expect.any(String),
      updatedAt: expect.any(Date),
      password: expect.any(String),
      emailVerifiedAt: null,
    });

    await expect(updateAccount(newUser.id, newName)).resolves.toEqual({
      id: expect.any(Number),
      username: newUser.username,
      email: newUser.email,
      name: 'New Name',
      isNamePublic: expect.any(Boolean),
      isEmailPublic: expect.any(Boolean),
      role: 'USER',
      createdAt: expect.any(Date),
      verifyCode: expect.any(String),
      updatedAt: expect.any(Date),
      password: expect.any(String),
      emailVerifiedAt: null,
    });

    await expect(deleteAccount(newUser.id)).resolves.toEqual({
      id: expect.any(Number),
      username: newUser.username,
      email: newUser.email,
      name: 'New Name',
      isNamePublic: expect.any(Boolean),
      isEmailPublic: expect.any(Boolean),
      role: 'USER',
      createdAt: expect.any(Date),
      verifyCode: expect.any(String),
      updatedAt: expect.any(Date),
      password: expect.any(String),
      emailVerifiedAt: null,
    });
  });
});
