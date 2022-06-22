import * as express from 'express'
import { Request, Response} from "express"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello everyone')
})

app.listen(3000)

// postgres
// example
// sudo docker-compose -f stack.yml up
