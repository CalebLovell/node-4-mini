const allMessages = [];

module.exports = {
    getAllMessages: (req, res) => {
        res.send(allMessages);
    },
    
    createMessage: (req, res) => {
        const { username, message } = req.body;
        let newMessage = {
            username,
            message,
        };
        allMessages.push(newMessage);
        res.send(allMessages);
    },
};