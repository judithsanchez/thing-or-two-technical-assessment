//  thing-or-two-techincal-assessment/backend/src/songs/songs.controller.ts
import { FileInterceptor } from '@nestjs/platform-express';

import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from '../entities/song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('Received file:', file);
    const result = await this.songsService.uploadCsv(file);
    return result;
  }
}
