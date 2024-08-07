// (async function () {
//   const resp = await fetch("http://localhost:7000/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       password,
//     }),
//   });
//   console.log(resp);
// })();

// (async function () {
//   const resp = await fetch("http://localhost:7000/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   });
//   console.log(resp);
// })();

export const sendRegisterData = async function (data) {
  const name = data.name;
  const email = data.email;
  const password = data.password;
  const access = data.access;

  const resp = await fetch("http://localhost:7000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      access,
    }),
  });
  console.log(resp);
};
