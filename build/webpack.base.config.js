const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
//const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const dropdown = 'item-quantity-dropdown';
//const datepicker = 'datepicker';
//const slider = 'slider';
//const core = 'core';

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: `${PATHS.src}/js/entry.js`,
    },
    output: {
        filename: `./js/bundle.js`,
        path: PATHS.dist,
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(pug|data.pug)$/,
                loader: "pug-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(sass|scss)$/,
                exclude: "/node_modules/",
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            sourceMap: true,
                            plugins: () => [
                                require("autoprefixer"),
                                require("css-mqpacker"),
                                require("cssnano")({
                                    preset: [
                                        "default",
                                        {
                                            discardComments: {
                                                removeAll: true
                                            }
                                        }
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            '~': PATHS.src,
            datepicker : path.resolve(__dirname, '../node_modules/air-datepicker/dist/'),
            slider : path.resolve(__dirname, '../node_modules/jquery-ui/themes/base/'),
            dropdown : path.resolve(__dirname, '../node_modules/item-quantity-dropdown/lib'),
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `./css/style.css`,
            //filename: `${dropdown}.min.css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img` },
            { from: `${PATHS.src}/fonts`, to: `${PATHS.dist}/fonts` },
        ]),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        })),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })

    ]
};

