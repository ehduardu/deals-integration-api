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

export const isValidDate = (dateString: string) => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}