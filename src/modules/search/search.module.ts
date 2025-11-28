import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/common/supabase/supabase.module';
import { TypesenseModule } from 'src/common/typesense/typesense.module';

// Playlists
import { PlaylistsSearchController } from './playlists/playlists-search.controller';
import { PlaylistsSearchService } from './playlists/playlists-search.service';

@Module({
  imports: [SupabaseModule, TypesenseModule],
  controllers: [PlaylistsSearchController],
  providers: [PlaylistsSearchService],
})
export class SearchModule {}
