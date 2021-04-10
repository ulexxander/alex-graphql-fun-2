BEGIN;

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  date_created timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
  post_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  date_created timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
  comment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(user_id) ON DELETE SET NULL,
  content text NOT NULL,
  date_created timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE subscribtions (
  subscriber_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  blogger_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (subscriber_id, blogger_id)
);

CREATE TABLE revoked_tokens (
  token TEXT PRIMARY KEY,
  date_created timestamptz NOT NULL DEFAULT NOW()
);

COMMIT;
