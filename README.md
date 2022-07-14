# webapp-template

## About

For purposes of saving time, this repo contains the "standard" template I utilize for most web-based applications.

## Tech Stack

- Typescript
- React
- Webpack
- Babel
- react-bootstrap
  - SCSS is utilized - and tranformed during the webpack bundling process
- React Router
- grpc-web
  - For back-end microservices, I prefer to use a gRPC server, proxied through an envoy proxy, with envoy configured to receive `grpc-web`-based requests and transform them (and back) to the gRPC server.
  - If my public client web app is contacting the envoy proxy directly, I utilize the `@protobuf-ts` library to build, dial, and submit requests to envoy.

## Additional Libraries

- immer (use-immer)
  - I typically prefer to use `use-immer` in react to update nested states pushed to child components via context.

## Updates

- This library will be updated from time to time, to both increment versions and update my web dev stack.