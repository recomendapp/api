import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@app/api/common/dto/pagination.dto';
import { Person } from '@app/api/common/dto/person.dto';
import { Type } from 'class-transformer';

export class SearchPersonsResponse extends PaginatedResponseDto<Person> {
  @ApiProperty({ type: [Person] })
  @Type(() => Person)
  declare data: Person[];

  constructor(partial: Partial<SearchPersonsResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
