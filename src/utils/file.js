export default class {
  /* global cordova */

  static save (blob, filename) {
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
      console.log('Access to the directory granted succesfully')
      dir.getFile(filename, {create: true}, function (file) {
        console.log('File created succesfully.')
        file.createWriter(function (fileWriter) {
          console.log('Writing content to file')
          fileWriter.write(blob)
        }, function () {
          alert('Unable to save file in path ' + file)
        })
      })
    })
  }
  static open (filename) {
    cordova.plugins.fileOpener2.open(
      `${cordova.file.externalRootDirectory}/${filename}`,
      'application/pdf',
      {
        error: function (e) {
          console.log('Error status: ' + e.status + ' - Error message: ' + e.message)
        },
        success: function () {
          console.log('file opened successfully')
        }
      }
    )
  }
}
