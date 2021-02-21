const express = require('express')
const app = express()
const port = '8888'
const { ROLE, users } = require('./data')
const projectRouter = require('./route/projects')
const usersRouter = require('./route/users')
const enterprisesRouter = require('./route/enterprises')
// const { authUser, authRole } = require('./basicAuth')

app.use(express.json())
app.use(setUser)
app.use('/users', usersRouter) // ««««« OK
app.use('/enterprises', enterprisesRouter) // ««««« OK
app.use('/projects', projectRouter) // ««««« WIP

app.get('/', (req,res) => {
    res.send('Home Page')
})


function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === Number(userId))
        // console.log('► userId »→ req.body.userId', userId);
    }
    next()
}

// app.get('/dashboard', authUser, (req,res) => {
//     res.send('Dashboard Page')
// })

// app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {      
//     res.send('Admin Page')
// })

app.listen(port,() => console.log(`\n► Server listening on port: ${port}`))