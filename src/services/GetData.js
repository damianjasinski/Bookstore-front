export const GetData = async (type, token) => {
  let BaseUrl = "http://localhost:80/";
  const response = await fetch(BaseUrl + type, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    }
  });
  const data = await response.json();
  if (data.status === 401) {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
  }
  return await data;
};
