// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"github.com/google/uuid"
)

type CreateCommentInput struct {
	PostID  uuid.UUID `json:"postID"`
	Content string    `json:"content"`
}

type CreatePostInput struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

type CreateSubscribtionInput struct {
	BloggerID uuid.UUID `json:"bloggerID"`
}

type CreateUserInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginTokenInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
