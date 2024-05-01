"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const validationPipeService = require('@nestts/validation-pipes');
async function bootstrap() {
    try {
        validationPipeService();
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe());
        (0, swagger_1.initSwagger)(app);
        await app.listen(3000);
        console.log(`Application is running on: ${await app.getUrl()}`);
    }
    catch (err) {
        console.log('Server failed');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map