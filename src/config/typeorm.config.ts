import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from 'src/entities';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  url: configService.get<string>('DATABASE_URL'),
  database: configService.get<string>('DATABASE_NAME'),
  useUnifiedTopology: true,
  entities: [...entities],
  synchronize: true,
});
