import bcrypt from 'bcryptjs'
import { User } from './../models/user';
import { client } from './../config/redis';

class UsersService {
  public async createUser(id: string, user: User) {
    let userAsArray = this.getUserAsArray(user);
    await client.hSet(id, userAsArray);
    await client.rPush("users", id);
  }

  public async userExists(id: string) {
    return await client.exists(id) === 1;
  }

  public async getUser(id: string) {
    return await client.hGetAll(id) as User;
  }

  public async getUsers() {
    const numberUsers = await client.lLen('users')
    let users: User[] = []; 

    for (let i = 0; i < numberUsers; i++) {
      const id = await client.lIndex('users', i);
      if (!id) {
        throw new Error(`User ${id} not found.`);
      }
      users.push(await client.hGetAll(id) as User);
    }
    return users;
  }

  public async validateUser(id: string, login: string, password: string) {
    const user = <User>await client.hGetAll(id);
    const validLogin = login === user.login;
    const validPassword = this.validatePassword(password, user.password);
    return validLogin && validPassword;
  }

  public getHashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  public validatePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  public getUserAsArray(user: User) {
    let userAsArray: string[] = [];
    Object.entries(user).forEach(([key, value]) => userAsArray.push(key, value));
    return userAsArray;
  }
}

export default new UsersService();