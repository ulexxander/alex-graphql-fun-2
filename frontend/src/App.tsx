import { ApolloError, useReactiveVar } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { savedLoginToken } from "./auth";
import {
  useCreateUserMutation,
  useLoginTokenMutation,
  useMeQuery,
} from "./generated/graph";

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

  const [login, { data, loading, error }] = useLoginTokenMutation();

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

  const [createUser, { data, error, loading }] = useCreateUserMutation();

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

const Logout: React.FC = () => {
  const logout = () => {
    localStorage.removeItem("login_token");
    savedLoginToken(null);
  };

  return <button onClick={logout}>Logout</button>;
};

const UserMe: React.FC = () => {
  const { data, error } = useMeQuery();

  if (!data?.me) {
    return <Loading />;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  const me = data.me;

  const subscribtions = me.subscribtions.map((subscribtion) => (
    <li key={subscribtion.userID}>{subscribtion.username}</li>
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
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <UserMe />

      <Logout />
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
