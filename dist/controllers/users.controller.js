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
exports.updateUserById = exports.deleteUserById = exports.getUserInfoByIdOrEmail = void 0;
const users_service_1 = require("../services/users.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserInfoByIdOrEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idOrEmail = req.params.idOrEmail;
    const isId = !isNaN(parseInt(idOrEmail));
    if (isId) {
        const userInfos = yield (0, users_service_1.getUserInfosById)(parseInt(idOrEmail));
        if (!userInfos) {
            return res.status(404).json({ msg: 'Not found' });
        }
        return res.status(200).json({
            id: userInfos.id,
            email: userInfos.email,
            password: userInfos.password,
            created_at: userInfos.created_at,
            firstname: userInfos.firstname,
            name: userInfos.name,
        });
    }
    else {
        const userInfos = yield (0, users_service_1.getUserInfosByEmail)(idOrEmail);
        if (!userInfos) {
            return res.status(404).json({ msg: 'Not found' });
        }
        return res.status(200).json({
            id: userInfos.id,
            email: userInfos.email,
            password: userInfos.password,
            created_at: userInfos.created_at,
            firstname: userInfos.firstname,
            name: userInfos.name,
        });
    }
});
exports.getUserInfoByIdOrEmail = getUserInfoByIdOrEmail;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const userInfos = yield (0, users_service_1.getUserInfosById)(userId);
    if (!userInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }
    if (!(yield (0, users_service_1.deleteUserById)(userId))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(200).json({ msg: `Successfully deleted record number : ${userId}` });
});
exports.deleteUserById = deleteUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const userInfos = yield (0, users_service_1.getUserInfosById)(userId);
    if (!userInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }
    const { email, name, firstname, password } = req.body;
    if (!email || !name || !firstname || !password) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    if (!(yield (0, users_service_1.updateUserById)(userId, email, name, firstname, hashedPassword))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    const userInfosUpdated = yield (0, users_service_1.getUserInfosById)(userId);
    return res.status(200).json({
        id: userInfosUpdated === null || userInfosUpdated === void 0 ? void 0 : userInfosUpdated.id,
        email: userInfosUpdated === null || userInfosUpdated === void 0 ? void 0 : userInfosUpdated.email,
        password: userInfosUpdated === null || userInfosUpdated === void 0 ? void 0 : userInfosUpdated.password,
        created_at: userInfosUpdated === null || userInfosUpdated === void 0 ? void 0 : userInfosUpdated.created_at,
        firstname: userInfosUpdated === null || userInfosUpdated === void 0 ? void 0 : userInfosUpdated.firstname,
        name: userInfosUpdated === null || userInfosUpdated === void 0 ? void 0 : userInfosUpdated.name,
    });
});
exports.updateUserById = updateUserById;
