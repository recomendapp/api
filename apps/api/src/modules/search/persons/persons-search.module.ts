import { Module } from '@nestjs/common';
import { PersonsSearchController } from './persons-search.controller';
import { PersonsSearchService } from './persons-search.service';
import { SupabaseModule } from '@app/api/common/supabase/supabase.module';
import { TypesenseModule } from '@app/api/common/typesense/typesense.module';

@Module({
  imports: [SupabaseModule, TypesenseModule],
  controllers: [PersonsSearchController],
  providers: [PersonsSearchService],
})
export class PersonsSearchModule {}
