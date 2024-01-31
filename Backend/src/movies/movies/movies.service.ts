// src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie/movie.entity';
import { Rating } from './rating/rating.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findAllWithRatingStatus(): Promise<(Movie & { rated: boolean; averageRating: number })[]> {
    const movies = await this.moviesRepository.find({ relations: ['ratings'] });

    return movies.map((movie) => ({
      ...movie,
      rated: movie.rated,
      averageRating: movie.averageRating,
    }));
  }

  async findUnratedMovies(): Promise<Movie[]> {
    const movies = await this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .where('rating.movieId IS NULL')
      .getMany();

    return movies;
  }

  async create(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save(movie);
  }

  async update(id, movie: Movie): Promise<Movie> {
    await this.moviesRepository.update(id, movie);
    return this.moviesRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  async rate(id: any, value: number): Promise<Rating> {
    const movie = await this.moviesRepository.findOne({where: {id}});
  
    if (!movie) {
      throw new Error('Movie not found');
    }
  
    const rating = new Rating();
    rating.value = value;
    rating.movie = movie;
  
    return this.ratingsRepository.save(rating);
  }
  
}
