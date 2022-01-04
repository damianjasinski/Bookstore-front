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
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
