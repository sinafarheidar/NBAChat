const users = []

const addUser = ({ id, name, room }) => {

    const user = { id: id, name: name, room: room }

    users.push(user)

    return { user }
}

const removeUser = (id) => {
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }