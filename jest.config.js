const path = require('path');

module.exports = {
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": path.join(__dirname, '/__mocks__/fileMock.js'),
    "\\.(css|less)$": path.join(__dirname, '/__mocks__/styleMock.js'),
  },
  setupFiles: [
    "raf/polyfill",
    path.join(__dirname, '/src/tests/setupTests.js')
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ]
};