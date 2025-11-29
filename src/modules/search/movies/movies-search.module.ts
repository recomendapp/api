import { Module } from '@nestjs/common';
import { MoviesSearchController } from './movies-search.controller';
import { MoviesSearchService } from './movies-search.service';
import { SupabaseModule } from 'src/common/supabase/supabase.module';
import { TypesenseModule } from 'src/common/typesense/typesense.module';

@Module({
  imports: [SupabaseModule, TypesenseModule],
  controllers: [MoviesSearchController],
  providers: [MoviesSearchService],
})
export class MoviesSearchModule {}
