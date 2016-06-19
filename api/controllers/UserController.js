module.exports = {
    login: function (req, res) {

        if (!req.body.hasOwnProperty('firstName') || !req.body.hasOwnProperty('lastName')) {

            return res.badRequest();

        } else {

            var findOrCreateUserNeedle = {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };

            User.findOrCreate(findOrCreateUserNeedle).exec(function (err, foundOrCreatedUser) {

                if (err) {

                    return res.serverError();

                } else {

                    var createCategoriesNeedle = [
                        {name: 'Rent', user: foundOrCreatedUser.id},
                        {name: 'Food', user: foundOrCreatedUser.id},
                        {name: 'Conveyance', user: foundOrCreatedUser.id},
                        {name: 'Clothing', user: foundOrCreatedUser.id},
                        {name: 'Grocery', user: foundOrCreatedUser.id}
                    ];

                    Category.create(createCategoriesNeedle).exec(function (err, createdCategories) {

                        if (err) {

                            return res.serverError();

                        } else {

                            return res.json(foundOrCreatedUser);

                        }

                    });

                }

            });

        }

    }
};