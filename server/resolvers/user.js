const USER_DATA = [
  {
    _id: "1",
    name: "test",
    username: "test_user",
    email: "test@gmail.com",
    password: "123456",
  },
  {
    _id: "2",
    name: "test2",
    username: "test_user2",
    email: "test2@gmail.com",
    password: "123456",
  },
];

const resolvers = {
  Query: {
    findUsers: () => {
      return USER_DATA;
    },
  },

  Mutation: {
    register: (_, args) => {
      const newUser = {
        ...args.inputUser,
        _id: USER_DATA.length + 1,
      };

      USER_DATA.push(newUser);

      return newUser;
    },
  },
};

export default resolvers;
