const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(cors())

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public')
	},
	filename: (req, file, cb) => {
		// let fileName =  Date.now() + '-' + file.originalname
		fileName = "video.mp4"
		cb(null, fileName)
	}
})

const upload = multer({storage}).single('avatar')

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err) return res.status(500).json(err)
		return res.status(200).send(req.file)
	})
})

app.listen(8000, () => {
	console.log('server is running on port 8000')
})