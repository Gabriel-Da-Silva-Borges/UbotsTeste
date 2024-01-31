// src/movies/movie.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rating } from '../rating/rating.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];

  get rated(): boolean {
    return this.ratings && this.ratings.length > 0;
  }

  get averageRating(): number {
    if (this.ratings) {
      const sum = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
      return sum / this.ratings.length;
    }
    return 0;
  }
}
