# can-i-commit

This little module is useful for preventing annoying mistakes, like writing out your entire conventional commit to find out you forgot to stage changes, or committing on your master branch and getting an error on push.

- Checks if files are staged, if none, exits with error.
- Checks if user is trying to commit on a prohibited branch, If so, exits with error.

## Install

```bash
npm i @jonbilous/can-i-commit -g
```

## Configuration

```bash
can-i-commit init
```

## Usage

```bash
can-i-commit check && cz
```
