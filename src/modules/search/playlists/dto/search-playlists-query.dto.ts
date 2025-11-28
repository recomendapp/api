import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSearchQueryDto } from 'src/modules/search/common/dto/search-query.dto';

export class SearchPlaylistsQueryDto extends BaseSearchQueryDto {
  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'created_at',
    default: 'created_at',
    enum: ['created_at', 'updated_at', 'title'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['created_at', 'updated_at', 'title'])
  sort_by?: string = 'created_at';
}
