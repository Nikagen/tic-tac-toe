"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_service_1 = __importDefault(require("./../services/tokens.service"));
function default_1(request, response, next) {
    if (request.method === 'OPTIONS') {
        next();
    }
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return response
            .status(401)
            .json('Authorization header not found.');
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
        return response
            .status(401)
            .json('Access token not found.');
    }
    try {
        request.body.payload = tokens_service_1.default.verifyAccess(accessToken);
    }
    catch (error) {
        return response
            .status(401)
            .json('Token has not been verified.');
    }
    next();
}
exports.default = default_1;
