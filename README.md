# Development directions

- Initialize git sub-modules

```
git submodule init
git submodule update
```

- Install required packages

```
npm install
```

- To test, run the vite developer tool

```
npm run dev
```

- Open http://localhost:5173/

## Running against a local version of Malloy

1. Run `npm run malloy-build-and-link` once and whenever you need to pull in changes
2. If you need to pull in changes of `@malloydata/malloy-render`, then navigate to the `malloy` direcory and build it using `npm run build` first.
3. If you make changes to Malloy that are required by the explorer, then merge those into main, and that will trigger an automatic developer release of Malloy.
4. Once that release completes, run `npm run malloy-update` to update dependencies to that release. This will break the link to your local version of Malloy, so if you want to resume local development, re-run `npm run malloy-link`
5. To manually unlink without updating, you may run `npm run malloy-unlink`
