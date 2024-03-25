import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from './controllers/users/users.module';
// import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    // { // por enquanto vou deixar como global em main.ts
    //   provide: APP_PIPE,
    //   useFactory: () =>
    //     new ValidationPipe({
    //       whitelist: true,
    //       transform: true,
    //     }),
    // },
  ],
})
export class AppModule {}
