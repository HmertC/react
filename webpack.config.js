const path = require("path");


module.exports = {
    mode : "development",
    entry :'./src/index.tsx',
  output: {
    path: path.join(__dirname, "public"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  devServer: {
    port: 8080,
     // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
          options : {
            presets : ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript']
          }
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { 
        test: /\.(ts|tsx)$/, 
        loader: "ts-loader" 
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  resolve : {
    extensions : [".js",".jsx", ".json", ".tsx",'.ts'],
  },
};






// const path = require('path');

// module.exports = {
//   entry: './src/index.tsx',
//  devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };