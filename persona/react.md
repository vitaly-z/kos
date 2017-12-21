# react persona

This persona provides reactions to React.js lifecycle events.

It's designed to be used as a sub-persona by being loaded into another
Persona.

Source code is [here](./react.js).

## Usage

```js
const ReactPersona = require('kos/persona/react')
```

Simple example:

```js
const MyPersona = kos.create('some-reactive-persona')
  .load(ReactPersona)
  .in('react:mounted').bind(foo)
```

## kos --show react

```
npm: reactions to NPM package management requests
├─ id: 98cc3437-4bed-4899-8a8e-ca005f4e9526
├─ passive: false
├─ enabled: true
├─ depends
│  └─ module/npm
├─ reactions
│  ├─ ƒ(triggerLoad)
│  ├─ ƒ(initialize)
│  ├─ ƒ(queueInstall)
│  ├─ ƒ(install)
│  ├─ ƒ(autoFetchMissing)
│  └─ ƒ(handleAutoFetch)
└──┐
   ├─╼ module/npm    ╾─╼ ƒ(triggerLoad)      ╾─╼ npm/load
   ├┬╼ module/npm    ╾┬╼ ƒ(initialize)       ╾─╼ npm/loaded
   │└╼ npm/load      ╾┘
   ├┬╼ module/npm    ╾┬╼ ƒ(queueInstall)
   │└╼ npm/install   ╾┘
   │┌╼ module/npm    ╾┐
   ├┼╼ npm/install   ╾┼╼ ƒ(install)          ╾─╼ npm/installed
   │└╼ npm/loaded    ╾┘
   ├─╼ error         ╾─╼ ƒ(autoFetchMissing) ╾─╼ npm/install
   └─╼ npm/installed ╾─╼ ƒ(handleAutoFetch)  ╾─╼ require
```