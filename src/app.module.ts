import { CacheInterceptor, CacheModule, Module, Scope } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StatusMonitorModule } from 'nest-status-monitor';
import { HealthController } from './components/health/health.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './components/auth/auth.module';
import { MediaUploadModule } from './file-management/media-upload/media-upload.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './components/users/users.module';
import { GoogleStrategy } from './components/auth/google.strategy';


// import { FcmModule } from 'nestjs-fcm';

const portNumber = parseInt(process.env.PORT) || 3000;
const statusMonitorConfig = {
  pageTitle: 'Nest.js Status Monitor', // Default title
  path: '/status',
  port: 3000,
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  healthChecks: [
    {
      protocol: 'http',
      host: 'localhost',
      path: '/health/alive',
      port: portNumber,
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/health/dead',
      port: portNumber,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  ignoreStartsWith: '/health/alive',
};

@Module({
  imports: [
  ConfigModule.forRoot({
      envFilePath: 'src/config/development.env',
      isGlobal: true,
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true }),
    CacheModule.register(),
    AuthModule.forRoot(),
    UsersModule
    // MediaUploadModule,

  ],
  controllers: [HealthController, AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
      scope: Scope.TRANSIENT,
    },
    GoogleStrategy
  ],
})
export class AppModule {}
