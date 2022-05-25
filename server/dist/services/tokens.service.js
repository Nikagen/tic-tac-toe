"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokensService {
    secretAccess = process.env.SECRET_JWT_ACCESS_TOKEN;
    secretRefresh = process.env.SECRET_JWT_REFRESH_TOKEN;
    generateAccess(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretAccess);
    }
    verifyAccess(token) {
        return jsonwebtoken_1.default.verify(token, this.secretAccess);
    }
    generateRefresh(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretRefresh);
    }
    verifyRefresh(token) {
        return jsonwebtoken_1.default.verify(token, this.secretRefresh);
    }
}
exports.default = new TokensService();
