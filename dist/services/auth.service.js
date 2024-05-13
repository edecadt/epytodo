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
exports.checkUserPassword = exports.createUser = exports.checkIfUserExist = void 0;
const db_1 = __importDefault(require("../configs/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkIfUserExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute('SELECT * FROM user WHERE email = ?', [email]);
        if (Array.isArray(rows)) {
            return rows.length > 0;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.checkIfUserExist = checkIfUserExist;
const createUser = (email, name, firstname, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute('INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)', [email, name, firstname, password]);
        if (result && result.affectedRows === 1) {
            return result.insertId;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const checkUserPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute('SELECT password FROM user WHERE email = ?', [email]);
        if (Array.isArray(rows) && rows.length === 1) {
            const hashedPassword = rows[0].password;
            return yield bcryptjs_1.default.compare(password, hashedPassword);
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.checkUserPassword = checkUserPassword;
