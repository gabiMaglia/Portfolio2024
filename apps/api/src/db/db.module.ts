import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDb } from '@portfolio/db';

export const DB = Symbol('DB');

@Global()
@Module({
  providers: [
    {
      provide: DB,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        createDb(config.getOrThrow<string>('DBURL')),
    },
  ],
  exports: [DB],
})
export class DbModule {}
