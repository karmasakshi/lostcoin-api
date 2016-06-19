module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        transactions: {
            collection: 'transaction',
            via: 'category'
        },
        user: {
            model: 'user',
            required: true
        }
    }
};