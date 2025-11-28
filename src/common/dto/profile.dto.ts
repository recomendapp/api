import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  Min,
  IsNotEmpty,
  IsISO8601,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class ProfileDto {
  @ApiProperty({ description: "The user's unique identifier" })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "The user's username" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: "The user's full name" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiPropertyOptional({ description: "The user's biography" })
  @IsOptional()
  @IsString()
  bio?: string | null;

  @ApiPropertyOptional({ description: "URL to the user's avatar" })
  @IsOptional()
  @IsUrl()
  avatar_url?: string | null;

  @ApiPropertyOptional({ description: "URL to the user's website" })
  @IsOptional()
  @IsUrl()
  website?: string | null;

  @ApiPropertyOptional({ description: "The user's favorite color" })
  @IsOptional()
  @IsString()
  favorite_color?: string | null;

  @ApiProperty({ description: 'The number of followers' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  followers_count: number;

  @ApiProperty({ description: 'The number of users this user is following' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  following_count: number;

  @ApiPropertyOptional({ description: "URL to the user's background image" })
  @IsOptional()
  @IsUrl()
  background_url?: string | null;

  @ApiProperty({ description: 'Indicates if the user has a premium account' })
  @IsBoolean()
  @IsNotEmpty()
  premium: boolean;

  @ApiProperty({ description: 'Indicates if the user profile is private' })
  @IsBoolean()
  @IsNotEmpty()
  private: boolean;

  @ApiProperty({ description: 'Indicates if the user profile is visible' })
  @IsBoolean()
  @IsNotEmpty()
  visible: boolean;

  @ApiProperty({ description: 'The timestamp of when the user was created' })
  @IsISO8601()
  @IsNotEmpty()
  created_at: string;
}
