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
    });
};

export const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getComments = (article_id, page) => {
  return myApi
    .get(`/articles/${article_id}/comments`, {
      params: {
        page,
      },
    })
    .then(({ data }) => {
      return data.comments;
    });
};

export const patchArticle = (article_id, updatedVotes) => {
  return myApi
    .patch(`/articles/${article_id}`, updatedVotes)
    .then(({ data }) => {
      return data;
    });
};

export const postComment = (article_id, body, username) => {
  return myApi
    .post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data }) => {
      return data.comment;
    });
};

export const getUsers = () => {
  return myApi.get("/users").then(({ data }) => {
    return data.users;
  });
};
