# Hunger Quests

This is a weekend [Next.js](https://nextjs.org/) project created for Cross Sell Quarter Switch Day.
You can fork this repo and make your own game. Or you can play [the current game](https://hunger-games-eight.vercel.app/master/pineapple) with your friends.


## Getting Started

First, run the development server:

```bash
# migrate database
npm run push_db

#run app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project is using Prisma ORM and Postgres DB. But you can also replace the db with whatever suits you. Prisma help you to manage that. 
To see and manage the database entries you can open prisma studio:

```bash
# migrate database
npm run open_prisma
```

## Learn More

To learn more about libraries that being used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Prisma.js](https://www.prisma.io/docs/getting-started) - next-generation Node.js and TypeScript ORM
- [geolib](https://github.com/manuelbieh/geolib) - javascript library to provide basic geospatial operations
- [fastest-levenshtein](https://github.com/ka-weihe/fastest-levenshtein) - measure the difference between two strings

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
