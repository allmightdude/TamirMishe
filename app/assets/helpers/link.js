/**
 * Is Full Link
 * **************************/
export const isFull = (url) => {
  const value = url || "";

  if (value.toLowerCase().indexOf("http") === 0) {
    return true;
  }

  if (value.match(/callto:|tel:|mailto:/g)) {
    return true;
  }

  return false;
};

/**
 * Full url Link
 * **************************/
export const fullUrl = (url) => {
  return isFull(url) ? url : process.env.WEBAPP_URL + url;
};
