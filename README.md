# Kinetic Object Stream

Simple, unopionated,
[dataflow streaming](https://en.wikipedia.org/wiki/Dataflow) framework
for creating **autonomic** data pipelines and state machines for your
apps.

It's a **data-centric** and
[reactive programming](https://en.wikipedia.org/wiki/Reactive_programming)
paradigm that dynamically responds to *objects* in motion through a
pipeline of computational actors that can execute
concurrently.

Conduct
[data science](https://en.wikipedia.org/wiki/Data_science)
experiments, share your flows, and embrace KOS.

<!---
  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
--->

## Introduction

A **Kinetic Object Stream** enables dataflow transactions to be
expressed as discrete atomic *actions* that automatically executes
based on varying input conditions.

> For example, in an *imperative* programming setting, `a:=b+c` would
> mean that `a` is being assigned the result of `b+c` in the instant
> the expression is evaluated, and later, the values of `b` and `c`
> can be changed with no effect on the value of `a`. However, in
> reactive programming, the value of `a` would be automatically
> updated whenever the values of `b` and `c` change, without the
> program executing the sentence `a:=b+c` again.

A **Kineitc Reactor** contains a set of **Trigger(s)** and/or
**Stream(s)** that operates on one or more *named input* **Object(s)**
to produce one or more *named output* **Object(s)**.

```
├─ label: kos-http
├─ summary: Provides HTTP client and/or server transforms
├─ includes
│  ├─ kos-http-client
│  └─ kos-http-server
├─ actions
│  ├─ ƒ(simpleGet)
│  ├─ ƒ(extractBody)
│  └─ ƒ(proxy)
└──┐
   ├─ kos-http-client
   │  ├─ summary: Provides HTTP client flows utilizing 'superagent' module
   │  ├─ requires
   │  │  └─ module/superagent
   │  ├─ actions
   │  │  ├─ ƒ(classify)
   │  │  └─ ƒ(handleRequest)
   │  └──┐
   │     │                                             ┌╼ http/request/get
   │     │                                             ├╼ http/request/post
   │     ├─╼ http/request        ╾─╼ ƒ(classify)      ╾┼╼ http/request/put
   │     │                                             ├╼ http/request/patch
   │     │                                             └╼ http/request/delete
   │     │┌╼ http/request/get    ╾┐
   │     │├╼ http/request/post   ╾┤
   │     └┼╼ http/request/put    ╾┼╼ ƒ(handleRequest) ╾─╼ http/response
   │      ├╼ http/request/patch  ╾┤
   │      └╼ http/request/delete ╾┘
   │
   ├─ kos-http-server
   │  ├─ summary: Provides HTTP server flows utilizing 'express' module
   │  ├─ requires
   │  │  └─ module/express
   │  ├─ actions
   │  │  ├─ ƒ(runServer)
   │  │  └─ ƒ(handleRoute)
   │  └──┐
   │     ├─╼ http/listen    ╾─╼ ƒ(runServer)   ╾─╼ http/server
   │     └┬╼ http/server    ╾┬╼ ƒ(handleRoute) ╾─╼ http/server/request
   │      └╼ http/route     ╾┘
   │
   ├─╼ http/response        ╾─╼ ƒ(extractBody) ╾─╼ http/response/body
   └┬╼ http/server/request  ╾┬╼ ƒ(proxy)       ╾─╼ http/request
    └╼ http/proxy           ╾┘
```

The above render was generated for [kos-http](./flows/http.md)
module via `kos show` using the included `kos` CLI utility. Please
refer to [Managing Flows](./docs/cli.md#managing-flows) documentation
for more info on utilizing the `kos` CLI utility.

## Installation

```bash
$ npm install -g kos
```

Installing this module with `-g` flag enables system-wide access to
the `kos` utility. It is the *preferred* installation method, but it's
perfectly fine to install as a local dependency.

## Reference Guides

- [Why embrace KOS?](./docs/benefits.md)
- [Managing Flows with `kos` CLI](./docs/cli.md)
- [Using Flows](./docs/usage.md)
- [Creating Flows](./docs/developer.md)
- [Managing State](./docs/state-machine.md)
- [Using KOS with React](./docs/react.md)

## Available Flows

The following flow modules are included inside the `kos` repository.

- [kos-function](./flows/function.md)
- [kos-require](./flows/require.md)
- [kos-net](./flows/net.js)
- [kos-pull](./flows/pull.js)
- [kos-push](./flows/push.js)
- [kos-sync](./flows/sync.js)
- [kos-http](./flows/http.md)
- [kos-mqtt](./flows/mqtt.md)
- [kos-npm](./flows/npm.md)
- [kos-react](./flows/react.md)
- ... and many more coming soon!

As discussed in
[Managing Dependencies](./docs/usage.md#managing-dependencies) section
of the [Using Flows](./docs/usage.md) guide, properly created KOS
modules do NOT contain any *explicit* external module dependencies at
the module-level but instead receive them via the stream from the
upstream consumer. As such, maintaining `package.json` or publishing
the KOS modules to NPM is completely optional.

## License
  [Apache 2.0](LICENSE)

This software is brought to you by
[Corenova Technologies](http://www.corenova.com). We'd love to hear
your feedback.  Please feel free to reach me at <peter@corenova.com>
anytime with questions, suggestions, etc.

[npm-image]: https://img.shields.io/npm/v/kos.svg
[npm-url]: https://npmjs.org/package/kos
[downloads-image]: https://img.shields.io/npm/dt/kos.svg
[downloads-url]: https://npmjs.org/package/kos
