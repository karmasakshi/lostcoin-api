module.exports = {
    attributes: {
        amount: {
            type: 'float',
            required: true
        },
        date: {
            type: 'date',
            required: true
        },
        category: {
            model: 'category'
        },
        user: {
            model: 'user',
            required: true
        }
    }
};