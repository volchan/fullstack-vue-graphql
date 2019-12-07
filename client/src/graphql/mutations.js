import gql from "apollo-boost";

export const SIGNIN_USER = gql`
  mutation($login: String!, $password: String!) {
    signinUser(login: $login, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
