# Development directions

- Check out https://github.com/malloydata/malloy and https://github.com/malloydata/malloy-explorer into the same directory
- In the malloy directory, build local malloy packages

```
cd malloy
npm ci && npm run build && npm pack -ws --pack-destination out
```

- In the malloy-explorer directory, install packages

```
cd ../malloy-explorer
npm install
```

- To test, run the vite developer tool

```
npm run dev
```

- Open http://localhost:5173/
