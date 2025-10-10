const obj = {
  name: "Jeremy",
  age: 24,
  role: "Software Engineer",
};
function convertHashToArray(obj) {
  return Object.entries({ ...obj })
    .map((o) => o)
    .sort((a, b) => a[0].localeCompare(b[0]));
}
console.log(convertHashToArray(obj));
