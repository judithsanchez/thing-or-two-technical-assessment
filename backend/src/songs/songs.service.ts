import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../entities/song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async createSongs(songData: Song[]): Promise<Song[]> {
    for (let s = 0; s < songData.length; s++) {
      const song = songData[s];
      if ((await this.songRepository.findOneBy(song)) === null) {
        const newSong = this.songRepository.create(song);
        this.songRepository.save(newSong);
      }
    }

    return this.songRepository.find();
  }
}
