import { Database as PostgresSchema } from './__generated__/type.db';
import {
  FeedType,
  JSONContent,
  MediaMovie,
  MediaPerson,
  MediaTvSeries,
  PlaylistLike,
  Profile,
  UserActivityMovie,
  UserActivityTvSeries,
  UserActivityType,
  UserFollower,
  UserFriend,
  UserRecosMovie,
  UserRecosTvSeries,
  UserRecosType,
  UserReview,
  UserReviewMovieLike,
  UserReviewTvSeriesLike,
  UserWatchlistType,
} from './type.db';

type PostgresTables = PostgresSchema['public']['Tables'];
type PostgresViews = PostgresSchema['public']['Views'];
type PostgresFunctions = PostgresSchema['public']['Functions'];

// THIS IS THE ONLY THING YOU EDIT
// <START>
type TableExtensions = {
  /**
  my_existing_table_name: {
    my_json_column_override: {
      tel: string;
      name?: string;
      preset_id?: number;
    };
  };
  **/
  user_reviews_movie: {
    body: JSONContent;
  };
  user_reviews_tv_series: {
    body: JSONContent;
  };
};

type ViewExtensions = {
  /**
  my_existing_view_name: {
	my_json_column_override: {
	  tel: string;
	  name?: string;
	  preset_id?: number;
	};
  };
  **/
  profile: {
    id: string;
    username: string;
    full_name: string;
    followers_count: number;
    following_count: number;
    premium: boolean;
    private: boolean;
    visible: boolean;
    created_at: string;
  };

  /* ------------------------------- ACTIVITIES ------------------------------- */
  user_activities: {
    id: number;
    type: UserActivityType;
    media: MediaMovie | MediaTvSeries;
    user?: Profile;
    review?: UserReview | null;
  };
  /* -------------------------------------------------------------------------- */
  /* ------------------------------- WATCHLISTS ------------------------------- */
  user_watchlists: {
    id: number;
    type: UserWatchlistType;
    media: MediaMovie | MediaTvSeries;
  };
  /* -------------------------------------------------------------------------- */
  /* ---------------------------------- RECOS --------------------------------- */
  user_recos_aggregated: {
    type: UserRecosType;
    media: MediaMovie | MediaTvSeries;
    senders: {
      user: Profile;
      comment?: string | null;
      created_at: string;
    }[];
  };
  user_recos_movie_aggregated: {
    senders: {
      user: Profile;
      comment?: string | null;
      created_at: string;
    }[];
  };
  user_recos_tv_series_aggregated: {
    senders: {
      user: Profile;
      comment?: string | null;
      created_at: string;
    }[];
  };
  /* -------------------------------------------------------------------------- */
  /* ---------------------------------- MEDIA --------------------------------- */
  media_movie: {
    id: number;
    directors?: MediaPerson[];
    genres?: {
      id: number;
      name: string;
    }[];
  };
  media_movie_aggregate_credits: {
    movie: MediaMovie;
    credits: {
      job: string;
      credit_id: string;
      department: string;
    }[];
  };
  media_tv_series: {
    id: number;
    created_by?: MediaPerson[];
    genres?: {
      id: number;
      name: string;
    }[];
  };
  media_tv_series_aggregate_credits: {
    tv_series: MediaTvSeries;
    credits: {
      credit_id: string;
      department: string;
      job: string;
      character: string | null;
      episode_count: number;
      season_id: number;
      season_number: number;
    }[];
  };
  media_person: {
    id: number;
  };
  media_genre: {
    id: number;
    name: string;
  };
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- WIDGETS -------------------------------- */
  widget_most_recommended:
    | {
        type: 'movie';
        media: MediaMovie;
      }
    | {
        type: 'tv_series';
        media: MediaTvSeries;
      };
  /* -------------------------------------------------------------------------- */
};

