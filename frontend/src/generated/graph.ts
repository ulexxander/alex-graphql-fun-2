import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};


export type Comment = {
  __typename?: 'Comment';
  commentID: Scalars['ID'];
  postID: Scalars['ID'];
  userID: Scalars['ID'];
  creator: User;
  content: Scalars['String'];
  dateCreated: Scalars['Time'];
};

export type CreateCommentInput = {
  postID: Scalars['ID'];
  content: Scalars['String'];
};

export type CreatePostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type CreateSubscribtionInput = {
  bloggerID: Scalars['ID'];
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginTokenInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createPost: Post;
  createComment: Comment;
  createSubscribtion?: Maybe<Subscribtion>;
  deletePost: Post;
  deleteComment: Comment;
  deleteSubscribtion: Subscribtion;
  loginToken: Scalars['String'];
  logout: User;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationCreatePostArgs = {
  input?: Maybe<CreatePostInput>;
};


export type MutationCreateCommentArgs = {
  input?: Maybe<CreateCommentInput>;
};


export type MutationCreateSubscribtionArgs = {
  input?: Maybe<CreateSubscribtionInput>;
};


export type MutationDeletePostArgs = {
  postID: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentID: Scalars['ID'];
};


export type MutationDeleteSubscribtionArgs = {
  bloggerID: Scalars['ID'];
};


export type MutationLoginTokenArgs = {
  input?: Maybe<LoginTokenInput>;
};

export type Post = {
  __typename?: 'Post';
  postID: Scalars['ID'];
  userID: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  creator: User;
  comments: Array<Comment>;
  dateCreated: Scalars['Time'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  allUsers: Array<User>;
  allPosts: Array<Post>;
  allComments: Array<Comment>;
  allSubscribtions: Array<Subscribtion>;
};

export type Subscribtion = {
  __typename?: 'Subscribtion';
  subscriberID: Scalars['ID'];
  bloggerID: Scalars['ID'];
};


export type User = {
  __typename?: 'User';
  userID: Scalars['ID'];
  username: Scalars['String'];
  subscribers: Array<User>;
  subscribtions: Array<User>;
  dateCreated: Scalars['Time'];
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);

export type LoginTokenMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginToken'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
    & { subscribers: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'username'>
    )>, subscribtions: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'username'>
    )> }
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(input: {username: $username, password: $password}) {
    username
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginTokenDocument = gql`
    mutation LoginToken($username: String!, $password: String!) {
  loginToken(input: {username: $username, password: $password})
}
    `;
export type LoginTokenMutationFn = Apollo.MutationFunction<LoginTokenMutation, LoginTokenMutationVariables>;

/**
 * __useLoginTokenMutation__
 *
 * To run a mutation, you first call `useLoginTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginTokenMutation, { data, loading, error }] = useLoginTokenMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginTokenMutation(baseOptions?: Apollo.MutationHookOptions<LoginTokenMutation, LoginTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginTokenMutation, LoginTokenMutationVariables>(LoginTokenDocument, options);
      }
export type LoginTokenMutationHookResult = ReturnType<typeof useLoginTokenMutation>;
export type LoginTokenMutationResult = Apollo.MutationResult<LoginTokenMutation>;
export type LoginTokenMutationOptions = Apollo.BaseMutationOptions<LoginTokenMutation, LoginTokenMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    subscribers {
      userID
      username
    }
    subscribtions {
      userID
      username
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;