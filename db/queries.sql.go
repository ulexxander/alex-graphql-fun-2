// Code generated by sqlc. DO NOT EDIT.
// source: queries.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const deleteComment = `-- name: DeleteComment :one
DELETE FROM comments WHERE comment_id = $1
RETURNING comment_id, post_id, user_id, content, date_created
`

func (q *Queries) DeleteComment(ctx context.Context, commentID uuid.UUID) (Comment, error) {
	row := q.queryRow(ctx, q.deleteCommentStmt, deleteComment, commentID)
	var i Comment
	err := row.Scan(
		&i.CommentID,
		&i.PostID,
		&i.UserID,
		&i.Content,
		&i.DateCreated,
	)
	return i, err
}

const deletePost = `-- name: DeletePost :one
DELETE FROM posts WHERE post_id = $1
RETURNING post_id, user_id, title, body, date_created
`

func (q *Queries) DeletePost(ctx context.Context, postID uuid.UUID) (Post, error) {
	row := q.queryRow(ctx, q.deletePostStmt, deletePost, postID)
	var i Post
	err := row.Scan(
		&i.PostID,
		&i.UserID,
		&i.Title,
		&i.Body,
		&i.DateCreated,
	)
	return i, err
}

const deleteSubscribtion = `-- name: DeleteSubscribtion :one
DELETE FROM subscribtions
WHERE subscriber_id = $1
AND blogger_id = $2
RETURNING subscriber_id, blogger_id
`

type DeleteSubscribtionParams struct {
	SubscriberID uuid.UUID `json:"subscriberID"`
	BloggerID    uuid.UUID `json:"bloggerID"`
}

func (q *Queries) DeleteSubscribtion(ctx context.Context, arg DeleteSubscribtionParams) (Subscribtion, error) {
	row := q.queryRow(ctx, q.deleteSubscribtionStmt, deleteSubscribtion, arg.SubscriberID, arg.BloggerID)
	var i Subscribtion
	err := row.Scan(&i.SubscriberID, &i.BloggerID)
	return i, err
}

const insertComment = `-- name: InsertComment :one
INSERT INTO comments (post_id, user_id, content)
VALUES ($1, $2, $3) RETURNING comment_id, post_id, user_id, content, date_created
`

type InsertCommentParams struct {
	PostID  uuid.UUID `json:"postID"`
	UserID  uuid.UUID `json:"userID"`
	Content string    `json:"content"`
}

func (q *Queries) InsertComment(ctx context.Context, arg InsertCommentParams) (Comment, error) {
	row := q.queryRow(ctx, q.insertCommentStmt, insertComment, arg.PostID, arg.UserID, arg.Content)
	var i Comment
	err := row.Scan(
		&i.CommentID,
		&i.PostID,
		&i.UserID,
		&i.Content,
		&i.DateCreated,
	)
	return i, err
}

const insertPost = `-- name: InsertPost :one
INSERT INTO posts (user_id, title, body)
VALUES ($1, $2, $3) RETURNING post_id, user_id, title, body, date_created
`

type InsertPostParams struct {
	UserID uuid.UUID `json:"userID"`
	Title  string    `json:"title"`
	Body   string    `json:"body"`
}

func (q *Queries) InsertPost(ctx context.Context, arg InsertPostParams) (Post, error) {
	row := q.queryRow(ctx, q.insertPostStmt, insertPost, arg.UserID, arg.Title, arg.Body)
	var i Post
	err := row.Scan(
		&i.PostID,
		&i.UserID,
		&i.Title,
		&i.Body,
		&i.DateCreated,
	)
	return i, err
}

const insertRevokedToken = `-- name: InsertRevokedToken :exec
INSERT INTO revoked_tokens (token) VALUES ($1)
`

func (q *Queries) InsertRevokedToken(ctx context.Context, token string) error {
	_, err := q.exec(ctx, q.insertRevokedTokenStmt, insertRevokedToken, token)
	return err
}

const insertSubscribtion = `-- name: InsertSubscribtion :one
INSERT INTO subscribtions (subscriber_id, blogger_id)
VALUES ($1, $2) RETURNING subscriber_id, blogger_id
`

type InsertSubscribtionParams struct {
	SubscriberID uuid.UUID `json:"subscriberID"`
	BloggerID    uuid.UUID `json:"bloggerID"`
}

func (q *Queries) InsertSubscribtion(ctx context.Context, arg InsertSubscribtionParams) (Subscribtion, error) {
	row := q.queryRow(ctx, q.insertSubscribtionStmt, insertSubscribtion, arg.SubscriberID, arg.BloggerID)
	var i Subscribtion
	err := row.Scan(&i.SubscriberID, &i.BloggerID)
	return i, err
}

const insertUser = `-- name: InsertUser :one
INSERT INTO users (username, password)
VALUES ($1, $2) RETURNING user_id, username, password, date_created
`

type InsertUserParams struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (q *Queries) InsertUser(ctx context.Context, arg InsertUserParams) (User, error) {
	row := q.queryRow(ctx, q.insertUserStmt, insertUser, arg.Username, arg.Password)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.Username,
		&i.Password,
		&i.DateCreated,
	)
	return i, err
}

const selectAllComments = `-- name: SelectAllComments :many
SELECT comment_id, post_id, user_id, content, date_created FROM comments
`

func (q *Queries) SelectAllComments(ctx context.Context) ([]Comment, error) {
	rows, err := q.query(ctx, q.selectAllCommentsStmt, selectAllComments)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Comment
	for rows.Next() {
		var i Comment
		if err := rows.Scan(
			&i.CommentID,
			&i.PostID,
			&i.UserID,
			&i.Content,
			&i.DateCreated,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const selectAllPosts = `-- name: SelectAllPosts :many
