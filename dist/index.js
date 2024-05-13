"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./configs/db");
const notFound_1 = require("./middleware/notFound");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const auth_1 = require("./middleware/auth");
const user_route_1 = __importDefault(require("./routes/user.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const todos_route_1 = __importDefault(require("./routes/todos.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/', auth_route_1.default); // Auth routes
app.use((req, res, next) => {
    if (req.path.startsWith('/register') || req.path.startsWith('/login')) {
        next();
    }
    else {
        (0, auth_1.authenticateUserSession)(req, res, next).then(() => { });
    }
});
app.use('/user', user_route_1.default); // User routes
app.use('/users', users_route_1.default); // Users routes
app.use('/todos', todos_route_1.default); // Todos routes
app.use(notFound_1.notFound);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
