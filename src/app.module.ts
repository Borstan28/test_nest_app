import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './services/dataaggregation.service';
import { DatabaseService } from './services/database.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { setupSwagger } from '../app.swagger';
import { AppInterceptor } from './interceptors/logging.interceptor';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'samplehost',
      port: 5432,
      username: 'stanislav',
      password: 'qwerty12345',
      database: 'sample_database',
      entities: [],
      synchronize: true,
    } as TypeOrmModuleOptions),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, AppInterceptor],
})
export class AppModule {}
