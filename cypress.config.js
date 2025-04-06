const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const ExcelJS = require('exceljs')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {

  config.db = {
    userName: "azure",
    password: "Azure!10",
    server: "rsadbdemo2.database.window.net",
    options: {
      database: "rahulshettyacademy",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  }
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  on('task',{
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
    });
    return result;
    }
  })

  on('task',{
    async writeExcelTest({filepath, change, searchText, updateText}) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filepath)
  
      const worksheet = workbook.getWorksheet('Sheet1')
      const output = await readExcel(worksheet, searchText)
  
      const cell = worksheet.getCell(output.row, output.column + change.columnChange)
      cell.value = updateText
      return workbook.xlsx.writeFile(filepath).then(() =>{
        return true
      }).catch(() =>{
        return false
      })
  }
  })

  // implement node event listeners here
  allureWriter(on, config);
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  require('cypress-mochawesome-reporter/plugin')(on);
  return config;
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 }
  worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, columnNumber) => {
          // console.log(cell.value)
          if (cell.value == searchText) {
              // console.log(rowNumber)
              // console.log(columnNumber)
              output.row = rowNumber
              output.column = columnNumber
          }
      })
  })
  return output
}

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 30000,
  reporter: 'cypress-mochawesome-reporter',
  env: {
    url: 'https://rahulshettyacademy.com',
    allureReuseAfterSpec: true,
    allureResultsPath: "allure-results",
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },

  projectId: "qsra7a",
  e2e: {
    setupNodeEvents,
    // specPattern: 'cypress/integration/examples/BDD/*.feature'
    // specPattern: 'cypress/integration/examples/TestFrameWork1.js'
    specPattern: 'cypress/integration/examples/*.js'
    // specPattern: 'cypress/integration/greenkart/*.js'
  },
});
