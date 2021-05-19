import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USERNAME,
} from './constants.config';

export class ConfigConsumer {
  static setConfigModule(): DynamicModule {
    return ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    });
  }

  static getTypeOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: config.get<any>(DB_TYPE),
      host: config.get<string>(DB_HOST),
      port: Number(config.get<string>(DB_PORT)),
      username: config.get<string>(DB_USERNAME),
      password: config.get<string>(DB_PASSWORD),
      database: config.get<string>(DB_NAME),
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
