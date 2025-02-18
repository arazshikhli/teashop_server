import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin:[process.env.CLIENT_URL],
    credentials:true,
    exposeHeaders:'set-cookie'
  })
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
