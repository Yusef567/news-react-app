import axios from "axios";

const myApi = axios.create({
  baseURL: "https://backend-project-5gjj.onrender.com/api",
});

export const getAllArticles = (page, options = {}) => {
  return myApi
    .get("/articles", {
      params: {
        page,
        ...options,
      },
    })
    .then(({ data }) => {
      const { articles } = data;
      return articles;
    });
};

export const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then(({ data }) => {
    const { article } = data;
    return article;
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
      const { comments } = data;
      return comments;
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
      const { comment } = data;
      return comment;
    });
};

export const getUsers = () => {
  return myApi.get("/users").then(({ data }) => {
    const { users } = data;
    return users;
  });
};

export const getTopics = () => {
  return myApi.get("/topics").then(({ data }) => {
    const { topics } = data;
    return topics;
  });
};

export const deleteComment = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`).then((response) => {
    console.log(response);
  });
};
