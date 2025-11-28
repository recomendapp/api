import { ApiProperty } from '@nestjs/swagger';

class ProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  avatar_url?: string;

  // Ajoutez d'autres champs selon votre schéma profile
}

export class PlaylistDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  owner_id: string;

  @ApiProperty()
  private: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty({ type: ProfileDto })
  user: ProfileDto;

  // Ajoutez d'autres champs selon votre table playlists
}

class PaginationDto {
  @ApiProperty()
  total_results: number;

  @ApiProperty()
  total_pages: number;

  @ApiProperty()
  current_page: number;

  @ApiProperty()
  per_page: number;
}

export class SearchPlaylistsResponseDto {
  @ApiProperty({ type: [PlaylistDto] })
  data: PlaylistDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
