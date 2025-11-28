import type { Database } from './type.db.extended';
import { Json as JsonGenerated } from './__generated__/type.db';

/* ---------------------------------- USER ---------------------------------- */
export type Profile = Database['public']['Views']['profile']['Row'] & {};
export type User = Database['public']['Tables']['user']['Row'] & {
  subscriptions?: UserSubscriptions[];
};
export type UserFriend = Database['public']['Tables']['user_friend']['Row'] & {
  friend: Profile;
  user: Profile;
};
export type UserFollower =
  Database['public']['Tables']['user_follower']['Row'] & {
    followee: Profile;
    user: Profile;
  };
/* -------------------------------------------------------------------------- */

/* ---------------------------------- MEDIA --------------------------------- */
export type MediaType = Database['public']['Enums']['media_type'];

export type MediaMovie = Database['public']['Views']['media_movie']['Row'] & {
  videos?: Database['public']['Tables']['tmdb_movie_videos']['Row'][];
  production_countries?: Database['public']['Tables']['tmdb_movie_production_countries']['Row'][];
  spoken_languages?: Database['public']['Tables']['tmdb_movie_spoken_languages']['Row'][];
  cast?: MediaMoviePerson[];
};
export type MediaMoviePerson =
  Database['public']['Tables']['tmdb_movie_credits']['Row'] & {
    person?: MediaPerson;
    role?: Database['public']['Tables']['tmdb_movie_roles']['Row'];
  };
export type MediaMovieAggregateCredits =
  Database['public']['Views']['media_movie_aggregate_credits']['Row'] & {};
export type MediaMoviePoster =
  Database['public']['Views']['media_movie_posters']['Row'] & {
    movie?: MediaMovie;
  };
export type MediaMovieBackdrop =
  Database['public']['Views']['media_movie_backdrops']['Row'] & {
    movie?: MediaMovie;
  };
export type MediaTvSeries =
  Database['public']['Views']['media_tv_series']['Row'] & {
    videos?: Database['public']['Tables']['tmdb_tv_series_videos']['Row'][];
    production_countries?: Database['public']['Tables']['tmdb_tv_series_production_countries']['Row'][];
    spoken_languages?: Database['public']['Tables']['tmdb_tv_series_spoken_languages']['Row'][];
    cast?: MediaTvSeriesPerson[];
    seasons?: MediaTvSeriesSeason[];
    specials?: MediaTvSeriesSeason[];
  };
export type MediaTvSeriesPerson =
  Database['public']['Tables']['tmdb_tv_series_credits']['Row'] & {
    person?: MediaPerson;
  };
export type MediaTvSeriesPoster =
  Database['public']['Views']['media_tv_series_posters']['Row'] & {
    tv_series?: MediaTvSeries;
  };
export type MediaTvSeriesBackdrop =
  Database['public']['Views']['media_tv_series_backdrops']['Row'] & {
    tv_series?: MediaTvSeries;
  };
export type MediaTvSeriesSeason =
  Database['public']['Views']['media_tv_series_seasons']['Row'] & {
    episodes?: MediaTvSeriesEpisode[];
    serie?: MediaTvSeries;
  };
export type MediaTvSeriesEpisode =
  Database['public']['Views']['media_tv_series_episodes']['Row'] & {};
export type MediaTvSeriesAggregateCredits =
  Database['public']['Views']['media_tv_series_aggregate_credits']['Row'] & {};
export type MediaPerson =
  Database['public']['Views']['media_person']['Row'] & {};
/* -------------------------------------------------------------------------- */

/* -------------------------------- ACTIVITY -------------------------------- */
export type UserActivityType =
  Database['public']['Enums']['user_activity_type'];
export type UserActivityMovie =
  Database['public']['Tables']['user_activities_movie']['Row'] & {
    user?: Profile;
    review?: UserReviewMovie | null;
    movie?: MediaMovie;
  };
export type UserActivityTvSeries =
  Database['public']['Tables']['user_activities_tv_series']['Row'] & {
    user?: Profile;
    review?: UserReviewTvSeries | null;
    tv_series?: MediaTvSeries;
  };
export type UserActivity =
  Database['public']['Views']['user_activities']['Row'] & {};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- RECOS --------------------------------- */
export type UserRecosType = Database['public']['Enums']['user_recos_type'];
export type UserRecosMovieAggregated =
  Database['public']['Views']['user_recos_movie_aggregated']['Row'] & {
    movie?: MediaMovie;
  };
export type UserRecosMovie =
  Database['public']['Tables']['user_recos_movie']['Row'] & {
    movie?: MediaMovie;
    sender?: Profile;
    receiver?: Profile;
  };
export type UserRecosTvSeriesAggregated =
  Database['public']['Views']['user_recos_tv_series_aggregated']['Row'] & {
    tv_series?: MediaTvSeries;
  };
