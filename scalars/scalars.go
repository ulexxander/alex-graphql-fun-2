package scalars

import (
	"fmt"
	"io"

	"github.com/99designs/gqlgen/graphql"
	"github.com/google/uuid"
)

func MarshalUUID(uuid uuid.UUID) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		withQuotes := fmt.Sprintf("\"%s\"", uuid.String())
		w.Write([]byte(withQuotes))
	})
}

func UnmarshalUUID(v interface{}) (uuid.UUID, error) {
	switch v := v.(type) {
	case string:
		return uuid.Parse(v)
	default:
		return uuid.Nil, fmt.Errorf("%T is not a valid uuid", v)
	}
}
