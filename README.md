# waitFor

The `waitFor` function is a utility function that waits for a promise to resolve and retries until the assertion passes. It uses the `async-retry` library to retry the promise if it fails.

## Parameters

- `promise`: A function that returns a promise. This is the promise that `waitFor` will wait for and retry if it fails.
- `options`: An optional object that can contain the following properties:
  - `retries`: The number of times to retry the promise. Default is 5.
  - `randomize`: A boolean that determines whether the retries should be randomized. Default is false.
  - `minTimeout`: The minimum timeout in milliseconds between retries. Default is 1000.

## Return Value

The `waitFor` function returns an object with the following methods:

- `toHave(prop, value)`: Waits for the promise to resolve and checks if the resolved value has a property `prop` with a value of `value`. If the assertion fails, the promise is retried.
- `toNotHave(prop, value)`: Waits for the promise to resolve and checks if the resolved value does not have a property `prop` with a value of `value`. If the assertion fails, the promise is retried.
- `toDeepEqual(value)`: Waits for the promise to resolve and checks if the resolved value deeply equals `value`. If the assertion fails, the promise is retried.

## Example Usage

```javascript
const request = () => getTodo(1);
await waitFor(request).toHave("userId", 1);
```

# waitForTodo Function Documentation

The `waitForTodo` function is a utility function that waits for a `getTodo` promise to resolve and retries until the assertion passes. It uses the `waitFor` function to wait for and retry the `getTodo` promise.

## Parameters

- `id`: The ID of the todo item to fetch.

## Return Value

The `waitForTodo` function returns the result of the `waitFor` function.

## Example Usage

```javascript
await waitForTodo(1).toHave("userId", 1);
```

# getTodo Function Documentation

The `getTodo` function is an asynchronous function that fetches a todo item from the `https://jsonplaceholder.typicode.com/todos/{id}` API endpoint.

## Parameters

- `id`: The ID of the todo item to fetch.

## Return Value

The `getTodo` function returns the data of the fetched todo item.

## Example Usage

```javascript
const todo = await getTodo(1);
```
