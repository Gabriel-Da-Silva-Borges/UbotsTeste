"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./movie/movie.entity");
const rating_entity_1 = require("./rating/rating.entity");
let MoviesService = class MoviesService {
    constructor(moviesRepository, ratingsRepository) {
        this.moviesRepository = moviesRepository;
        this.ratingsRepository = ratingsRepository;
    }
    async findAll() {
        return this.moviesRepository.find();
    }
    async findAllWithRatingStatus() {
        const movies = await this.moviesRepository.find({ relations: ['ratings'] });
        return movies.map((movie) => ({
            ...movie,
            rated: movie.rated,
            averageRating: movie.averageRating,
        }));
    }
    async findUnratedMovies() {
        const movies = await this.moviesRepository
            .createQueryBuilder('movie')
            .leftJoinAndSelect('movie.ratings', 'rating')
            .where('rating.movieId IS NULL')
            .getMany();
        return movies;
    }
    async create(movie) {
        return this.moviesRepository.save(movie);
    }
    async update(id, movie) {
        await this.moviesRepository.update(id, movie);
        return this.moviesRepository.findOne(id);
    }
    async remove(id) {
        await this.moviesRepository.delete(id);
    }
    async rate(id, value) {
        const movie = await this.moviesRepository.findOne({ where: { id } });
        if (!movie) {
            throw new Error('Movie not found');
        }
        const rating = new rating_entity_1.Rating();
        rating.value = value;
        rating.movie = movie;
        return this.ratingsRepository.save(rating);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map