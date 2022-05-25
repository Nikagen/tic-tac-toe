"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./../routes/index"));
const logs_middleware_1 = __importDefault(require("./../middlewares/logs.middleware"));
const app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT;
const SECRET_COOKIE = process.env.SECRET_COOKIE;
console.log(PORT);
// cors
app.use((request, response, next) => {
    response.set('Access-Control-Allow-Origin', `http://localhost:3000`);
    response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.set('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    response.set('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(SECRET_COOKIE));
// morgan
app.use(logs_middleware_1.default);
app.use('/api', index_1.default);
app.listen(PORT, () => console.log(`[server] ruunning on port ${PORT}`));