export type UserRecosTvSeries =
  Database['public']['Tables']['user_recos_tv_series']['Row'] & {
    tv_series?: MediaTvSeries;
    sender?: Profile;
    receiver?: Profile;
  };
export type UserRecosAggregated =
  Database['public']['Views']['user_recos_aggregated']['Row'] & {};
/* -------------------------------------------------------------------------- */

/* -------------------------------- WATCHLIST ------------------------------- */
export type UserWatchlistType =
  Database['public']['Enums']['user_watchlist_type'];
export type UserWatchlistMovie =
  Database['public']['Tables']['user_watchlists_movie']['Row'] & {
    movie?: MediaMovie;
  };
export type UserWatchlistTvSeries =
  Database['public']['Tables']['user_watchlists_tv_series']['Row'] & {
    tv_series?: MediaTvSeries;
  };
export type UserWatchlist =
  Database['public']['Views']['user_watchlists']['Row'] & {};
/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEW --------------------------------- */
export type UserReviewType = Database['public']['Enums']['user_review_type'];
export type UserReviewMovie =
  Database['public']['Tables']['user_reviews_movie']['Row'] & {
    activity?: UserActivityMovie;
  };
export type UserReviewMovieLike =
  Database['public']['Tables']['user_review_movie_likes']['Row'] & {
    review?: UserReviewMovie;
  };
export type UserReviewTvSeries =
  Database['public']['Tables']['user_reviews_tv_series']['Row'] & {
    activity?: UserActivityTvSeries;
  };
export type UserReviewTvSeriesLike =
  Database['public']['Tables']['user_review_tv_series_likes']['Row'] & {
    review?: UserReviewTvSeries;
  };
export type UserReview = UserReviewMovie | UserReviewTvSeries;
/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLIST -------------------------------- */
export type Playlist = Database['public']['Tables']['playlists']['Row'] & {
  user?: Profile;
  guests?: PlaylistGuest[];
  items?: PlaylistItemMovie[] | PlaylistItemTvSeries[];
};
export type PlaylistItemMovie =
  Database['public']['Tables']['playlist_items_movie']['Row'] & {
    movie?: MediaMovie;
    playlist?: Playlist;
    user?: Profile;
  };
export type PlaylistItemTvSeries =
  Database['public']['Tables']['playlist_items_tv_series']['Row'] & {
    tv_series?: MediaTvSeries;
    playlist?: Playlist;
    user?: Profile;
  };
export type PlaylistGuest =
  Database['public']['Tables']['playlist_guests']['Row'] & {
    user?: Profile;
    playlist?: Playlist;
  };
export type PlaylistLike =
  Database['public']['Tables']['playlists_likes']['Row'] & {
    playlist?: Playlist;
    user?: Profile;
  };
export type PlaylistSource = 'personal' | 'saved';
export type PlaylistType = Database['public']['Enums']['playlists_type'];
/* -------------------------------------------------------------------------- */

/* ---------------------------------- FEED ---------------------------------- */
export type FeedType = Database['public']['Enums']['feed_type'];
export type UserFeed =
  Database['public']['Functions']['get_feed']['Returns'] & {};
export type UserFeedItem = UserFeed[number];
export type UserFeedCastCrew =
  Database['public']['Views']['user_feed_cast_crew']['Row'] & {
    movie?: MediaMovie;
    person?: MediaPerson;
  };
/* -------------------------------------------------------------------------- */

/* ------------------------------ SUBSCRIPTIONS ----------------------------- */
export type UserSubscriptions =
  Database['public']['Tables']['subscriptions']['Row'] & {};
/* -------------------------------------------------------------------------- */

/* ------------------------------ NOTIFICATIONS ----------------------------- */
export type NotificationType = Database['public']['Enums']['notification_type'];
export const NotificationTypeEnum = {
  follower_created: 'follower_created',
  follower_accepted: 'follower_accepted',
  follower_request: 'follower_request',
  reco_sent: 'reco_sent',
  reco_sent_movie: 'reco_sent_movie',
  reco_sent_tv_series: 'reco_sent_tv_series',
  reco_completed: 'reco_completed',
  reco_completed_movie: 'reco_completed_movie',
  reco_completed_tv_series: 'reco_completed_tv_series',
  friend_created: 'friend_created',
} as const;
/* -------------------------------------------------------------------------- */

/* --------------------------------- OTHERS --------------------------------- */
export type Json = JsonGenerated;

export type JSONContent = {
  [key: string]: any;
  type?: string;
  attrs?: Record<string, any>;
  content?: JSONContent[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text?: string;
};

export type EventType = Database['public']['Enums']['eventType'];

export type ViewType = 'grid' | 'list';
/* -------------------------------------------------------------------------- */
