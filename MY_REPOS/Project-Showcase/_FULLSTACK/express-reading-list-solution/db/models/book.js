'use strict';
module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define(
		'Book',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			author: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			releaseDate: {
				type: DataTypes.DATEONLY,
				allowNull: false
			},
			pageCount: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			publisher: {
				type: DataTypes.STRING(100),
				allowNull: false
			}
		},
		{}
	);
	Book.associate = function(models) {
		// associations can be defined here
	};
	return Book;
};
// 'use strict';
// module.exports = (sequelize, DataTypes) => {
// 	const Book = sequelize.define(
// 		'Book',
// 		{
// 			title: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 				validate: {
// 					notNull: {
// 						msg: 'Please provide a value for Title'
// 					},
// 					notEmpty: {
// 						msg: 'Please provide a value for Title'
// 					},
// 					len: {
// 						args: [ 0, 255 ],
// 						msg: 'Title must not be more than 255 characters long'
// 					}
// 				}
// 			},
// 			author: {
// 				type: DataTypes.STRING(100),
// 				allowNull: false,
// 				validate: {
// 					notNull: {
// 						msg: 'Please provide a value for Author'
// 					},
// 					notEmpty: {
// 						msg: 'Please provide a value for Author'
// 					},
// 					len: {
// 						args: [ 0, 100 ],
// 						msg: 'Author must not be more than 100 characters long'
// 					}
// 				}
// 			},
// 			releaseDate: {
// 				type: DataTypes.DATEONLY,
// 				allowNull: false,
// 				validate: {
// 					notNull: {
// 						msg: 'Please provide a value for Release Date'
// 					},
// 					isDate: {
// 						msg: 'Please provide a valid date for Release Date'
// 					}
// 				}
// 			},
// 			pageCount: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 				validate: {
// 					notNull: {
// 						msg: 'Please provide a value for Page Count'
// 					},
// 					isInt: {
// 						msg: 'Please provide a valid integer for Page Count'
// 					}
// 				}
// 			},
// 			publisher: {
// 				type: DataTypes.STRING(100),
// 				allowNull: false,
// 				validate: {
// 					notNull: {
// 						msg: 'Please provide a value for Publisher'
// 					},
// 					notEmpty: {
// 						msg: 'Please provide a value for Publisher'
// 					},
// 					len: {
// 						args: [ 0, 100 ],
// 						msg: 'Publisher must not be more than 100 characters long'
// 					}
// 				}
// 			}
// 		},
// 		{}
// 	);
// 	Book.associate = function(models) {
// 		// associations can be defined here
// 	};
// 	return Book;
// };
