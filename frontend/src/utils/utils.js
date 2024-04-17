export const convertArrayToBooleanMap = (arr) => {
  const obj = {};

  arr.forEach((data) => {
    obj[data] = true;
  });

  return obj;
};
