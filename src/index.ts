import connectDB from "./connection/DBConnect"
import express, {Response, Request} from 'express';
import cors from 'cors'
import config from "./config/config";
const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// route
import authRoutes from "./modules/auth/auth.route";
import adminRoutes from "./modules/admin/admin.route";

app.use("/auth/v1", authRoutes);
app.use("/admin/v1", adminRoutes);

app.get('/', (_req: Request, res: Response) => {
  return res.send('Team Management System Connected')
})
 
app.listen(config.port, () => {
  console.log(`Team Management System listening on port ${config.port}`)
})
