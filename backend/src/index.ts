import express from 'express';
import { PrismaClient } from '@prisma/client';
import {z} from "zod";
const prisma = new PrismaClient;
const app  = express();
const port = 3000;

app.use(express.json());

const signupBody = z.object({
    userName: z.string().email(),
    passwword: z.string(),
    firstName: z.string(),
    lastName: z.string()
})
app.post('/signup', async (req, res)=>{
    const success = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await prisma.users.create({
        data:{
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstName,
            lastname: req.body.lastName
        }
    })

    res.json({
        message:"user created successfully"
    })
})

 app.post('/todo', async (req, res)=>{
        const todo  = await prisma.todo.create({
            data:{
                title: req.body.title,
                description: req.body.description,
                user_id: req.body.user_id
            }
        })
        res.json({
            message:"todo added"
        })

    })

    app.get('/fetch', async (req, res)=>{
        const ftodo = await prisma.todo.findMany({
            where:{
                user_id: req.body.user_id
            }
        });



        res.json({
            message:ftodo
        })
    })




app.listen(port);


