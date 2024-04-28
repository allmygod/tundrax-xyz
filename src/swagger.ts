import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from "@nestjs/swagger";

export function initSwagger(app: INestApplication): OpenAPIObject {
  const options = new DocumentBuilder()
    .setTitle("TundraxXYZ-Test API")
    .setDescription("API for TundraxXYZ-Test application")
    .setVersion("1.0")
    .addBearerAuth({
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT",
    })
    .build();
  
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document);

    return document;
}