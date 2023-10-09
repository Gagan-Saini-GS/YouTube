function changeNumberStrIntoString(str) {
  str = parseInt(str, 10);

  if (str >= 1000000000) return (str / 1000000000).toFixed(1) + "B";
  else if (str >= 1000000) return (str / 1000000).toFixed(1) + "M";
  else if (str >= 1000) return (str / 1000).toFixed(1) + "K";
  else return str.toString();
}

export default changeNumberStrIntoString;
