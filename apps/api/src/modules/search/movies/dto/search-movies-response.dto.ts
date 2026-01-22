import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@app/api/common/dto/pagination.dto';
import { Movie } from '@app/api/common/dto/movie.dto';
import { Type } from 'class-transformer';

export class SearchMoviesResponse extends PaginatedResponseDto<Movie> {
  @ApiProperty({ type: [Movie] })
  @Type(() => Movie)
  declare data: Movie[];

  constructor(partial: Partial<SearchMoviesResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
