import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
export const fakeUsers = [{
  id: '1',
  email: 'admin@indovia.com',
  username: 'superadmin',
  password: 'admin',
  firstName: 'Super',
  lastName: 'Admin',
  role: 'Superadmin',
  token: 'indovia-jwt-token-superadmin-authenticated-2026'
}, {
  id: '2',
  email: 'admin@indovia.com',
  username: 'superadmin',
  password: 'admin123',
  firstName: 'Super',
  lastName: 'Admin',
  role: 'Superadmin',
  token: 'indovia-jwt-token-superadmin-authenticated-2026'
}, {
  id: '3',
  email: 'user@demo.com',
  username: 'demo_admin',
  password: '123456',
  firstName: 'Admin',
  lastName: 'User',
  role: 'Admin',
  token: 'indovia-jwt-token-demo-admin-authenticated'
}];
export default function configureFakeBackend() {
  mock.onPost('/login').reply(function (config) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise(function (resolve, _reject) {
      setTimeout(function () {
        // get parameters from post request
        const params = JSON.parse(config.data);
        // find if any user matches login credentials
        const filteredUsers = fakeUsers.filter(user => {
          return user.email === params.email && user.password === params.password;
        });
        if (filteredUsers.length) {
          // if login details are valid return user details and fake jwt token
          const user = filteredUsers[0];
          resolve([200, user]);
        } else {
          // else return error
          resolve([401, {
            error: 'Username or password is incorrect'
          }]);
        }
      }, 1000);
    });
  });
}