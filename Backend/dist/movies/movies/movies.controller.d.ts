import { Movie } from './movie/movie.entity';
import { MoviesService } from './movies.service';
import { Rating } from './rating/rating.entity';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<Movie[]>;
    findAllWithRatingStatus(): Promise<(Movie & {
        rated: boolean;
        averageRating: number;
    })[]>;
    findUnratedMovies(): Promise<Movie[]>;
    create(movie: Movie): Promise<Movie>;
    update(id: number, movie: Movie): Promise<Movie>;
    remove(id: number): Promise<void>;
    rate(id: number, value: number): Promise<Rating>;
}
