import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import { SongsModule } from './songs/songs.module'; // Import your SongsModule
import { Song } from './entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // your database host
      port: 3306, // your database port
      username: 'root', // your database username
      password: 'root', // your database password
      database: 'ThingOrTwo', // your database name
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // path to your entity classes
      entities: [Song],
      synchronize: true, // automatic schema synchronization
    }),
    SongsModule,
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class AppModule {}
