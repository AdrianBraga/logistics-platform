import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        level:
          process.env.NODE_ENV?.toLowerCase() === 'production'
            ? 'info'
            : process.env.NODE_ENV?.toLowerCase() === 'development'
            ? 'debug'
            : 'warn',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                },
              }
            : undefined,
        serializers: {
          req(req) {
            return {
              id: req.id,
              method: req.method,
              url: req.url,
            };
          },
        },
      },
    }),
    DeliveriesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
