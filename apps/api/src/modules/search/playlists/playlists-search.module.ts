import { Module } from '@nestjs/common';
import { PlaylistsSearchController } from './playlists-search.controller';
import { PlaylistsSearchService } from './playlists-search.service';
import { SupabaseModule } from '@app/api/common/supabase/supabase.module';
import { TypesenseModule } from '@app/api/common/typesense/typesense.module';

@Module({
  imports: [SupabaseModule, TypesenseModule],
  controllers: [PlaylistsSearchController],
  providers: [PlaylistsSearchService],
})
export class PlaylistsSearchModule {}
