var path = require('path');
function VendorChunkPlugin(options) {
	//TODO check arguments
	this.regexp = options.regexp;
}

module.exports = VendorChunkPlugin;

VendorChunkPlugin.prototype.apply = function(compiler) {
	var regexp = this.regexp;
	var context = compiler.options.context;
	compiler.plugin("this-compilation", function(compilation) {
			compilation.plugin(["optimize-chunks"], function(chunks) {

				//TODO support multiple chunks
				var vendorChunk = this.addChunk('vendor');

				var mainChunk = chunks[0];
				vendorChunk.addParent(mainChunk);
				mainChunk.addChunk(vendorChunk);
				var allResources = chunks.map(chunk => {
					return chunk.modules.map(module => module.resource)
				})[0];

				var vendorModules = [];
				mainChunk.modules.forEach(module => {
					var repativePathToModule = path.relative(context, module.resource);
					if (repativePathToModule.match(regexp)) {
						vendorModules.push(module);
					}

				});
				vendorModules.forEach(module => {
					module.removeChunk(mainChunk);
					vendorChunk.addModule(module);
					module.addChunk(vendorChunk);
				});
				console.log(mainChunk.modules.map(module => module.resource))
				console.log(vendorChunk.modules.map(module => module.resource))

				return true;
			});
		}
	)
	;
}
;