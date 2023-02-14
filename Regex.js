const fs = require('fs')

const path_files = '/media/andre/arquivos/temp/manifesto'

fs.readFile(`${path_files}/manifesto.lob`, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const files = data.match(/<nfeProc.*?>.*?<\/nfeProc>/gsi)

    for (let index = 0; index < files.length; index++) {
        const element = files[index]
        const xml = `<?xml version="1.0" encoding="UTF-8" ?>${element}`
        const name = getNameXML(element)

        createXML(xml, `Arquivo ${index} - ${name}`)
    }
});

const createXML = (xml, name) => {
    fs.writeFile(`${path_files}/out/${name}`, xml, err => {
        if (err) {
            console.error(err);
        }
    });
}

const getNameXML = (xml) => {
    const xmlTag = xml.match(/<infNFe.+?Id=\".+?\">/gi)
    const xmlName = xmlTag[0].match(/Id=\".*?\"/gi)

    const nameFull = xmlName[0].replaceAll('Id="NFe', '').replaceAll('"', '') + '.xml'
    return nameFull
}
