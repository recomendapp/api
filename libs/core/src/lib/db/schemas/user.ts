import {
  pgTable,
  text,
  boolean,
  bigint,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user as authUser } from './auth';

export const profile = pgTable(
  'profile',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .references(() => authUser.id, { onDelete: 'cascade' }),
    bio: text('bio'),
    backgroundImage: text('background_image'),
    favoriteColor: text('favorite_color').default('#03befc'),
    language: text('language').default('fr-FR').notNull(),
    premium: boolean('premium').default(false).notNull(),
    private: boolean('private').default(false).notNull(),
    followersCount: bigint('followers_count', { mode: 'number' })
      .default(0)
      .notNull(),
    followingCount: bigint('following_count', { mode: 'number' })
      .default(0)
      .notNull(),
  },
  (table) => [
    index('idx_profile_private').on(table.private),
    check('profile_followers_count_check', sql`${table.followersCount} >= 0`),
    check('profile_following_count_check', sql`${table.followingCount} >= 0`),
    check(
      'profile_bio_check',
      sql`bio ~* '^(?!\s+$)(?!.*\n\s*\n)[\s\S]{1,150}$'::text`,
    ),
  ],
);
