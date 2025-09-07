import type * as Kit from "@sveltejs/kit";

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = Record<string, never>;
type RouteId = "/og";
type MaybeWithVoid<T> = Record<string, never> extends T ? T | void : T;
export type RequestEvent = Expand<
  Omit<Kit.RequestEvent<RouteParams, RouteId>, "route"> & {
    route: {
      id: RouteId;
    };
  }
>;
export type RequestHandler = Kit.RequestHandler<RouteParams, RouteId>;
export type ServerLoad = Kit.ServerLoad<RouteParams, RouteId>;
