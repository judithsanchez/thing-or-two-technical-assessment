import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  song_name: string;

  @Column()
  band: string;

  @Column()
  year: number;
}
