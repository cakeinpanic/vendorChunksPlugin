'use strict';
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2016
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

var webpack = require('webpack');
var path = require('path');

var vendorChunksPlugin = require('./vendorChunks');

module.exports = {
	entry: './app.js',
	output: {
		path: '.tmp',
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js'
	},
	plugins: [new vendorChunksPlugin({regexp:/vendor/})]
};