SELECT post_id, user_id, title, body, date_created FROM posts
`

func (q *Queries) SelectAllPosts(ctx context.Context) ([]Post, error) {
	rows, err := q.query(ctx, q.selectAllPostsStmt, selectAllPosts)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Post
	for rows.Next() {
		var i Post
		if err := rows.Scan(
			&i.PostID,
			&i.UserID,
			&i.Title,
			&i.Body,
			&i.DateCreated,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const selectAllSubscribtions = `-- name: SelectAllSubscribtions :many
SELECT subscriber_id, blogger_id FROM subscribtions
`

func (q *Queries) SelectAllSubscribtions(ctx context.Context) ([]Subscribtion, error) {
	rows, err := q.query(ctx, q.selectAllSubscribtionsStmt, selectAllSubscribtions)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Subscribtion
	for rows.Next() {
		var i Subscribtion
		if err := rows.Scan(&i.SubscriberID, &i.BloggerID); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const selectAllUsers = `-- name: SelectAllUsers :many
SELECT user_id, username, password, date_created FROM users
`

func (q *Queries) SelectAllUsers(ctx context.Context) ([]User, error) {
	rows, err := q.query(ctx, q.selectAllUsersStmt, selectAllUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.UserID,
			&i.Username,
			&i.Password,
			&i.DateCreated,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const selectCommentsByPost = `-- name: SelectCommentsByPost :many
SELECT comment_id, post_id, user_id, content, date_created FROM comments WHERE post_id = $1
`

func (q *Queries) SelectCommentsByPost(ctx context.Context, postID uuid.UUID) ([]Comment, error) {
	rows, err := q.query(ctx, q.selectCommentsByPostStmt, selectCommentsByPost, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Comment
	for rows.Next() {
		var i Comment
		if err := rows.Scan(
			&i.CommentID,
			&i.PostID,
			&i.UserID,
			&i.Content,
			&i.DateCreated,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const selectRevokedToken = `-- name: SelectRevokedToken :one
SELECT token, date_created FROM revoked_tokens
WHERE token = $1 LIMIT 1
`

func (q *Queries) SelectRevokedToken(ctx context.Context, token string) (RevokedToken, error) {
	row := q.queryRow(ctx, q.selectRevokedTokenStmt, selectRevokedToken, token)
	var i RevokedToken
	err := row.Scan(&i.Token, &i.DateCreated)
	return i, err
}

const selectUserByID = `-- name: SelectUserByID :one
SELECT user_id, username, password, date_created FROM users WHERE user_id = $1
`

func (q *Queries) SelectUserByID(ctx context.Context, userID uuid.UUID) (User, error) {
	row := q.queryRow(ctx, q.selectUserByIDStmt, selectUserByID, userID)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.Username,
		&i.Password,
		&i.DateCreated,
	)
	return i, err
}

const selectUserByUsername = `-- name: SelectUserByUsername :one
SELECT user_id, username, password, date_created FROM users WHERE username = $1
`

func (q *Queries) SelectUserByUsername(ctx context.Context, username string) (User, error) {
	row := q.queryRow(ctx, q.selectUserByUsernameStmt, selectUserByUsername, username)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.Username,
		&i.Password,
		&i.DateCreated,
	)
	return i, err
}

const selectUserSubscribers = `-- name: SelectUserSubscribers :many
SELECT users.user_id, users.username, users.password, users.date_created FROM subscribtions
INNER JOIN users ON users.user_id = subscribtions.subscriber_id
WHERE blogger_id = $1
`

func (q *Queries) SelectUserSubscribers(ctx context.Context, bloggerID uuid.UUID) ([]User, error) {
	rows, err := q.query(ctx, q.selectUserSubscribersStmt, selectUserSubscribers, bloggerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.UserID,
			&i.Username,
			&i.Password,
			&i.DateCreated,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const selectUserSubscribtions = `-- name: SelectUserSubscribtions :many
SELECT users.user_id, users.username, users.password, users.date_created FROM subscribtions
INNER JOIN users ON users.user_id = subscribtions.blogger_id
WHERE subscriber_id = $1
`

func (q *Queries) SelectUserSubscribtions(ctx context.Context, subscriberID uuid.UUID) ([]User, error) {
	rows, err := q.query(ctx, q.selectUserSubscribtionsStmt, selectUserSubscribtions, subscriberID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.UserID,
			&i.Username,
			&i.Password,
			&i.DateCreated,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
