import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectionToDB from './config/dbConnection.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import { config } from 'dotenv';
import { isLoggedIn } from './middlewares/authMiddleware.js';
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/v1/user", userRoutes); //User Routes
app.use("/v1/courses", courseRoutes)  //Courses Routes
app.use("/v1/payment", isLoggedIn, paymentRoutes) //Payment Routes
app.use('/v1', miscRoutes); //Misc Routes

app.all('*', (req,res)=>{
    res.status(404).send("Page not found")
})

app.use(errorMiddleware);

app.listen(port, async ()=>{
    await connectionToDB();
    console.log(`Server is running at http://localhost:${port}`);
})  