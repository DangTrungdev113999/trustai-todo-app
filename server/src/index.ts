import { app } from './app.js';
import { users } from './db.js';
import { hashPassword } from './auth.js';

// Seed default account
users.set('default-user', {
  id: 'default-user',
  email: 'trung@test.com',
  passwordHash: hashPassword('Test1234'),
  createdAt: new Date().toISOString(),
});

const PORT = process.env['PORT'] || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Default account: trung@test.com / Test1234`);
});
