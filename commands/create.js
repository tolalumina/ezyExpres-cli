const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = async function create(projectName) {
  try {

    // Ask user about TypeScript
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useTS',
        message: 'Use TypeScript?',
        default: false
      }
    ]);

    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.log(chalk.red('Project already exists!'));
      return;
    }

    // Create folders
    await fs.mkdir(projectPath);
    const folders = ['controllers', 'models', 'routes', 'middlewares', 'services', 'config', 'utils'];
    for (const folder of folders) {
      await fs.mkdir(path.join(projectPath, folder));
    }

    // Create server file from template
    const templateFile = path.join(__dirname, '../templates/js/server.js');
    const serverFile = path.join(projectPath, 'server.js');
    await fs.copy(templateFile, serverFile);

    console.log(chalk.cyanBright(`Project ${projectName} created successfully!`));
    if (answers.useTS) {
      console.log(chalk.yellow('Remember to rename files and configure TypeScript manually.'));
    }
  } catch (err) {
    console.error(chalk.red(err));
  }
};