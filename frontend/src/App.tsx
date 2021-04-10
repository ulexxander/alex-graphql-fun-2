import { ApolloError, useReactiveVar } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { savedLoginToken } from "./auth";
import {
  AllPostsDocument,
  AllPostsQuery,
  AllUsersDocument,
  AllUsersQuery,
  MeDocument,
  useAllPostsQuery,
  useAllUsersQuery,
  useCreateCommentMutation,
  useCreatePostMutation,
  useCreateSubscribtionMutation,
  useCreateUserMutation,
  useDeleteSubscribtionMutation,
  useLoginTokenMutation,
  useLogoutMutation,
  useMeQuery,
  User,
} from "./generated/graph";
import { readableIsoDate } from "./lib";

const Page: React.FC = ({ children }) => {
  return <div className="page">{children}</div>;
};

const Loading: React.FC = () => {
  return <p>Loading...</p>;
};

const Error: React.FC<{ children: ApolloError }> = ({ children }) => {
  return <p>Error: {children.message}</p>;
};

const LoginForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login, { data, loading, error }] = useLoginTokenMutation({
    refetchQueries: [{ query: MeDocument }],
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("login_token", data.loginToken);
      savedLoginToken(data.loginToken);
    }
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login({
          variables: {
            username: usernameRef.current?.value ?? "",
            password: passwordRef.current?.value ?? "",
          },
        });
      }}
    >
      <input
        ref={usernameRef}
        type="text"
        name="login_username"
        id="login_username"
        placeholder="Username"
      />
      <input
        ref={passwordRef}
        type="password"
        name="login_password"
        id="login_password"
        placeholder="Password"
      />
      <button type="submit">Login</button>

      {error && <Error>{error}</Error>}
      {loading && <Loading />}
    </form>
  );
};

const SignUpForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [createUser, { data, error, loading }] = useCreateUserMutation({
    refetchQueries: [{ query: AllUsersDocument }],
  });

  if (!data) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({
            variables: {
              username: usernameRef.current?.value ?? "",
              password: passwordRef.current?.value ?? "",
            },
          });
        }}
      >
        <input
          ref={usernameRef}
          type="text"
          name="register_username"
          id="register_username"
          placeholder="Username"
        />
        <input
          ref={passwordRef}
          type="password"
          name="register_password"
          id="register_password"
          placeholder="Password"
        />
        <button type="submit">Sign up</button>

        {error && <Error>{error}</Error>}
        {loading && <Loading />}
      </form>
    );
  }

  return (
    <div>
      <p>
        Created <b>{data.createUser.username}</b> account
      </p>
      <p>You can login now</p>
    </div>
  );
};

const NoUser: React.FC = () => {
  return (
    <div className="nouser">
      <h3>Already have an account?</h3>
      <LoginForm />

      <h3>Register</h3>
      <SignUpForm />
    </div>
  );
};

const MySubscribtion: React.FC<{
  blogger: Pick<User, "userID" | "username">;
}> = ({ blogger }) => {
  const [unsubscribe, unsubscribeResult] = useDeleteSubscribtionMutation({
    variables: { bloggerID: blogger.userID },
    refetchQueries: [{ query: MeDocument }],
  });

  return (
    <li key={blogger.userID}>
      <span>{blogger.username}</span>
      <button className="small inline" onClick={() => unsubscribe()}>
        Unsubscribe
      </button>
      {unsubscribeResult.error && <Error>{unsubscribeResult.error}</Error>}
    </li>
  );
};

