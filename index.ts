import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import routes from './routes';
import { appConfig } from './config/app';
import swaggerDocs from "./swagger";
import { createDatabase, sequelize } from './config/database';

const app: Express = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", routes)

app.set("view engine", "hbs")
app.set("views", "./views")
app.get("/", (req: Request, res: Response) => res.render("welcome"))

swaggerDocs(app)

createDatabase()
.then(() => {
    sequelize.sync()
        .then(res => console.log("[database] Database connected"))
        .catch(error => console.error("[database] Error : ", error))
})
.catch(err => console.error("[database] Error : ", err))


app.listen(appConfig.port, () => console.log(`[server] Server run on ${appConfig.host}:${appConfig.port}`))