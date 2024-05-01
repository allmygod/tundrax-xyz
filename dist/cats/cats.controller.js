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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const parse_int_pipe_1 = require("../common/pipes/parse-int.pipe");
const cats_service_1 = require("./cats.service");
const cat_dto_1 = require("./dto/cat.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    async create(createCatDto) {
        return this.catsService.create(createCatDto);
    }
    async findAll() {
        return this.catsService.findAll();
    }
    async findOne(id) {
        return this.catsService.findOne(id);
    }
    async update(id, updateCatDto) {
        return this.catsService.update(id, updateCatDto);
    }
    async delete(id) {
        await this.catsService.delete(id);
    }
};
exports.CatsController = CatsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ description: 'Create a cat profile' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cat_dto_1.CatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: 'Get all cat profiles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: 'Get cat profile' }),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: 'Update cat profile' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cat_dto_1.CatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ description: 'Delete cat profile' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "delete", null);
exports.CatsController = CatsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Cat'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('cats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
//# sourceMappingURL=cats.controller.js.map