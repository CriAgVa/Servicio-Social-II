import writeXlsxFile from 'write-excel-file'

// When passing `data` for each cell.
await writeXlsxFile(data, {
  columns, // optional
  fileName: 'Prueba.xlsx'
})

// When passing `objects` and `schema`.
await writeXlsxFile(objects, {
  schema,
  fileName: 'Prueba.xlsx'
})

