export const PostData = async (type, userData, token) => {
  let BaseUrl = "http://localhost:80/";
  try {
    const response = await fetch(BaseUrl + type, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    const data = await response.json();
    if (data.status === 401) {
      sessionStorage.setItem("token", "");
      sessionStorage.clear();
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
