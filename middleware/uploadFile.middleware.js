const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, res, callback) {
        const location = 'images'
        callback(null, location)
    },
    filename: function (req, file, callback) {
        const fileName = file.fieldname + Date.now() + path.extname(file.originalname)
        callback(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200000000000
    },
    fileFilter: function (req, file, callback) {
        const extensions = ['.png', '.jpg', '.jpeg', '.gif']

        const ext = path.extname(file.originalname)

        if (!extensions.includes(ext))
            return callback(new Error('Invalid extension'), null)
        callback(null, true)
    }
})

module.exports = upload