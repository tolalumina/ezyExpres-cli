#!/usr/bin/env node

/* ============================================================================
   INSTALLATION
   ============================================================================

   To use this CLI tool globally:
   
   1. Link locally (for development):
      npm link
      
   2. Or install globally:
      npm install -g .
      
   3. Then run from anywhere:
      ezyexpres create express -o myproject
      ezyexpres list
      
   Usage without global install:
      node index.js create express -o myproject
      node index.js list

   ============================================================================ */

/* ============================================================================
   IMPORTS
   ============================================================================ */

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');


/* ============================================================================
   CONSTANTS
   ============================================================================ */

const DEFAULT_PACKAGES = ['express', 'mysql2', 'nodemon'];

const FOLDER_STRUCTURES = {
  express: ['config', 'controllers', 'models', 'routes', 'services', 'middleware', 'utils', 'tests'],
  mvc: ['models', 'views', 'controllers', 'public', 'config'],
  api: ['routes', 'controllers', 'services', 'models', 'middleware', 'utils', 'config'],
  lib: ['src', 'lib', 'tests', 'docs'],
  fullstack: ['client', 'server', 'shared', 'docs'],
  react: ['src/components', 'src/pages', 'src/hooks', 'src/utils', 'src/styles', 'public'],
  vue: ['src/components', 'src/views', 'src/store', 'src/router', 'src/utils', 'public'],
  basic: ['src', 'dist', 'docs']
};

const AUTO_INSTALL_STRUCTURES = ['express', 'api', 'mvc'];

const program = new Command();

/* ============================================================================
   PACKAGE OPERATIONS
   ============================================================================ */

/**
 * Initialize npm and install packages in the target directory
 */
function installPackages(basePath, packages = DEFAULT_PACKAGES) {
  console.log(`\nInstalling packages: ${packages.join(', ')}...`);
  try {
    if (!fs.existsSync(path.join(basePath, 'package.json'))) {
      execSync('npm init -y', { cwd: basePath, stdio: 'inherit' });
    }
    const pkgString = packages.join(' ');
    execSync(`npm install ${pkgString}`, { cwd: basePath, stdio: 'inherit' });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


/* ============================================================================
   USER INTERACTIONS
   ============================================================================ */

/**
 * Prompt user to select a folder structure from available options
 */
async function promptForStructure() {
  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'structure',
    message: 'Choose a folder structure:',
    choices: Object.keys(FOLDER_STRUCTURES).map(key => ({
      value: key,
      name: `${key} (${FOLDER_STRUCTURES[key].join(', ')})`
    }))
  }]);
  return answers.structure;
}

/**
 * Prompt user to confirm package installation
 */
async function promptForInstall() {
  const answers = await inquirer.prompt([{
    type: 'confirm',
    name: 'install',
    message: `Install ${DEFAULT_PACKAGES.join(', ')}?`,
    default: true
  }]);
  return answers.install;
}

/**
 * Prompt user for custom folder names
 */
async function promptForCustomFolders() {
  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'folders',
    message: 'Enter folder names (comma-separated):',
    validate: (value) => value.trim().length > 0 || 'Please enter at least one folder name'
  }]);
  return answers.folders.split(',').map(f => f.trim()).filter(f => f);
}


/* ============================================================================
   FOLDER OPERATIONS
   ============================================================================ */

/**
 * Create folders recursively and return status for each
 */
function createFolders(basePath, folders) {
  const results = [];
  for (const folder of folders) {
    const fullPath = path.join(basePath, folder);
    try {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        results.push({ folder, status: 'created' });
      } else {
        results.push({ folder, status: 'exists' });
      }
    } catch (error) {
      results.push({ folder, status: 'error', error: error.message });
    }
  }
  return results;
}

/**
 * Print folder creation results with color-coded status
 */
function printResults(results) {
  console.log('\nFolder creation results:');
  console.log('-'.repeat(40));
  for (const { folder, status, error } of results) {
    const icon = status === 'created' ? '✓' : status === 'exists' ? '○' : '✗';
    const color = status === 'created' ? '\x1b[32m' : status === 'exists' ? '\x1b[33m' : '\x1b[31m';
    const reset = '\x1b[0m';
    console.log(`${color}${icon}${reset} ${folder}${error ? ` (${error})` : ''}`);
  }
  console.log('-'.repeat(40));
}

/* ============================================================================
   CLI SETUP
   ============================================================================ */

program
  .name('ezyExpres')
  .description('CLI tool for creating folder structures and installing packages')
  .version('1.0.0');


/* ============================================================================
   CLI COMMANDS
   ============================================================================ */

program
  .command('create [structure]')
  .description('Create a predefined folder structure')
  .option('-o, --output <path>', 'Output directory', '.')
  .option('-i, --install', 'Install express, mysql2, and nodemon')
  .action(async (structure, options) => {
    const selectedStructure = structure && FOLDER_STRUCTURES[structure]
      ? structure
      : await promptForStructure();

    const basePath = path.resolve(options.output);
    const folders = FOLDER_STRUCTURES[selectedStructure];

    console.log(`\nCreating ${selectedStructure} structure in ${basePath}...`);
    const results = createFolders(basePath, folders);
    printResults(results);

    const shouldInstall = options.install || (
      !options.install &&
      AUTO_INSTALL_STRUCTURES.includes(selectedStructure) &&
      await promptForInstall()
    );

    if (shouldInstall) {
      const result = installPackages(basePath);
      if (!result.success) {
        console.log(`\n\x1b[31m✗ Package installation failed: ${result.error}\x1b[0m`);
      }
    }
  });

program
  .command('custom')
  .description('Create custom folder structure')
  .option('-o, --output <path>', 'Output directory', '.')
  .action(async (options) => {
    const folders = await promptForCustomFolders();
    const basePath = path.resolve(options.output);

    console.log(`\nCreating custom structure in ${basePath}...`);
    const results = createFolders(basePath, folders);
    printResults(results);
  });

program
  .command('list')
  .description('List available folder structures')
  .action(() => {
    console.log('\nAvailable structures:');
    for (const [name, folders] of Object.entries(FOLDER_STRUCTURES)) {
      console.log(`  ${name}: ${folders.join(', ')}`);
    }
  });


/* ============================================================================
   ENTRY POINT
   ============================================================================ */

if (process.argv.length === 2) {
  program.help();
}

program.parse();
