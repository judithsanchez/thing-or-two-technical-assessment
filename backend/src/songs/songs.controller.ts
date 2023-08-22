import { Controller, Get, Post, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from '../entities/song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Post('add')
  async createSongs(@Body() songData: Song[]): Promise<Song[]> {
    return this.songsService.createSongs(songData);
  }
}
