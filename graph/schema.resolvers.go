package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	jwt "github.com/gbrlsnchs/jwt/v3"
	"github.com/google/uuid"
	"gitlab.com/ulexxander/gqlnexttry/db"
	"gitlab.com/ulexxander/gqlnexttry/graph/generated"
	"gitlab.com/ulexxander/gqlnexttry/graph/model"
	"gitlab.com/ulexxander/gqlnexttry/middleware"
	"golang.org/x/crypto/bcrypt"
)

func (r *commentResolver) Creator(ctx context.Context, obj *db.Comment) (*db.User, error) {
	user, err := r.DB.SelectUserByID(ctx, obj.UserID)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input *model.CreateUserInput) (*db.User, error) {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	newUser, err := r.DB.InsertUser(ctx, db.InsertUserParams{
		Username: input.Username,
		Password: string(hashedPass),
	})
	if err != nil {
		return nil, err
	}

	return &newUser, nil
}

func (r *mutationResolver) CreatePost(ctx context.Context, input *model.CreatePostInput) (*db.Post, error) {
	user := middleware.UserFromContext(ctx)

	post, err := r.DB.InsertPost(ctx, db.InsertPostParams{
		UserID: user.UserID,
		Title:  input.Title,
		Body:   input.Body,
	})
	if err != nil {
		return nil, err
	}

	return &post, nil
}

func (r *mutationResolver) CreateComment(ctx context.Context, input *model.CreateCommentInput) (*db.Comment, error) {
	user := middleware.UserFromContext(ctx)

	comment, err := r.DB.InsertComment(ctx, db.InsertCommentParams{
		PostID:  input.PostID,
		UserID:  user.UserID,
		Content: input.Content,
	})
	if err != nil {
		return nil, err
	}

	return &comment, nil
}

func (r *mutationResolver) CreateSubscribtion(ctx context.Context, input *model.CreateSubscribtionInput) (*db.Subscribtion, error) {
	user := middleware.UserFromContext(ctx)

	subscribtion, err := r.DB.InsertSubscribtion(ctx, db.InsertSubscribtionParams{
		SubscriberID: user.UserID,
		BloggerID:    input.BloggerID,
	})
	if err != nil {
		return nil, err
	}

	return &subscribtion, nil
}

func (r *mutationResolver) DeletePost(ctx context.Context, postID uuid.UUID) (*db.Post, error) {
	post, err := r.DB.DeletePost(ctx, postID)
	if err != nil {
		return nil, err
	}

	return &post, nil
}

func (r *mutationResolver) DeleteComment(ctx context.Context, commentID uuid.UUID) (*db.Comment, error) {
	comment, err := r.DB.DeleteComment(ctx, commentID)
	if err != nil {
		return nil, err
	}

	return &comment, nil
}

func (r *mutationResolver) DeleteSubscribtion(ctx context.Context, bloggerID uuid.UUID) (*db.Subscribtion, error) {
	user := middleware.UserFromContext(ctx)

	subscribtion, err := r.DB.DeleteSubscribtion(ctx, db.DeleteSubscribtionParams{
		SubscriberID: user.UserID,
		BloggerID:    bloggerID,
	})
	if err != nil {
		return nil, err
	}

	return &subscribtion, nil
}

func (r *mutationResolver) LoginToken(ctx context.Context, input *model.LoginTokenInput) (string, error) {
	user, err := r.DB.SelectUserByUsername(ctx, input.Username)
	if err != nil {
		return "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return "", err
	}

	now := time.Now()
	token, err := jwt.Sign(middleware.LoginTokenPayload{
		Payload: jwt.Payload{
			ExpirationTime: jwt.NumericDate(now.Add(24 * time.Hour)),
			IssuedAt:       jwt.NumericDate(now),
		},
		UserID: user.UserID.String(),
	}, r.JWTSigner)
	if err != nil {
		return "", err
	}

	return string(token), nil
}

func (r *mutationResolver) Logout(ctx context.Context) (*db.User, error) {
	token := middleware.AuthTokenFromContext(ctx)
	err := r.DB.InsertRevokedToken(ctx, token)
	if err != nil {
		return nil, err
	}

	return middleware.UserFromContext(ctx), nil
}

func (r *postResolver) Creator(ctx context.Context, obj *db.Post) (*db.User, error) {
	user, err := r.DB.SelectUserByID(ctx, obj.UserID)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *postResolver) Comments(ctx context.Context, obj *db.Post) ([]db.Comment, error) {
	comments, err := r.DB.SelectCommentsByPost(ctx, obj.PostID)
	if err != nil {
		return nil, err
	}

	return comments, nil
}

func (r *queryResolver) Me(ctx context.Context) (*db.User, error) {
	user := middleware.UserFromContext(ctx)
	return user, nil
}

func (r *queryResolver) AllUsers(ctx context.Context) ([]db.User, error) {
	users, err := r.DB.SelectAllUsers(ctx)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *queryResolver) AllPosts(ctx context.Context) ([]db.Post, error) {
	posts, err := r.DB.SelectAllPosts(ctx)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func (r *queryResolver) AllComments(ctx context.Context) ([]db.Comment, error) {
	comments, err := r.DB.SelectAllComments(ctx)
	if err != nil {
		return nil, err
	}

	return comments, nil
}

func (r *queryResolver) AllSubscribtions(ctx context.Context) ([]db.Subscribtion, error) {
	subscribtions, err := r.DB.SelectAllSubscribtions(ctx)
	if err != nil {
		return nil, err
	}

	return subscribtions, nil
}

func (r *userResolver) Subscribers(ctx context.Context, obj *db.User) ([]db.User, error) {
	subscribers, err := r.DB.SelectUserSubscribers(ctx, obj.UserID)
	if err != nil {
		return nil, err
	}

	return subscribers, nil
}

func (r *userResolver) Subscribtions(ctx context.Context, obj *db.User) ([]db.User, error) {
	subscribtions, err := r.DB.SelectUserSubscribtions(ctx, obj.UserID)
	if err != nil {
		return nil, err
	}

	return subscribtions, nil
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type commentResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type postResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
