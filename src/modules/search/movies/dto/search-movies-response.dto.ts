import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/dto/pagination.dto';
import { MovieDto } from 'src/common/dto/movie.dto';
import { Type } from 'class-transformer';

export class SearchMoviesResponseDto extends PaginatedResponseDto<MovieDto> {
  @ApiProperty({ type: [MovieDto] })
  @Type(() => MovieDto)
  declare data: MovieDto[];

  constructor(partial: Partial<SearchMoviesResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
