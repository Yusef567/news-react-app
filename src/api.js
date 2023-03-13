import axios from "axios";

const myApi = axios.create({
  baseURL: "https://backend-project-5gjj.onrender.com/api",
});

export const getAllArticles = (page) => {
  return myApi
    .get("/articles", {
      params: {
        page,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((error) => {
      console.log(error, "<----- error");
      return error;
    });
};
