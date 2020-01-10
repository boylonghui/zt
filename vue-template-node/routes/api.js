var express = require('express');
var router = express.Router();
var fs = require('fs');
var Formidable = require('formidable')
const handleUploadImages = (req, res) => {
    let form = new Formidable();
    form.uploadDir = './public/images/'
    form.parse(req, (err, fields, files) => {
        let file = files.image;
        let types = file.name.split('.')
        let suffix = types[types.length - 1]
        let fileName = new Date().getTime() + '.' + suffix;
        fs.renameSync(file.path, './public/images/' + fileName)
        res.send('http://localhost:3000/images/' + fileName)
    })
}

const handlePageData = (req, res, pageData) => {
    let vnodeList = JSON.parse(pageData.vnodeList);
    let dom = '';
    let modules = '';
    let moduleList = [];
    let component = '';
    vnodeList.forEach(vnode => {
        if (vnode.tag) {
            dom += `<${vnode.tag} style="${vnode.style}" />\n`;
            JSON.stringify(moduleList).indexOf(`${vnode.tag}`) === -1 && moduleList.push(vnode);
        }
    })
    moduleList.forEach((vnode, index) => {
        modules += `import ${vnode.component} from '@act-block/${vnode.tag}.vue';\n`;
        if (index === moduleList.length - 1) {
            component = component + `${vnode.component}`;
        } else {
            component += `${vnode.component}, \n`
        }
    })
    fs.readFile('./template/src/pages/page-template.vue', 'utf8', (err, data) => {
        let result = data.replace("{{modules}}", modules);
        result = result.replace("{{dom}}", dom);
        result = result.replace("{{component}}", component);
        fs.writeFile('./template/src/pages/home.vue', result, 'utf8', err => {
            if (err) {
                console.log(err);
            }
        })
    })
    res.send("post~~~")
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
    let body = JSON.stringify(req.body);
    if (body === '{}') {
        handleUploadImages(req, res);
        return;
    }

    handlePageData(req, res, req.body);
})

module.exports = router;