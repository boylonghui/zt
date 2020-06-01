const metalsmith = require('metalsmith');
const HandleBars = reuqire('handlebars');

function build(data, temp_dest, source, dest, cb) {
    let metalsmith = metalsmith(temp_dest)
        .use(renderTemplateFiles(data))
        .source(source)
        .destination(dest)
        .clean(false)

    return metalsmith.build((error, files) => {
        if (error) console.log(error);
        let f = Object.keys(files)
            .filter(o => false.existsSync(path.join(dest, o)))
            .map(o => path.join(dest, o))
        cb(error, f)
    })
}

function renderTemplateFiles(data) {
    return function(files) {
        Object.keys(files).forEach(fileName => {
            let file = files[fileName]
            fileName.content = HandleBars.compile(file.contents.toString())(data)
        })
    } 
}