import {
  pgTable,
  text,
  boolean,
  bigint,
  check,
  pgEnum,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { user } from './auth';

// Profile
export const profile = pgTable(
  'profile',
  {
    id: text('id')
      .primaryKey()
      .references(() => user.id, { onDelete: 'cascade' }),
    bio: text('bio'),
    backgroundImage: text('background_image'),
    language: text('language').default('fr-FR').notNull(),
    // States
    isPremium: boolean('is_premium').default(false).notNull(),
    isPrivate: boolean('is_private').default(false).notNull(),
    // Counts
    followersCount: bigint('followers_count', { mode: 'number' })
      .default(0)
      .notNull(),
    followingCount: bigint('following_count', { mode: 'number' })
      .default(0)
      .notNull(),
  },
  (table) => [
    check('check_profile_followers_count', sql`${table.followersCount} >= 0`),
    check('check_profile_following_count', sql`${table.followingCount} >= 0`),
    check(
      'check_profile_bio',
      sql`bio ~* '^(?!\s+$)(?!.*\n\s*\n)[\s\S]{1,150}$'::text`,
    ),
  ],
);
export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.id],
    references: [user.id],
  }),
}));

// Follow
export const followStatusEnum = pgEnum('follow_status_enum', ['pending', 'accepted']);
export const follow = pgTable('follow', {
  followerId: text('follower_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  followingId: text('following_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  status: followStatusEnum('status').default('accepted').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.followerId, table.followingId] }),
  check('check_follow_not_self', sql`${table.followerId} <> ${table.followingId}`)
]);
export const followRelations = relations(follow, ({ one }) => ({
  follower: one(user, {
    fields: [follow.followerId],
    references: [user.id],
  }),
  following: one(user, {
    fields: [follow.followingId],
    references: [user.id],
  }),
}));

// Subscription
export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid().defaultRandom().notNull(),
    userId: uuid('user_id').notNull(),
    productId: text('product_id').notNull(),
    store: text().notNull(),
    status: text().notNull(),
    purchasedAt: timestamp('purchased_at', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'string' }),
    originalTransactionId: text('original_transaction_id').notNull(),
    transactionId: text('transaction_id'),
    environment: text().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('idx_subscriptions_original_transaction_id').using(
      'btree',
      table.originalTransactionId.asc().nullsLast().op('text_ops'),
    ),
    index('subscriptions_product_id_idx').using(
      'btree',
      table.productId.asc().nullsLast().op('text_ops'),
    ),
    index('subscriptions_status_idx').using(
      'btree',
      table.status.asc().nullsLast().op('text_ops'),
    ),
    index('subscriptions_user_id_idx').using(
      'btree',
      table.userId.asc().nullsLast().op('uuid_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'subscriptions_user_id_fkey',
    }).onDelete('cascade'),
    pgPolicy('User can see his own sub', {
      as: 'permissive',
      for: 'select',
      to: ['authenticated'],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ],
);

