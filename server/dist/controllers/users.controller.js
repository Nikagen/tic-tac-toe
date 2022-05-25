"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const redis_1 = require("./../config/redis");
const users_service_1 = __importDefault(require("./../services/users.service"));
const tokens_service_1 = __importDefault(require("./../services/tokens.service"));
class UserController {
    async signup(request, response) {
        const { login, password } = request.body;
        if (!login || !password) {
            return response
                .status(400)
                .json('Login or password was not received.');
        }
        const id = (0, md5_1.default)(login);
        if (await users_service_1.default.userExists(id)) {
            return response
                .status(400)
                .json('Login already taken.');
        }
        const user = {
            login: login,
            password: users_service_1.default.getHashPassword(password),
            refreshToken: tokens_service_1.default.generateRefresh({ id: id })
        };
        await users_service_1.default.createUser(id, user);
        response.cookie('refreshToken', user.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: false,
            secure: true
        });
        return response
            .status(200)
            .json({
            'accessToken': tokens_service_1.default.generateAccess({ id: id })
        });
    }
    async signin(request, response) {
        const { login, password } = request.body;
        if (!login || !password) {
            return response
                .status(404)
                .json('Login or password was not founded.');
        }
        const id = (0, md5_1.default)(login);
        if (await redis_1.client.exists(id) !== 1) {
            return response
                .status(404)
                .json('User not found!');
        }
        if (!await users_service_1.default.validateUser(id, login, password)) {
            return response
                .status(400)
                .json('Login or password entered incorrectly.');
        }
        return response
            .status(200)
            .json({
            'accessToken': tokens_service_1.default.generateAccess({ id: id })
        });
    }
    async getUser(request, response) {
        const { payload } = request.body;
        return response
            .status(200)
            .json(await users_service_1.default.getUser(payload.id));
    }
}
exports.default = new UserController();
