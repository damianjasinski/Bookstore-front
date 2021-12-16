export const PostData = async (type, userData) => {
  let BaseUrl = "http://localhost:80/";
  try {
    const response = await fetch(BaseUrl + type, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
