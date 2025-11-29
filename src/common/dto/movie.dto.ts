import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  IsArray,
  IsDateString,
} from 'class-validator';
import { GenreDto } from './genre.dto';
import { PersonDto } from './person.dto';

@Exclude()
export class MovieDto {
  @ApiProperty({ description: "The movie's unique identifier" })
  @Expose()
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The title of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  title?: string | null;

  @ApiPropertyOptional({ description: 'Poster path of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  poster_path?: string | null;

  @ApiPropertyOptional({ description: 'Poster URL of the movie' })
  @Expose()
  @IsOptional()
  @IsUrl()
  poster_url?: string | null;

  @ApiProperty({ description: 'Backdrop path of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  backdrop_path?: string | null;

  @ApiPropertyOptional({ description: 'Backdrop URL of the movie' })
  @Expose()
  @IsOptional()
  @IsUrl()
  backdrop_url?: string | null;

  @ApiProperty({
    type: () => PersonDto,
    isArray: true,
    description: 'Directors of the movie',
  })
  @Expose()
  @IsOptional()
  @IsArray()
  @Type(() => PersonDto)
  directors?: PersonDto[];

  @ApiProperty({
    type: () => GenreDto,
    isArray: true,
    description: 'Genres of the movie',
  })
  @Expose()
  @IsOptional()
  @IsArray()
  @Type(() => GenreDto)
  genres?: GenreDto[];

  @ApiProperty({ description: 'Release date of the movie' })
  @Expose()
  @IsOptional()
  @IsDateString()
  release_date?: string | null;

  @ApiProperty({ description: 'Overview of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  overview?: string | null;

  @ApiProperty({ description: 'Budget of the movie in USD' })
  @Expose()
  @IsOptional()
  @IsInt()
  budget?: number | null;

  @ApiProperty({ description: 'Homepage URL of the movie' })
  @Expose()
  @IsOptional()
  @IsUrl()
  homepage?: string | null;

  @ApiProperty({ description: 'Revenue of the movie in USD' })
  @Expose()
  @IsOptional()
  @IsInt()
  revenue?: number | null;

  @ApiProperty({ description: 'Runtime of the movie in minutes' })
  @Expose()
  @IsOptional()
  @IsInt()
  runtime?: number | null;

  @ApiProperty({ description: 'Original language of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  original_language?: string | null;

  @ApiProperty({ description: 'Original title of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  original_title?: string | null;

  @ApiProperty({ description: 'Status of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({ description: 'Popularity score of the movie' })
  @Expose()
  @IsNumber()
  popularity: number;

  @ApiProperty({ description: 'Vote average of the movie' })
  @Expose()
  @IsNumber()
  vote_average: number;

  @ApiProperty({ description: 'Vote count of the movie' })
  @Expose()
  @IsInt()
  vote_count: number;

  @ApiPropertyOptional({ description: 'Slug of the movie' })
  @Expose()
  @IsOptional()
  @IsString()
  slug?: string | null;

  @ApiPropertyOptional({ description: 'URL to the movie page' })
  @Expose()
  @IsOptional()
  @IsUrl()
  url?: string | null;

  @ApiPropertyOptional({
    description: 'Followers average rating of the movie',
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  follower_avg_rating?: number | null;
}
