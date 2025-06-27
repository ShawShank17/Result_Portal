import dotenv from 'dotenv';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';
import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

import { app } from './app.js';

dotenv.config({
    path: './.env'
});

app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on PORT: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("error");
})