import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    credentials: true,
  });
  await app.listen(3003);
  console.log(`Servidor corriendo... ${await app.getUrl()}`)
}
bootstrap();
