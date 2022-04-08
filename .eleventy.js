module.exports = function(config) {
  config.addPassthroughCopy('src/styles/');
  config.addPassthroughCopy('src/fonts/');
  config.addPassthroughCopy('src/scripts/');
  config.addPassthroughCopy('src/images/**/*.{jpg,gif,png}');
  config.addPassthroughCopy('src/videos/**/*.{mp4,mv}');
  return {
    dir: {
      input: "src",
      includes: "includes",
      layouts: "layouts",
      data: "data",
      output: "dist"
    }
  }
}
