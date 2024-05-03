# clark-fp
Introducing our lightweight library designed to enhance code reliability using functional programming techniques. Built to empower developers, it introduces features like either, option, tag, and match. Simplify error handling and promote predictability in your code with ease.

![clark-fp](https://github.com/gideaoms/clark-fp/assets/6031121/9329a915-7d8e-4595-9df8-b94aa0578daf)

## Install
```cmd
npm install clark-fp
```

## Examples

### Either
```ts
import { either } from "clark-fp";

function readFile(path: string) {
  try {
    const result = // ...read file here
    return either.Ok(result);
  } catch (err) {
    return either.Err(err);
  }
}

const result = readFile("file.txt");
if (either.isLeft(result)) {
  console.log(`Error: ${result.value.message}`);
} else {
  console.log(result);
}
```

### Option
```ts
import { option } from "clark-fp";

function readFile(path: string) {
  try {
    const result = // ...read file here
    return option.some(result)
  } catch (err) {
    return option.none
  }
}

const result = readFile("./file.txt");
if (option.isNone(result)) {
  console.log(`Error: file not found`);
} else {
  console.log(result);
}
```

### Match
This function was inspired by [ts-pattern](https://github.com/gvergnaud/ts-pattern), the difference is that this library is simpler in terms of pattern matching and you can return a value directly instead of having to create a arrow function
```ts
import { match } from "clark-fp";

const status = "active" as "active" | "inactive";

const result = match(status)
  .when("active", "You are active")
  .when("inactive", (status) => `You are not ${status}`)
  .exhaustive();

console.log({ result });
```

### Tag
```ts
import { tag, either } from "clark-fp";

function readFile(path: string) {
  try {
    const result = // ...read file here
    return either.Ok(result);
  } catch (err) {
    return either.Err(err);
  }
}

const path = "file.txt";
const result = await readFile(path);
const msg = tag(result, {
  Ok: "The file was read successfully",
  Err: (err) => err.message,
});

console.log({ msg });
```