type FunctionExtensions = {
  get_feed: {
    activity_type: FeedType;
    author: Profile;
  } & (
    | {
        activity_type: 'activity_movie';
        content: UserActivityMovie;
      }
    | {
        activity_type: 'activity_tv_series';
        content: UserActivityTvSeries;
      }
    | {
        activity_type: 'playlist_like';
        content: PlaylistLike;
      }
    | {
        activity_type: 'review_movie_like';
        content: UserReviewMovieLike;
      }
    | {
        activity_type: 'review_tv_series_like';
        content: UserReviewTvSeriesLike;
      }
  );
  get_feed_cast_crew: {
    person: MediaPerson;
  } & (
    | {
        media_type: 'movie';
        media: MediaMovie;
      }
    | {
        media_type: 'tv_series';
        media: MediaTvSeries;
      }
  );
  get_notifications:
    | {
        type: 'reco_sent_movie';
        content: UserRecosMovie;
      }
    | {
        type: 'reco_sent_tv_series';
        content: UserRecosTvSeries;
      }
    | {
        type: 'reco_completed_movie';
        content: UserRecosMovie;
      }
    | {
        type: 'reco_completed_tv_series';
        content: UserRecosTvSeries;
      }
    | {
        type: 'follower_request';
        content: UserFollower;
      }
    | {
        type: 'follower_accepted';
        content: UserFollower;
      }
    | {
        type: 'follower_created';
        content: UserFollower;
      }
    | {
        type: 'friend_created';
        content: UserFriend;
      };
  get_widget_most_recommended:
    | {
        type: 'movie';
        media: MediaMovie;
      }
    | {
        type: 'tv_series';
        media: MediaTvSeries;
      };
  get_widget_most_popular:
    | {
        type: 'movie';
        media: MediaMovie;
      }
    | {
        type: 'tv_series';
        media: MediaTvSeries;
      };
  get_ui_backgrounds:
    | {
        media_type: 'movie';
        media: MediaMovie;
      }
    | {
        media_type: 'tv_series';
        media: MediaTvSeries;
      };
  // Explore
  get_explore_in_view: {
    movie: MediaMovie;
  };
};
// <END>
// ☝️ this is the only thing you edit

type TakeDefinitionFromSecond<T extends object, P extends object> = Omit<
  T,
  keyof P
> &
  P;

type NewTables = {
  [k in keyof PostgresTables]: {
    Row: k extends keyof TableExtensions
      ? TakeDefinitionFromSecond<PostgresTables[k]['Row'], TableExtensions[k]>
      : PostgresTables[k]['Row'];
    Insert: k extends keyof TableExtensions
      ? TakeDefinitionFromSecond<
          PostgresTables[k]['Insert'],
          TableExtensions[k]
        >
      : PostgresTables[k]['Insert'];
    Update: k extends keyof TableExtensions
      ? Partial<
          TakeDefinitionFromSecond<
            PostgresTables[k]['Update'],
            TableExtensions[k]
          >
        >
      : PostgresTables[k]['Update'];
    Relationships: PostgresTables[k]['Relationships'];
  };
};

type NewViews = {
  [k in keyof PostgresViews]: {
    Row: k extends keyof ViewExtensions
      ? TakeDefinitionFromSecond<PostgresViews[k]['Row'], ViewExtensions[k]>
      : PostgresViews[k]['Row'];
    Relationships: PostgresViews[k]['Relationships'];
  };
};

type NewFunctions = {
  [K in keyof PostgresFunctions]: {
    Args: PostgresFunctions[K]['Args'];
    Returns: K extends keyof FunctionExtensions
      ? PostgresFunctions[K]['Returns'] extends (infer Row)[]
        ? Row extends object
          ? TakeDefinitionFromSecond<Row, FunctionExtensions[K]>[]
          : PostgresFunctions[K]['Returns']
        : PostgresFunctions[K]['Returns']
      : PostgresFunctions[K]['Returns'];
  };
};

export type Database = {
  public: Omit<PostgresSchema['public'], 'Tables' | 'Views' | 'Functions'> & {
    Tables: NewTables;
    Views: NewViews;
    Functions: NewFunctions;
  };
};

export type TableName = keyof Database['public']['Tables'];
export type TableRow<T extends TableName> =
  Database['public']['Tables'][T]['Row'];

export type ViewName = keyof Database['public']['Views'];
export type ViewRow<View extends ViewName> =
  Database['public']['Views'][View]['Row'];
