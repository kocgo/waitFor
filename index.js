import retry from "async-retry";
import { expect } from "chai";
import axios from "axios";

/** 
  @description Waits for a promise to resolve and retries until the assertion passes.

  @param {Function} promise
  @param {Object} options
  @param {Number} options.retries
  @param {Boolean} options.randomize
  @param {Number} options.minTimeout

  @example 
  const request = () => getTodo(1);
  await waitFor(request).toHave("userId", 1);
*/

function waitFor(
  promise,
  options = {
    retries: 5,
    randomize: false,
    minTimeout: 1000,
  }
) {
  return {
    toHave: async (prop, value) => {
      return retry(async () => {
        expect(await promise()).to.have.property(prop, value);
      }, options);
    },

    toNotHave: async (prop, value) => {
      return retry(async () => {
        expect(await promise()).to.not.have.property(prop, value);
      }, options);
    },

    toDeepEqual: async (value) => {
      return retry(async () => {
        expect(await promise()).to.deep.equal(value);
      }, options);
    },
  };
}

function waitForTodo(id) {
  return waitFor(() => getTodo(id));
}

async function getTodo(id) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  console.log("Product fetched", res.data);
  return res.data;
}

// Tests

// This should pass
(async () => {
  const request = () => getTodo(1);

  await waitFor(request).toHave("userId", 1);
})();

// This should pass
(async () => {
  await waitForTodo(1).toHave("userId", 1);
})();

// This should fail
// AssertionError: expected { userId: 1, id: 1, …(2) } to have property 'userId' of 2, but got 1
(async () => {
  await waitForTodo(1)
    .toHave("userId", 2)
    .catch((err) => {
      console.error(err);
    });
})();

// This should pass
(async () => {
  await waitForTodo(1).toDeepEqual({
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  });
})();
