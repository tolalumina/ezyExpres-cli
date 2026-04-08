#!/usr/bin/env node


const { program } = require("commander");
const createCommand = require("../commands/create");
const chalk = require("chalk");

program
  .name("ezx") // updated CLI name
  .description("EzyExpres CLI - Fast & Simple Express.js Project Generator")
  .version("1.0.0");

program
  .command("create <projectName>") // FIXED (removed @ezypress)
  .description("Create a new Express.js project")
  .action((projectName) => {
    createCommand(projectName);
  });

program.parse(process.argv);