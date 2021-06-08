export const validateUrl = (url: string) => {
  const domain = url.split('://');

  let newUrl;
  if (!domain[1]) {
    newUrl = `https://${domain[0]}`;
  } else {
    newUrl = `https://${domain[1]}`;
  }

  return newUrl;
}