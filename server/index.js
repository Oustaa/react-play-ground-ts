const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

console.log(process.pid);

const PORT = 8000;

const app = express();

const dataCount = 3e4;

app.use(cors());

app.get("/infinit-scrolling", (req, res) => {
  let { page, limit } = req.query;

  page = Number(page);
  limit = limit ? Number(limit) : 100;

  const offset = limit * (page - 1);

  const users = [];

  if (offset < dataCount) {
    for (let i = 0; i < 1e9; i++) {}

    for (let i = offset; i < offset + limit; i++) {
      users.push({
        id: i + 1,
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        img_url: faker.image.avatar(),
      });
    }
  }

  res.status(200).json({
    data: users,
    meta: {
      page: page,
      limit: limit,
      total: dataCount,
      pages: Math.ceil(dataCount / limit),
    },
  });
});

app.listen(8000, () => {
  console.log("server is started in port %s", PORT);
});

