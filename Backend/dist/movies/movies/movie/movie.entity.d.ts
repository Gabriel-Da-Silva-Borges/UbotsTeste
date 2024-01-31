import { Rating } from '../rating/rating.entity';
export declare class Movie {
    id: number;
    title: string;
    description: string;
    ratings: Rating[];
    get rated(): boolean;
    get averageRating(): number;
}
