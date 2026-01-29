import { sql } from 'drizzle-orm';
import {
  bigint,
  check,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { tmdbMovie, tmdbTvSeries } from './tmdb';
import { user } from './auth';

export const bookmarkStatusEnum = pgEnum('bookmark_status', [
  'active',
  'completed',
]);

/* -------------------------------------------------------------------------- */
/*                                    MOVIE                                   */
/* -------------------------------------------------------------------------- */

export const bookmarkMovie = pgTable(
  'bookmark_tv_series',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    movieId: bigint('movie_id', { mode: 'number' })
      .notNull()
      .references(() => tmdbMovie.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .$onUpdate(() => sql`now()`)
      .notNull(),
    status: bookmarkStatusEnum().default('active').notNull(),
    comment: text(),
  },
  (table) => [
    index('idx_bookmark_tv_series_movie_id').on(table.movieId),
    index('idx_bookmark_tv_series_user_id').on(table.userId),
    index('idx_bookmark_tv_series_status').on(table.status),
    uniqueIndex('unique_active_bookmark_tv_series')
      .on(table.movieId, table.userId, table.status)
      .where(sql`${table.status} = 'active'::bookmark_status`),
    check('check_user_bookmark_tv_series_comment', sql`length(comment) <= 180`),
  ],
);

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  TV SERIES                                 */
/* -------------------------------------------------------------------------- */

export const bookmarkTvSeries = pgTable(
  'bookmark_tv_series',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    tvSeriesId: bigint('tv_series_id', { mode: 'number' })
      .notNull()
      .references(() => tmdbTvSeries.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .$onUpdate(() => sql`now()`)
      .notNull(),
    status: bookmarkStatusEnum().default('active').notNull(),
    comment: text(),
  },
  (table) => [
    index('idx_bookmark_tv_series_tv_series_id').on(table.tvSeriesId),
    index('idx_bookmark_tv_series_user_id').on(table.userId),
    index('idx_bookmark_tv_series_status').on(table.status),
    uniqueIndex('unique_active_bookmark_tv_series')
      .on(table.tvSeriesId, table.userId)
      .where(sql`${table.status} = 'active'::bookmark_status`),
    check('check_user_bookmark_tv_series_comment', sql`length(comment) <= 180`),
  ],
);

/* -------------------------------------------------------------------------- */
