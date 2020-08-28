import fs from 'fs';
import path from 'path';
import through from 'through2';
import PluginError from 'plugin-error';

const PLUGIN_NAME = 'gulp-source-injector';

const inject = () => {
  return through.obj((file, _, callback) => {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    const regex = /(?:<!--|\/\*)\s*?inject:\s*?([^\s].+?)\s*?(?:-->|\*\/)/gi;

    const newFileContents = String(file.contents).replace(
      regex,
      (_match, src) => {
        const sourcePath = src.startsWith('/')
          ? path.join(process.cwd(), src)
          : path.join(file.dirname, src);
        return String(fs.readFileSync(sourcePath))
      }
    );

    file.contents = Buffer.from(newFileContents);
    callback(null, file);
  })
};

var gulpInjectInline = inject;

export default gulpInjectInline;
