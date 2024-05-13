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
exports.updateUserById = exports.deleteUserById = exports.getUserInfosByEmail = exports.getUserInfosById = void 0;
const db_1 = __importDefault(require("../configs/db"));
const getUserInfosById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute('SELECT * FROM user WHERE id = ?', [userId]);
        if (Array.isArray(rows)) {
            if (rows.length === 1) {
                return rows[0];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getUserInfosById = getUserInfosById;
const getUserInfosByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute('SELECT * FROM user WHERE email = ?', [email]);
        if (Array.isArray(rows)) {
            if (rows.length === 1) {
                return rows[0];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getUserInfosByEmail = getUserInfosByEmail;
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute('DELETE FROM user WHERE id = ?', [userId]);
        return result.affectedRows === 1;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserById = deleteUserById;
const updateUserById = (userId, email, name, firstname, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute('UPDATE user SET email = ?, name = ?, firstname = ?, password = ? WHERE id = ?', [email, name, firstname, password, userId]);
        return result.affectedRows === 1;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserById = updateUserById;
