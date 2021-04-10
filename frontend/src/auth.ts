import { makeVar } from "@apollo/client";

export const savedLoginToken = makeVar(localStorage.getItem("login_token"));
