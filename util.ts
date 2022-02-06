// Remember that for promises, we don't have consecutive promises in  function, no two await below each other. We have to use Promise.all() to evaluate both the promises.

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Hello"), 1000);
  //   setTimeout(() => reject("Hello"), 1000);
});

promise.then((val) => console.log(val)).catch((err) => console.log(err));

async function fetch() {
  const data1 = await promise;
  const data2 = await promise;
  console.log(data1);
  return Promise.all([data1, data2]);
}

fetch();
