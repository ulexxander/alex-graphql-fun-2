package graph

import (
	"github.com/gbrlsnchs/jwt/v3"
	"gitlab.com/ulexxander/gqlnexttry/db"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB        *db.Queries
	JWTSigner *jwt.HMACSHA
}
