const ErrorLoggerPlugin = require('error-logger-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CircularDependencyPlugin = require('circular-dependency-plugin');

const extractText = new ExtractTextPlugin({
    filename: './page-editor/styles/_all.css',
    allChunks: true,
    disable: false  //process.env.NODE_ENV === "development"
});

const detectCirculars = new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true
});

module.exports = {
    context: __dirname + '/src/main/resources/assets',
    entry: {
        'js/bundle': './js/main.ts',
        'page-editor/js/_all': './js/page-editor.ts',
        'page-editor/lib/_all': './page-editor/lib/_include.js',
        'page-editor/styles/styles': './page-editor/styles/_module.less'
    },
    output: {
        path: __dirname + '/build/resources/main/assets',
        filename: './[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.less', '.css']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.less$/,
                use: extractText.extract({
                    fallback: 'style-loader',
                    publicPath: '../../',
                    use: 'css-loader?importLoaders=1!less-loader'
                })
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: 'file-loader?name=img/[name].[ext]'
            },
        ]
    },
    plugins: [
        new ErrorLoggerPlugin(),
        extractText,
        detectCirculars
    ],
    devtool: 'source-map'
};
