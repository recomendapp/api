import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/dto/pagination.dto';
import { PlaylistDto } from 'src/common/dto/playlist.dto';

export class SearchPlaylistsResponseDto extends PaginatedResponseDto<PlaylistDto> {
  @ApiProperty({ type: [PlaylistDto] })
  declare data: PlaylistDto[];
}
