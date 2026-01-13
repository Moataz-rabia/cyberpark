# TODO: Implement Token Expiration Check in Router Guard

## Tasks
- [x] Add a function to check JWT token expiration in `frontend/src/routers/index.js`
- [x] Modify the `beforeEach` router guard to validate token expiration
- [x] Ensure expired tokens trigger redirect to sign-in page and clear localStorage
- [x] Test the implementation by copying URL after login and pasting in new tab with expired token
