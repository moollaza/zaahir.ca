module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production"
      ? require("@fullhuman/postcss-purgecss")({
          content: ["./src/**/*.html", "./src/**/*.vue"]
        })
      : "",
    require("cssnano")({
      preset: "default"
    })
  ]
};
