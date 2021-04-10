package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"os"

	"gitlab.com/ulexxander/gqlnexttry/db"
	"gitlab.com/ulexxander/gqlnexttry/graph"
	"gitlab.com/ulexxander/gqlnexttry/graph/generated"
	"gitlab.com/ulexxander/gqlnexttry/middleware"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gbrlsnchs/jwt/v3"
	_ "github.com/lib/pq"
)

func corsMiddleware(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:6030")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")
		next.ServeHTTP(w, r)
	}
}

func run() error {
	pg, err := sql.Open("postgres", "postgres://postgres:123@localhost/gqlstuff?sslmode=disable")
	if err != nil {
		return err
	}

	db := db.New(pg)

	mux := http.NewServeMux()

	jwtSigner := jwt.NewHS256([]byte("123"))

	gqlresolver := &graph.Resolver{
		DB:        db,
		JWTSigner: jwtSigner,
	}

	directives := generated.DirectiveRoot{
		Auth: func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
			user := middleware.UserFromContext(ctx)
			if user == nil {
				return nil, errors.New("not authorized")
			}

			return next(ctx)
		},
		Len: func(ctx context.Context, obj interface{}, next graphql.Resolver, min, max *int) (res interface{}, err error) {
			fieldVal, err := next(ctx)
			if err != nil {
				return nil, err
			}

			val, ok := (fieldVal).(string)
			if !ok {
				return nil, errors.New("@len: value should be a string")
			}

			if min != nil && len(val) < *min {
				return nil, fmt.Errorf("@len: value should be at least %d chars long", *min)
			}

			if max != nil && len(val) > *max {
				return nil, fmt.Errorf("@len: value should be at most %d chars long", *max)
			}

			return next(ctx)
		},
	}

	gqlschema := generated.NewExecutableSchema(generated.Config{
		Resolvers:  gqlresolver,
		Directives: directives,
	})
	gqlserv := handler.NewDefaultServer(gqlschema)

	withAuth := middleware.Auth(db, jwtSigner, gqlserv)
	withCors := corsMiddleware(withAuth)

	mux.Handle("/graphql", withCors)
	mux.Handle("/playground", playground.Handler("GraphQL playground", "/graphql"))
	mux.Handle("/", http.FileServer(http.Dir("./frontend/build")))

	server := &http.Server{
		Addr:    ":4018",
		Handler: mux,
	}

	return server.ListenAndServe()
}

func main() {
	err := run()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
