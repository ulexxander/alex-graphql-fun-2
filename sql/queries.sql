
-- name: SelectAllUsers :many
SELECT * FROM users;

-- name: InsertUser :one
INSERT INTO users (username, password)
VALUES ($1, $2) RETURNING *;

-- name: SelectUserByID :one
SELECT * FROM users WHERE user_id = $1;

-- name: SelectUserByUsername :one
SELECT * FROM users WHERE username = $1;

-- name: SelectAllPosts :many
SELECT * FROM posts;

-- name: InsertPost :one
INSERT INTO posts (user_id, title, body)
VALUES ($1, $2, $3) RETURNING *;

-- name: DeletePost :one
DELETE FROM posts WHERE post_id = $1
RETURNING *;

-- name: SelectAllComments :many
SELECT * FROM comments;

-- name: SelectCommentsByPost :many
SELECT * FROM comments WHERE post_id = $1;

-- name: InsertComment :one
INSERT INTO comments (post_id, user_id, content)
VALUES ($1, $2, $3) RETURNING *;

-- name: DeleteComment :one
DELETE FROM comments WHERE comment_id = $1
RETURNING *;

-- name: SelectAllSubscribtions :many
SELECT * FROM subscribtions;

-- name: InsertSubscribtion :one
INSERT INTO subscribtions (subscriber_id, blogger_id)
VALUES ($1, $2) RETURNING *;

-- name: DeleteSubscribtion :one
DELETE FROM subscribtions
WHERE subscriber_id = $1
AND blogger_id = $2
RETURNING *;

-- name: SelectUserSubscribers :many
SELECT users.* FROM subscribtions
INNER JOIN users ON users.user_id = subscribtions.subscriber_id
WHERE blogger_id = $1;

-- name: SelectUserSubscribtions :many
SELECT users.* FROM subscribtions
INNER JOIN users ON users.user_id = subscribtions.blogger_id
WHERE subscriber_id = $1;

-- name: SelectRevokedToken :one
SELECT * FROM revoked_tokens
WHERE token = $1 LIMIT 1;

-- name: InsertRevokedToken :exec
INSERT INTO revoked_tokens (token) VALUES ($1);
