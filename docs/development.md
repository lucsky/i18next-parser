# Contribute

Any contribution is welcome. Just follow those guidelines:

1. If you are unsure, open a ticket before working on anything
2. Fork and clone the project
3. Create a branch `git checkout -b feature/my-feature` (or `hotfix`)
4. Push the code to your fork
5. **Write tests and documentation. I won't merge a PR without it!**
6. Make a pull request from your new branch
7. Wait, I am usually pretty fast to merge PRs :)

Thanks a lot to all the previous [contributors](https://github.com/i18next/i18next-parser/graphs/contributors).

## Setup

```
git clone git@github.com:<your-username>/i18next-parser.git
cd i18next-parser
yarn
```

## Tests

Make sure the tests pass:

```
mocha --require babel-register --require babel-polyfill test/**/*.js
```
