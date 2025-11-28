import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  Min,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsISO8601,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileDto } from './profile.dto';

export type PlaylistType = 'movie' | 'tv_series';

export class PlaylistDto {
  @ApiProperty({ description: 'The unique identifier of the playlist' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'The timestamp of when the playlist was created',
  })
  @IsISO8601()
  @IsNotEmpty()
  created_at: string;

  @ApiPropertyOptional({
    description: 'The timestamp of when the playlist was last updated',
  })
  @IsISO8601()
  @IsOptional()
  updated_at: string | null;

  @ApiProperty({ description: 'The ID of the user who owns the playlist' })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ description: 'The title of the playlist' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'The description of the playlist' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ description: 'URL to the playlist poster image' })
  @IsOptional()
  @IsUrl()
  poster_url?: string | null;

  @ApiProperty({ description: 'Indicates if the playlist is private' })
  @IsBoolean()
  @IsNotEmpty()
  private: boolean;

  @ApiProperty({ description: 'The number of items in the playlist' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  items_count: number;

  @ApiProperty({
    description: 'The number of times the playlist has been saved',
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  saved_count: number;

  @ApiProperty({ description: 'The number of likes the playlist has received' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  likes_count: number;

  @ApiProperty({
    description: 'The type of the playlist',
    enum: ['movie', 'tv_series'],
  })
  @IsEnum(['movie', 'tv_series'])
  @IsNotEmpty()
  type: PlaylistType;

  @ApiProperty({ type: () => ProfileDto, description: 'The user object' })
  @ValidateNested()
  @Type(() => ProfileDto)
  user: ProfileDto;
}
