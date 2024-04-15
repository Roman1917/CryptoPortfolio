const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "C1uRG+CL2u6zWSPaYMFyMFD38+rLoYU/U0s/4UAJb2c=",
  },
};
export function fakeFetchCrypto() {
  return new Promise((resolve, reject) => {
    fetch("https://openapiv1.coinstats.app/coins?limit=100", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data.result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
