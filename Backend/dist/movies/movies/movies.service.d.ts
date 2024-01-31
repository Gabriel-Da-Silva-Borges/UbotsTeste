import { Repository } from 'typeorm';
import { Movie } from './movie/movie.entity';
import { Rating } from './rating/rating.entity';
export declare class MoviesService {
    private moviesRepository;
    private ratingsRepository;
    constructor(moviesRepository: Repository<Movie>, ratingsRepository: Repository<Rating>);
    findAll(): Promise<Movie[]>;
    findAllWithRatingStatus(): Promise<(Movie & {
        rated: boolean;
        averageRating: number;
    })[]>;
    findUnratedMovies(): Promise<Movie[]>;
    create(movie: Movie): Promise<Movie>;
    update(id: any, movie: Movie): Promise<Movie>;
    remove(id: number): Promise<void>;
    rate(id: any, value: number): Promise<Rating>;
}
