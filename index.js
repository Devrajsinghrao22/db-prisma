const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080 ;

app.use(express.json());

app.post('/user', async (req, res) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          name : req.body.name,
          email : req.body.email
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to create user.' });
    }
  });

app.get('/user', async(req,res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
      }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
})

app.get('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id }
        });
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put('/user/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.update({
            where: { id },
            data: {
                name: req.body.name,
                email: req.body.email
            }
        });
        res.json(user);
       
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
})

app.delete('/user/:id', async(req, res) => {
    try{
        const id = await parseint(req.params.id);
        const user = await prisma.user.delete({
        where: {id}
    })
    }
    catch(err){
        res.json({message: err.message})
    }
})
 
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));