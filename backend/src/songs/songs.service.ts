//  thing-or-two-techincal-assessment/backend/src/songs/songs.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../entities/song.entity';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async createSong(songData: Song): Promise<Song> {
    const newSong = this.songRepository.create(songData);
    return this.songRepository.save(newSong);
  }

  async uploadCsv(file: Express.Multer.File): Promise<string> {
    console.log('Received file:', file);

    return new Promise((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          await this.songRepository.save(results);
          resolve('CSV file uploaded and data added to the database.');
        })
        .on('error', (error) => {
          reject(error.message);
        });
    });
  }
}
