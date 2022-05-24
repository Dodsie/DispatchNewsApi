const { Pool } = require("pg");
const pool = new Pool({
  user: "bailey_dispatch",
  password: "labber",
  host: "localhost",
  database: "dispatch",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email, password } = request.body;

  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const getFavorite = (request, response) => {
  const id = parseInt(request.params.id);
  const search = [
    "author",
    "content",
    "description",
    "publishedAt",
    "source",
    "title",
    "url",
    "urlToImage",
  ];
  pool.query(
    `SELECT ${search} FROM articles JOIN users ON user_id = users.id WHERE user_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addFavorite = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(request.body);
  const { author, content, description, publishedAt, source, title, url, urlToImage } = request.body;
  const queryString = `INSERT INTO articles (author, content, description, publishedAt, source, title, url, urlToImage, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  console.log(queryString);
  pool.query(
    queryString,[author, content, description, publishedAt, source, title, url, urlToImage, id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log(results);
    }
  );
};

// const deleteFavorite = (request, response) => {
//   pool.query(``

//   )
// }

const deleteFavArticles = (request, response) => {
  const id = parseInt(request.params.id);
  const publishedat = (request.params.publishedat);
  console.log('userid', id);
  console.log('PA', publishedat);
  console.log('type article id',typeof publishedat);
  pool.query(
    `DELETE FROM articles WHERE articles.publishedat = $1 AND user_id = $2`,[publishedat, id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      response.status(200).send(results);
    }
  );
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  getFavorite,
  addFavorite,
  deleteFavArticles,
};