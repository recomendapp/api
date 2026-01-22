import { Module } from '@nestjs/common';
import { UsersSearchController } from './users-search.controller';
import { UsersSearchService } from './users-search.service';
import { SupabaseModule } from '@app/api/common/supabase/supabase.module';
import { TypesenseModule } from '@app/api/common/typesense/typesense.module';

@Module({
  imports: [SupabaseModule, TypesenseModule],
  controllers: [UsersSearchController],
  providers: [UsersSearchService],
})
export class UsersSearchModule {}
