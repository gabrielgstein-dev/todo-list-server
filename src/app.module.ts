import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './database/entities';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  controllers: [AppController, UserController, ProjectController],
  providers: [AppService, UserService, ProjectService],
})
export class AppModule {}
