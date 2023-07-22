"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const path = require("path");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const cors = require("cors");
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const whitelist = [`http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`];
const corsOptions = {
    origin(requestOrigin, callback) {
        if (whitelist.includes(requestOrigin !== null && requestOrigin !== void 0 ? requestOrigin : "")) {
            callback(null, requestOrigin);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use(cors(corsOptions));
app.get("/(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});
app.listen(PORT, () => {
    console.log(`App is listening in on http://localhost:${PORT} `);
});
