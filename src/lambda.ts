import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { configure as serverlessExpress } from '@codegenie/serverless-express';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for API Gateway
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('FastFood - CKS')
      .setDescription(
        "All API's documentation are described here. For more information, contact the owner of the project.",
      )
      .setVersion('1.0')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const server = await bootstrap();
  return server(event, context);
};