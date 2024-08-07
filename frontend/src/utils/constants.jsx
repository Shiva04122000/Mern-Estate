export const pageRoutes = [
  {
    id: 1,
    navigate: "/",
    routeName: "Home",
  },
  {
    id: 2,
    navigate: "/about",
    routeName: "About",
  },
  // {
  //   id: 3,
  //   navigate: "/sign-in",
  //   routeName: "Sign In",
  // },
];

export function addCommas(num) {
  let numString = num.toString();
  if (numString.length > 3) {
    let last3 = numString.slice(-3);
    let mid = numString.slice(-5, -3);
    let rest = numString.slice(0, numString.length - 5);
    return `${
      numString.length > 4 && rest ? `${rest},` : ""
    }${`${mid},`}${last3}`;
  } else {
    return num;
  }
}
