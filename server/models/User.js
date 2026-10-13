const users = [];

export const createUser = ({ username, email, phone, countryCode, country, state, city, password }) => {
  const user = {
    id: users.length + 1,
    username,
    email: email ? email.toLowerCase() : '',
    phone: phone || '',
    countryCode: countryCode || '+91',
    country: country || '',
    state: state || '',
    city: city || '',
    password,
    role: 'artist',
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return user;
};

export const findUserByEmail = (email) => {
  if (!email) return null;
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id) => users.find((u) => u.id === Number(id));

export const getAllUsers = () => users;
