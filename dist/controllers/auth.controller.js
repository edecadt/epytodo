"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../services/auth.service");
const users_service_1 = require("../services/users.service");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, firstname, password } = req.body;
    if (!email || !name || !firstname || !password)
        return res.status(400).json({ msg: 'Bad parameter' });
    try {
        if (yield (0, auth_service_1.checkIfUserExist)(email))
            return res.status(400).json({ msg: 'Account already exists' });
    }
    catch (error) {
        console.log("caca");
        return res.status(500).json({ msg: 'Internal server error' });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    try {
        const userId = yield (0, auth_service_1.createUser)(email, name, firstname, hashedPassword);
        if (userId != null) {
            const secret = process.env.SECRET || 'secret';
            const token = jsonwebtoken_1.default.sign({
                email: email,
                id: userId,
                name: name,
                firstname: firstname,
            }, secret, { expiresIn: '24h' });
            return res.status(201).json({ token: token });
        }
        else {
            console.log("caca1");
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    catch (error) {
        console.log("caca2");
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ msg: 'Bad parameter' });
    try {
        if (!(yield (0, auth_service_1.checkIfUserExist)(email)))
            return res.status(400).json({ msg: 'Not found' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    try {
        if (yield (0, auth_service_1.checkUserPassword)(email, password)) {
            const secret = process.env.SECRET || 'secret';
            const userInfos = yield (0, users_service_1.getUserInfosByEmail)(email);
            const token = jsonwebtoken_1.default.sign({
                email: email,
                id: userInfos === null || userInfos === void 0 ? void 0 : userInfos.id,
                name: userInfos === null || userInfos === void 0 ? void 0 : userInfos.name,
                firstname: userInfos === null || userInfos === void 0 ? void 0 : userInfos.firstname,
            }, secret, { expiresIn: '24h' });
            return res.status(200).json({ token: token });
        }
        return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
