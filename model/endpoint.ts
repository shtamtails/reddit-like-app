export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Query = {
  __typename?: "Query";
  info: Scalars["String"];
  feed: Feed;
  user: Array<User>;
};

export type QueryFeedArgs = {
  filter?: Maybe<Scalars["String"]>;
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<LinkOrderByInput>;
};

export type LinkOrderByInput = {
  description?: Maybe<Sort>;
  url?: Maybe<Sort>;
  createdAt?: Maybe<Sort>;
};

export enum Sort {
  Asc = "asc",
  Desc = "desc",
}

export type Feed = {
  __typename?: "Feed";
  links: Array<Link>;
  count: Scalars["Int"];
};

export type Link = {
  __typename?: "Link";
  id: Scalars["ID"];
  description: Scalars["String"];
  url: Scalars["String"];
  postedBy?: Maybe<User>;
  votes: Array<Vote>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  links: Array<Link>;
};

export type Vote = {
  __typename?: "Vote";
  id: Scalars["ID"];
  link: Link;
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  post: Link;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  vote?: Maybe<Vote>;
};

export type MutationPostArgs = {
  url: Scalars["String"];
  description: Scalars["String"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationVoteArgs = {
  linkId: Scalars["ID"];
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: "Subscription";
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type GetPaginatedQueryVariables = Exact<{
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
}>;

export type GetPaginatedQuery = { __typename?: "Query" } & {
  feed: { __typename?: "Feed" } & Pick<Feed, "count"> & {
      links: Array<
        { __typename?: "Link" } & Pick<Link, "id" | "description" | "url"> & {
            postedBy?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>;
            votes: Array<
              { __typename?: "Vote" } & Pick<Vote, "id"> & {
                  user: { __typename?: "User" } & Pick<User, "id" | "name">;
                }
            >;
          }
      >;
    };
};
