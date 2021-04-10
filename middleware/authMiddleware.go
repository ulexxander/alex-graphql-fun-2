package middleware

import (
	"context"
	"net/http"

	"gitlab.com/ulexxander/gqlnexttry/db"

	"github.com/gbrlsnchs/jwt/v3"
	"github.com/google/uuid"
)

type LoginTokenPayload struct {
	jwt.Payload
	UserID string `json:"uid"`
}

type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}
var authTokenCtxKey = &contextKey{"authToken"}

func Auth(db *db.Queries, jwtSigner *jwt.HMACSHA, next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// Bearer <jwt_token>
		authHeader := r.Header.Get("Authorization")

		if len(authHeader) < 8 {
			next.ServeHTTP(w, r)
			return
		}

		token := authHeader[7:]

		revokedToken, _ := db.SelectRevokedToken(r.Context(), token)
		if revokedToken.Token != "" {
			next.ServeHTTP(w, r)
			return
		}

		var payload LoginTokenPayload
		_, err := jwt.Verify([]byte(token), jwtSigner, &payload)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		userID, err := uuid.Parse(payload.UserID)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		user, err := db.SelectUserByID(r.Context(), userID)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		ctxWithUser := context.WithValue(r.Context(), userCtxKey, &user)
		ctxWithToken := context.WithValue(ctxWithUser, authTokenCtxKey, token)
		next.ServeHTTP(w, r.WithContext(ctxWithToken))
	}
}

func AuthTokenFromContext(ctx context.Context) string {
	token, _ := ctx.Value(authTokenCtxKey).(string)
	return token
}

func UserFromContext(ctx context.Context) *db.User {
	user, _ := ctx.Value(userCtxKey).(*db.User)
	return user
}
