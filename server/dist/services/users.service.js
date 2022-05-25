"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redis_1 = require("./../config/redis");
class UsersService {
    async createUser(id, user) {
        let userAsArray = this.getUserAsArray(user);
        await redis_1.client.hSet(id, userAsArray);
        await redis_1.client.rPush("users", id);
    }
    async userExists(id) {
        return await redis_1.client.exists(id) === 1;
    }
    async getUser(id) {
        return await redis_1.client.hGetAll(id);
    }
    async getUsers() {
        const numberUsers = await redis_1.client.lLen('users');
        let users = [];
        for (let i = 0; i < numberUsers; i++) {
            const id = await redis_1.client.lIndex('users', i);
            if (!id) {
                throw new Error(`User ${id} not found.`);
            }
            users.push(await redis_1.client.hGetAll(id));
        }
        return users;
    }
    async validateUser(id, login, password) {
        const user = await redis_1.client.hGetAll(id);
        const validLogin = login === user.login;
        const validPassword = this.validatePassword(password, user.password);
        return validLogin && validPassword;
    }
    getHashPassword(password) {
        return bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
    }
    validatePassword(password, hash) {
        return bcryptjs_1.default.compareSync(password, hash);
    }
    getUserAsArray(user) {
        let userAsArray = [];
        Object.entries(user).forEach(([key, value]) => userAsArray.push(key, value));
        return userAsArray;
    }
}
exports.default = new UsersService();
