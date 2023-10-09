const change = (curr, publish, number) => {
  const x = curr - publish;
  return x < 0 ? x + number : x;
};

const publishedYear = (year) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  // Month it return according to zero base indexing
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();

  const publishedYear = parseInt(year.slice(0, 4));
  const publishedMonth = parseInt(year.slice(5, 7));
  const publishedDate = parseInt(year.slice(8, 10));
  let ans = "9 Dec 2002";

  if (publishedYear === currentYear) {
    if (publishedMonth === currentMonth) {
      const temp = change(currentDate, publishedDate, 30);
      ans = temp + " days ago";
    } else {
      ans = currentMonth - publishedMonth + " months ago";
    }
  } else {
    ans = currentYear - publishedYear + " years ago";
  }

  return ans;
};

export default publishedYear;
