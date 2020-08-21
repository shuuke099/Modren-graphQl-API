const User = require('../../Model/userModel');
const JWT = require('jsonwebtoken');

function generateToken(user) {
	return JWT.sign(
		{
			id: user.id,
			email: user.email,
			username: user.name,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
		}
	);
}

module.exports = {
	Query: {
		async getAllUSers() {
			try {
				const users = await User.find().sort({createdAt: -1});
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getOneUSer(_, {userId}) {
		
			try {
				const user = await User.findById(userId);
				return user;
				if (!user) {
					throw new Error('User not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteUSer(_, {userId}) {
			try {
				const user = await User.findByIdAndDelete(userId);
				return 'successfully deleted the user';
				if (!user) {
					throw new Error('User not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async singUp(_, {singupInput: {name, email, password, passwordConfirm}}) {
			try {
				const newUser = await User.create({
					name,
					email,
					password,
					passwordConfirm,
				});

				const token = generateToken(newUser);

				return {
					...newUser._doc,
					id: newUser._id,
					token,
				};
			} catch (err) {
				throw new Error(err.message);
			}
		},

		async singIn(_, {singInInput: {email, password}}) {
			// 1) Check if email and password exist
			if (!email || !password) {
				throw new Error('Please provide email and password!');
			}

			const user = await User.findOne({email}).select('+password');

			if (!user || !(await user.correctPassword(password, user.password))) {
				throw new Error('Incorrect email or password');
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user.id,
				token,
			};
		},
	},
};
