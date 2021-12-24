const webpack = require('webpack')
const {join} = require('path')
const {createFsFromVolume, Volume} = require('memfs')

module.exports = function (content, map, meta) {
  const callback = this.async()
  const config = require(this.resource)
  const fs = createFsFromVolume(new Volume())
  const outputPath = __dirname
  const outputFile = 'output'
  const compiler = webpack({
    ...config,
    output: {
      filename: outputFile,
      path: outputPath
    }
  })
  compiler.outputFileSystem = fs
  compiler.run((err, stats) => {
    if (err) return callback(err, content, map, meta)
    if (stats.hasErrors()) return callback(stats.compilation.errors, content, map, meta)
    this.clearDependencies()
    stats.compilation.fileDependencies.forEach(file => this.addDependency(file))
    callback(null, fs.readFileSync(join(outputPath, outputFile)), map, meta)
  })
}
