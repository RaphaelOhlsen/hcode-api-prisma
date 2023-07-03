import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    AuthModule,
    MailerModule.forRoot({
      // transport: 'smtps://raphael@mocad.dev:gqt123252@smtpout.secureserver.net',
      transport: {
        host: 'smtpout.secureserver.net',
        port: 465,
        auth: {
          user: 'raphael@mocad.dev',
          pass: 'gqt123252',
        },
      },
      defaults: {
        from: '"MOCAD" <raphael@mocad.dev>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
