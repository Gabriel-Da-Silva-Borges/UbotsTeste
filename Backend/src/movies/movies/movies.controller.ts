// src/movies/movies.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Movie } from './movie/movie.entity';
import { MoviesService } from './movies.service';
import { Rating } from './rating/rating.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('with-rating-status')
  findAllWithRatingStatus(): Promise<(Movie & { rated: boolean; averageRating: number })[]> {
    return this.moviesService.findAllWithRatingStatus();
  }

  @Get('unrated')
  findUnratedMovies(): Promise<Movie[]> {
    return this.moviesService.findUnratedMovies();
  }

  @Post()
  create(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.moviesService.remove(id);
  }

  @Post(':id/rate')
  rate(@Param('id') id: number, @Body('value') value: number): Promise<Rating> {
    return this.moviesService.rate(id, value);
  }
}
