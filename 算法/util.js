// 将当前目录下的文件结构化
function readDirSync(path) {
    return fs.readdirSync(path).map((ele, index) => {
        const itemPath = `${path}/${ele}`;
        const info = fs.statSync(itemPath);
        if (info.isDirectory()) {
            console.log(itemPath)
            const children = readDirSync(itemPath);
            return {
                path: ele,
                isDirectory: true,
                children: children
            }
        } else {
            const txt = fs.readFileSync(itemPath);
            return {
                path: ele,
                isDirectory: false,
                content: txt
            }
        }
    })
}

// 从结构化数据创建文件
function createFile(obj) {
    const { path, data } = obj;
    console.log(`-------------------创建文件: ${path}-------------------`);
    const txt = Buffer.from(data).toString();
    fs.writeFileSync(path, txt);
    console.log(`写入成功: ${path}`);
}

// 将结构化的文件及目录还原
function restoreFiles() {
    const data = JSON.parse(fs.readFileSync('a.json').toString());
    data.forEach(item => {
        const itemPath = item.path
        if (!['.DS_Store', '.vscode'].includes(itemPath)) {
            if (item.isDirectory) {
                if (!fs.existsSync(itemPath)) {
                    fs.mkdir(itemPath, { recursive: true }, function (err, path) {
                        if (!err) {
                            item.children.forEach(f => {
                                const { path, content } = f;
                                createFile({ path: `${itemPath}/${path}`, data: content.data });
                            })
                        }
                    })
                } else {
                    item.children.forEach(f => {
                        const { path, content } = f;
                        createFile({ path: `${itemPath}/${path}`, data: content.data });
                    })
                }
            } else {
                const { path, content } = item;
                createFile({ path, data: content.data });
            }
        }
    });
}

module.exports = {
    readDirSync,
    restoreFiles
}