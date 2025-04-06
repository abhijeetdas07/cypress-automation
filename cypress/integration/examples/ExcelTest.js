const ExcelJS = require('exceljs')

async function writeExcelTest(filepath, change, searchText, updateText) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filepath)

    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText)

    const cell = worksheet.getCell(output.row, output.column + change.columnChange)
    cell.value = updateText
    await workbook.xlsx.writeFile(filepath)
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

writeExcelTest("C:/Users/Abhijeet Das/Downloads/excelDownloadTest.xlsx", {rowChange:0, columnChange:2}, "Banana", 350)


