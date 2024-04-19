# clark-fp
Introducing our lightweight library designed to enhance code reliability using functional programming techniques. Built to empower developers, it introduces features like either, maybe, and match. Simplify error handling and promote predictability in your code with ease.

## Install
```cmd
npm install clark-fp
```

## Examples

### Either
```ts
import { either } from "clark-fp";

type User = {
  id: string;
  name: string;
};

function findUserById(userId: string) {
  if (!userId) {
    return either.left(new Error("User not found"));
  }
  const user: User = {
    id: "123",
    name: "John",
  };
  return either.right(user);
}

const user = findUserById("123");
if (either.isLeft(user)) {
  console.log(`Error: ${user.value.message}`);
} else {
  console.log(`Success: ${user.value.name}`);
}
```

### Maybe
```ts
import { maybe } from "clark-fp";

type User = {
  id: string;
  name: string;
};

function findUserById(userId: string) {
  if (!userId) {
    return maybe.none;
  }
  const user: User = {
    id: "123",
    name: "John",
  };
  return maybe.some(user);
}

const user = findUserById("123");
if (maybe.isNone(user)) {
  console.log(`Error: user is null`);
} else {
  console.log(`Success: ${user.value.name}`);
}
```

### Match
```ts
import { match } from "clark-fp";

const status = "active" as "active" | "inactive";

const result = match(status)
  .when("active", "You are active")
  .when("inactive", "You are not active")
  .exhaustive();
console.log({ result });
```

### Tag
```ts
import { tag } from "clark-fp";

type Banana = {
  _tag: "Banana";
};

type Orange<T> = {
  _tag: "Orange";
  value: T;
};

type Fruit<T> = Banana | Orange<T>;

const input = { _tag: "Orange", value: "It is a orange" } as Fruit<string>;
const result = tag(input, {
  Banana: () => "This is a banana",
  Orange: (v) => v,
});
console.log({ result });
```
