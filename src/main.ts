import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FastFood - CKS')
    .setDescription(
      "All API's documentation are described here. For more information, contact the owner of the project.",
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger-ui', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
