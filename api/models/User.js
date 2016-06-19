module.exports = {
    attributes: {
        firstName: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: true
        },
        categories: {
            collection: 'category',
            via: 'user'
        },
        transactions: {
            collection: 'transaction',
            via: 'user'
        }
    }
};