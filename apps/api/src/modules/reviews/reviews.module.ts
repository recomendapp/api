import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { SupabaseModule } from '@app/api/common/supabase/supabase.module';
import { MovieReviewsController } from './movie-reviews.controller';
import { TvSeriesReviewsController } from './tv-series-reviews.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [MovieReviewsController, TvSeriesReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
