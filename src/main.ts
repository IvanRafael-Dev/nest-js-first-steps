import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpResponseInterceptor } from './interceptors/http-response/http-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      transform: true, // transforma os tipos dos campos, no caso de id string para number por exemplo
      forbidNonWhitelisted: true, // retorna erro se tiver campos não permitidos
    }),
  );

  app.useGlobalInterceptors(new HttpResponseInterceptor());

  await app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}
bootstrap();
