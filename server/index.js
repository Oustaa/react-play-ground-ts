require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");
const OpenAI = require("openai");

console.log(process.pid);

console.log(process.env.DEEPSEEK_API_KEY);

const openai = new OpenAI({
  baseURL: "https://chat.deepseek.com/",
  apiKey: process.env.DEEPSEEK_API_KEY || "",
});

const PORT = 8000;

const app = express();

const dataCount = 3e2;

app.use(cors());

app.get("/infinit-scrolling", (req, res) => {
  let { page, limit } = req.query;

  page = Number(page);
  limit = limit ? Number(limit) : 2;

  const offset = limit * (page - 1);

  const users = [];

  if (offset < dataCount) {
    // for (let i = 0; i < 1e9; i++) {}

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

// this is not working needs an api key, can't get it coz of their site under mantainance.
app.get("/open-ai", async (req, res) => {
  const { q } = req.query;
  try {
    await openai.chat.completions.create({
      message: [{ role: "system", content: q }],
      model: "deepseek-chat",
    });

    res.json({ q });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(8000, () => {
  console.log("server is started in port %s", PORT);
});

