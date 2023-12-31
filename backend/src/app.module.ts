import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { Song } from './entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ThingOrTwo',
      entities: [Song],
      synchronize: true,
    }),

    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
