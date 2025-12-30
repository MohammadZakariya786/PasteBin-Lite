// for development and testing 
export function now(req) {
  console.log("TEST_MODE:", process.env.TEST_MODE);
  console.log("x-test-now-ms:", req.headers["x-test-now-ms"]);

  if (process.env.TEST_MODE === "1") {
    const header = req.headers["x-test-now-ms"];
    if (header !== undefined) {
      const ms = Number(header);
      if (Number.isFinite(ms) && ms > 0) {
        return new Date(ms);
      }
    }
  }

  return new Date();
}




// for production 

// export function now(req) {
//   if (process.env.TEST_MODE === "1") {
//     const header = req.headers["x-test-now-ms"];
//     if (header !== undefined) {
//       const ms = Number(header);
//       if (Number.isFinite(ms) && ms > 0) {
//         return new Date(ms);
//       }
//     }
//   }
//   return new Date();
// }
