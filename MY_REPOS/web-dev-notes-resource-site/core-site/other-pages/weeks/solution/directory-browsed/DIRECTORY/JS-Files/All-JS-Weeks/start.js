#!/usr/bin/env node
const nodemon = require('nodemon');
require('dotenv').config();
const { promises: fs } = require('fs');

async function start() {
    let fd;
    try {
        fd = await fs.open("nodemon.pid", "wx");
        fd.close();
    } catch (err) {
        console.error(
            "nodemon.pid already exists, check to make sure the server isn't already running."
        );
        process.exit();
    }

    nodemon({
        script: "./bin/www",
    });

    nodemon
        .on("log", async(log) => {
            console.log(`[${log.type}] ${log.colour}`);
        })
        .on("start", async () => {
            console.log("Nodemon started ./bin/www");
            await fs.writeFile("nodemon.pid", `${process.pid}`);
        })
        .on("quit", async () => {
            console.log("Nodemon shutting down");
            await fs.unlink("nodemon.pid");
            process.exit();
        });
}

start();