const Logout: React.FC = () => {
  const [logout, { data, error, loading }] = useLogoutMutation();

  useEffect(() => {
    if (data) {
      localStorage.removeItem("login_token");
      alert(`Logged out ${data.logout.username}`);
      savedLoginToken(null);
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
      {loading && <p>Logging u out...</p>}
      {error && <Error>{error}</Error>}
    </div>
  );
};

const UserMe: React.FC = () => {
  const { data, error } = useMeQuery();
  const me = data?.me;

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!me) {
    return <Loading />;
  }

  const subscribtions = me.subscribtions.map((blogger) => (
    <MySubscribtion key={blogger.userID} blogger={blogger} />
  ));

  const subscribers = me.subscribers.map((subscriber) => (
    <li key={subscriber.userID}>{subscriber.username}</li>
  ));

  return (
    <div>
      <h3>Logged as {me.username}</h3>

      <p>My subscribtions</p>
      <ul>
        {subscribtions.length ? subscribtions : <small>No one yet...</small>}
      </ul>

      <p>My subscribers</p>
      <ul>{subscribers.length ? subscribers : <small>No one yet...</small>}</ul>

      <Logout />
    </div>
  );
};

const UserSubscribe: React.FC<{ user: AllUsersQuery["allUsers"][number] }> = ({
  user,
}) => {
  const [subscribe, subscribeResult] = useCreateSubscribtionMutation();

  return (
    <div>
      <button
        className="small"
        onClick={() => {
          subscribe({
            variables: { bloggerID: user.userID },
            refetchQueries: [{ query: MeDocument }],
          });
        }}
      >
        Subscribe
      </button>

      {subscribeResult.error && <Error>{subscribeResult.error}</Error>}
    </div>
  );
};

const AllUsers: React.FC = () => {
  const { data, error } = useAllUsersQuery();

  const users = data?.allUsers;

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!users) {
    return <Loading />;
  }

  const allUsers = users.map((user) => (
    <li key={user.userID}>
      <p>
        <span className="username">{user.username}</span> - here since{" "}
        {readableIsoDate(user.dateCreated)}
      </p>

      <UserSubscribe user={user} />
    </li>
  ));

  return (
    <div>
      <h3>All users</h3>
      <ul>{allUsers}</ul>
    </div>
  );
};

const NewPostComment: React.FC<{ post: AllPostsQuery["allPosts"][number] }> = ({
  post,
}) => {
  const [createComment, { error }] = useCreateCommentMutation({
    refetchQueries: [{ query: AllPostsDocument }],
  });

  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <div className="new-post-comment">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createComment({
            variables: {
              postID: post.postID,
              content: commentRef.current?.value ?? "",
            },
          });
        }}
      >
        <input
          ref={commentRef}
          type="text"
          name="post_comment"
          id="post_comment"
          placeholder="Comment"
        />
        <button type="submit">Send comment</button>
      </form>
      {error && <Error>{error}</Error>}
    </div>
  );
};

const PostComments: React.FC<{ post: AllPostsQuery["allPosts"][number] }> = ({
  post,
}) => {
  const comments = post.comments.map((comment) => (
    <li key={comment.commentID}>
      <p>
        <span className="username">{comment.creator.username}</span>{" "}
        <span className="small">{readableIsoDate(comment.dateCreated)}</span>
      </p>
      <p>{comment.content}</p>
    </li>
  ));

  return (
    <div className="post-comments">
      <h4>Comments:</h4>
      <ul className="tiles">{comments}</ul>
      <NewPostComment post={post} />
    </div>
  );
};

const LatestPosts: React.FC = () => {
  const { data, error } = useAllPostsQuery();
  const posts = data?.allPosts;

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!posts) {
    return <Loading />;
  }

  const latestPosts = posts.map((post) => {
    return (
      <div key={post.postID}>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
        <PostComments post={post} />
      </div>
    );
  });

  return (
    <div>
      <h3>Latest posts</h3>
      {latestPosts}
    </div>
  );
};

const NewPost: React.FC = () => {
  const [createPost, { error }] = useCreatePostMutation({
    refetchQueries: [{ query: AllPostsDocument }],
  });

  const postTitleRef = useRef<HTMLInputElement>(null);
  const postBodyRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <h3>New post</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost({
            variables: {
              title: postTitleRef.current?.value ?? "",
              body: postBodyRef.current?.value ?? "",
            },
          });
        }}
      >
        <input
          ref={postTitleRef}
          type="text"
          name="new_post_title"
          id="new_post_title"
          placeholder="Title"
        />
        <textarea
          ref={postBodyRef}
          name="new_post_body"
          id="new_post_body"
          placeholder="Post body......"
          cols={30}
          rows={5}
        />
        <button type="submit">Create post</button>
      </form>

      {error && <Error>{error}</Error>}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-row">
        <UserMe />
        <AllUsers />
      </div>

      <div className="home-row">
        <LatestPosts />
        <NewPost />
      </div>
    </div>
  );
};

const PageContent: React.FC = () => {
  const token = useReactiveVar(savedLoginToken);

  if (!token) {
    return <NoUser />;
  }

  return <Home />;
};

export const App: React.FC = () => {
  return (
    <Page>
      <PageContent />
    </Page>
  );
};
