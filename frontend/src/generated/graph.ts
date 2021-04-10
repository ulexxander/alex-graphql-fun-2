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
    & Pick<User, 'userID' | 'username'>
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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'username'>
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  postID: Scalars['ID'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'commentID'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'postID'>
  ) }
);

export type CreateSubscribtionMutationVariables = Exact<{
  bloggerID: Scalars['ID'];
}>;


export type CreateSubscribtionMutation = (
  { __typename?: 'Mutation' }
  & { createSubscribtion?: Maybe<(
    { __typename?: 'Subscribtion' }
    & Pick<Subscribtion, 'subscriberID' | 'bloggerID'>
  )> }
);

export type DeleteSubscribtionMutationVariables = Exact<{
  bloggerID: Scalars['ID'];
}>;


export type DeleteSubscribtionMutation = (
  { __typename?: 'Mutation' }
  & { deleteSubscribtion: (
    { __typename?: 'Subscribtion' }
    & Pick<Subscribtion, 'subscriberID' | 'bloggerID'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'username'>
    & { subscribers: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'username'>
    )>, subscribtions: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'username'>
    )> }
  )> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'username' | 'dateCreated'>
  )> }
);

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { allPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'postID' | 'title' | 'body'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'username'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'commentID' | 'content' | 'dateCreated'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'userID' | 'username'>
      ) }
    )> }
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(input: {username: $username, password: $password}) {
    userID
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
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    userID
    username
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($postID: ID!, $content: String!) {
  createComment(input: {postID: $postID, content: $content}) {
    commentID
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $body: String!) {
  createPost(input: {title: $title, body: $body}) {
    postID
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateSubscribtionDocument = gql`
    mutation CreateSubscribtion($bloggerID: ID!) {
  createSubscribtion(input: {bloggerID: $bloggerID}) {
    subscriberID
    bloggerID
  }
}
    `;
export type CreateSubscribtionMutationFn = Apollo.MutationFunction<CreateSubscribtionMutation, CreateSubscribtionMutationVariables>;

/**
 * __useCreateSubscribtionMutation__
 *
 * To run a mutation, you first call `useCreateSubscribtionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscribtionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscribtionMutation, { data, loading, error }] = useCreateSubscribtionMutation({
 *   variables: {
 *      bloggerID: // value for 'bloggerID'
 *   },
 * });
 */
export function useCreateSubscribtionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscribtionMutation, CreateSubscribtionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscribtionMutation, CreateSubscribtionMutationVariables>(CreateSubscribtionDocument, options);
      }
export type CreateSubscribtionMutationHookResult = ReturnType<typeof useCreateSubscribtionMutation>;
export type CreateSubscribtionMutationResult = Apollo.MutationResult<CreateSubscribtionMutation>;
export type CreateSubscribtionMutationOptions = Apollo.BaseMutationOptions<CreateSubscribtionMutation, CreateSubscribtionMutationVariables>;
export const DeleteSubscribtionDocument = gql`
    mutation DeleteSubscribtion($bloggerID: ID!) {
  deleteSubscribtion(bloggerID: $bloggerID) {
    subscriberID
    bloggerID
  }
}
    `;
export type DeleteSubscribtionMutationFn = Apollo.MutationFunction<DeleteSubscribtionMutation, DeleteSubscribtionMutationVariables>;

/**
 * __useDeleteSubscribtionMutation__
 *
 * To run a mutation, you first call `useDeleteSubscribtionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscribtionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscribtionMutation, { data, loading, error }] = useDeleteSubscribtionMutation({
 *   variables: {
 *      bloggerID: // value for 'bloggerID'
 *   },
 * });
 */
export function useDeleteSubscribtionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscribtionMutation, DeleteSubscribtionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscribtionMutation, DeleteSubscribtionMutationVariables>(DeleteSubscribtionDocument, options);
      }
export type DeleteSubscribtionMutationHookResult = ReturnType<typeof useDeleteSubscribtionMutation>;
export type DeleteSubscribtionMutationResult = Apollo.MutationResult<DeleteSubscribtionMutation>;
export type DeleteSubscribtionMutationOptions = Apollo.BaseMutationOptions<DeleteSubscribtionMutation, DeleteSubscribtionMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    userID
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
export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    userID
    username
    dateCreated
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const AllPostsDocument = gql`
    query AllPosts {
  allPosts {
    postID
    title
    body
    creator {
      userID
      username
    }
    comments {
      commentID
      content
      dateCreated
      creator {
        userID
        username
      }
    }
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;