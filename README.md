# Fictions Backend

For setting up the server the next steps need to be gone through:

1. Install Node.js and set up a database (preferrably PostgreSQL);
2. Clone this repository locally `git clone https://github.com/HumbleWords/Fictions-backend`;
3. Take `.env.template` and rename it to `.env`. You also need to change `DATABASE_URL` to your credentials and `JWT_SECRET_KEY` to whatever you want it to be;
4. Run `npm install` in this local folder;
5. Run `npm run prisma:migrate`;
6. Run `npm run prisma:seed` if you want to have test data;
7. Run `npm run start:dev`.

Now the server should be up and running.

You can use Postman Desktop service to access API.

Alternatively you can go to [http://localhost:8080/api](http://localhost:8080/api) to access api through Open API.