const fs = require('fs');
const path = require('path');

const fileName = 'users.json';
const filePath = path.join(__dirname, "..","database", fileName);

class UserRepository {
    static async getUser(){
        return new Promise((resolve,reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code ==="ENOENT") {
                        this.writeUsersToFile([]).then(resolve).catch(reject);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }

    static async writeUsersToFile(users){
        return new Promise ((resolve,reject) =>{
            fs.writeFile(filePath, JSON.stringify(users), (err) =>{
                if (err) reject(err);
                console.log('data written to file: ${filePath}');
                resolve(this.getAllUsers());
            })
        })
}
    static async getAllUsers(){
        const users = await this.getUser();
        return users;
}

    static async createUser(user){
        const users = await this.getUser();
        user.id = users.length + 1;
        users.push(user);
        const insertDB = await this.writeUsersToFile(users);
        return insertDB;
}

    static async getUserById(id) {
        const users = await this.getUser();
        return users.find(users => users.id === parseInt(id));
}

    static async updateUser (id, user) {
        const users = await this.getUser();
        const index = users.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return null;
        }
        users[index] = user;
        const updateDB = await this.writeUsersToFile(users);
        return updateDB;
}

    static async deleteUser(id) {
        const users = await this.getUser();
        const index = users.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return null;
        }else{
            users.splice(index, 1);
        }
        await this.writeUsersToFile(users);
        return index;
    }
}
module.exports = UserRepository;