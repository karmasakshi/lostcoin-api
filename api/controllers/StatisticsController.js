module.exports = {
    'category-distribution': function (req, res) {
        if (!req.query.hasOwnProperty('userID')) {

            return res.badRequest();

        } else {

            Category.find({user: req.query.userID}).exec(function (err, categories) {

                if (err) {

                    return res.serverError();

                } else {

                    async.parallel({
                        getCategorisedTransactions: function (callback) {

                            var result = {};

                            async.each(categories, function (category, callback) {

                                Transaction.find({category: category.id}).exec(function (err, transactions) {

                                    if (err) {

                                        callback(err);

                                    } else {

                                        var sum = 0;

                                        for (var i = 0; i < transactions.length; i++) {

                                            sum += transactions[i].amount;

                                        }

                                        result[category.name] = sum;

                                        callback(null);

                                    }

                                });

                            }, function (err) {

                                if (err) {

                                    callback(err);

                                } else {

                                    callback(null, result);

                                }

                            });

                        },
                        getUnategorisedTransactions: function (callback) {

                            Transaction.find({category: null, user: req.query.userID}).exec(function (err, transactions) {

                                if (err) {

                                    callback(err);

                                } else {

                                    var sum = 0;

                                    for (var i = 0; i < transactions.length; i++) {

                                        sum += transactions[i].amount;

                                    }

                                    callback(null, sum);

                                }

                            });

                        }
                    }, function (err, result) {

                        if (err) {

                            return res.serverError();

                        } else {

                            result.getCategorisedTransactions.Uncategorised = result.getUnategorisedTransactions;

                            return res.json(result.getCategorisedTransactions);

                        }

                    });

                }

            });

        }
    }
};