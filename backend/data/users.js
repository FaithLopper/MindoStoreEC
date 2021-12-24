import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'MinDo Admin',
        email: 'admin@mindo.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        name: 'ZanXon Admin',
        email: 'admin@zanxon.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        name: 'client1',
        email: 'client1@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'client2',
        email: 'client2@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users