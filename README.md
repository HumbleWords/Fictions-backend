# Fictions Backend

For setting up the server the next steps need to be gone through:

1. Install Node.js and set up a database (preferrably PostgreSQL);
2. Take `.env.template` and rename it to `.env`. You also need to change `DATABASE_URL` to your credentials and `JWT_SECRET_KEY` to whatever you want it to be;
3. Clone this repository locally `git clone https://github.com/HumbleWords/Fictions-backend`;
4. Run `npm install` in this local folder;
5. Run `npm run prisma:migrate`;
6. Run `npm run prisma:seed` if you want to have test data;
7. Run `npm run start:dev`.

Now the server should be up and running.
You can use Postman Desktop service to access API.