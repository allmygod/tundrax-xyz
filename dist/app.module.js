"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cats_module_1 = require("./cats/cats.module");
const core_module_1 = require("./core/core.module");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const database_1 = require("./config/database");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./users/user.module");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_2.TypeOrmModule.forRoot(database_1.TYPEORM_MODULE_OPTIONS),
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            cats_module_1.CatsModule,
            user_module_1.UserModule
        ],
    }),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], AppModule);
//# sourceMappingURL=app.module.js.map