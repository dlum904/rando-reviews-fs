import "dotenv/config";
import { prisma, disconnectDB } from "../src/config/db.js";

const SEED_PASSWORD = "Password123";

const users = [
  { username: "Alex M." },
  { username: "Jordan K." },
  { username: "Sam R." },
  { username: "Taylor W." },
  { username: "Casey L." },
  { username: "Morgan P." },
  { username: "Riley S." },
  { username: "Dana H." },
  { username: "Chris B." },
  { username: "Jamie F." },
  { username: "Priya N." },
  { username: "Ben T." },
  { username: "Nina V." },
  { username: "Elena R." },
  { username: "Marcus J." },
  { username: "Aisha K." },
  { username: "Owen P." },
  { username: "Kim L." },
  { username: "Diego S." },
  { username: "Hannah G." },
  { username: "Leo C." },
  { username: "Sofia A." },
  { username: "Greg W." },
  { username: "Maya F." },
  { username: "Chris D." },
  { username: "Ivy M." },
  { username: "Nate B." },
  { username: "Zoe Q." },
  { username: "Liam O." },
  { username: "Tasha E." },
  { username: "Raj P." },
];

const reviews = [
  {
    title: "Sony WH-1000XM5 Headphones",
    text: "Best noise cancellation I have ever experienced. Comfortable for long flights and the battery lasts forever. Worth every penny.",
    category: "Products",
    rating: 5,
    authorUsername: "Alex M.",
    createdAt: "2026-03-10",
    comments: [
      { text: "Totally agree — I wore these on a 12-hour flight and barely heard the engines. Game changer.", authorUsername: "Priya N.", createdAt: "2026-03-11", upVotes: 14, downVotes: 1 },
      { text: "Do they still clamp a bit tight at first? Mine took a week to break in.", authorUsername: "Ben T.", createdAt: "2026-03-12", upVotes: 6, downVotes: 0 },
      { text: "Battery life is no joke. I charge mine maybe twice a month.", authorUsername: "Nina V.", createdAt: "2026-03-14", upVotes: 9, downVotes: 2 },
    ],
  },
  {
    title: "Blue Bottle Coffee - Hayes Valley",
    text: "Great pour-over and a cozy atmosphere. Gets crowded on weekends but the baristas are friendly and know their craft.",
    category: "FOOD",
    rating: 4,
    authorUsername: "Jordan K.",
    createdAt: "2026-03-08",
    comments: [
      { text: "Go on a weekday morning if you can. Weekend lines are brutal.", authorUsername: "Elena R.", createdAt: "2026-03-09", upVotes: 11, downVotes: 0 },
      { text: "Their New Orleans iced coffee is underrated. Skip the pastries though — hit Tartine instead.", authorUsername: "Marcus J.", createdAt: "2026-03-10", upVotes: 7, downVotes: 3 },
    ],
  },
  {
    title: "Dune: Part Two",
    text: "A visual masterpiece. The sound design alone is worth seeing in IMAX. Villeneuve nailed the scale and emotion of the books.",
    category: "MOVIES",
    rating: 5,
    authorUsername: "Sam R.",
    createdAt: "2026-03-05",
    comments: [
      { text: "Saw it in IMAX twice. The sandworm sequence still gives me chills.", authorUsername: "Aisha K.", createdAt: "2026-03-06", upVotes: 22, downVotes: 1 },
      { text: "Book fans: they condensed a lot, but the spirit is there. Zendaya was better than I expected.", authorUsername: "Owen P.", createdAt: "2026-03-07", upVotes: 8, downVotes: 4 },
    ],
  },
  {
    title: "Joe's Plumbing",
    text: "Fixed the leak quickly but arrived 45 minutes late without calling. Work quality was solid, communication could be better.",
    category: "SERVICES",
    rating: 3,
    authorUsername: "Taylor W.",
    createdAt: "2026-03-02",
    comments: [
      { text: "Same experience. Great work, terrible at texts. I just build in an extra hour now.", authorUsername: "Kim L.", createdAt: "2026-03-03", upVotes: 5, downVotes: 0 },
    ],
  },
  {
    title: "Golden Gate Park",
    text: "Massive, beautiful, and always something new to discover. Perfect for a morning jog or an afternoon picnic with friends.",
    category: "PLACES",
    rating: 5,
    authorUsername: "Casey L.",
    createdAt: "2026-02-28",
    comments: [
      { text: "The bison paddock is such a weird delight. Also, Stow Lake at sunset is unbeatable.", authorUsername: "Diego S.", createdAt: "2026-03-01", upVotes: 16, downVotes: 0 },
      { text: "Watch out for the fog in the afternoon — it rolls in fast near Ocean Beach.", authorUsername: "Hannah G.", createdAt: "2026-03-02", upVotes: 4, downVotes: 1 },
      { text: "Brought a picnic last Sunday and it was packed. Still worth it.", authorUsername: "Leo C.", createdAt: "2026-03-04", upVotes: 3, downVotes: 0 },
    ],
  },
  {
    title: "Instant Pot Duo",
    text: "Game changer for weeknight dinners. Rice, stews, and meal prep are all faster. The manual is confusing at first.",
    category: "OTHER",
    rating: 4,
    authorUsername: "Morgan P.",
    createdAt: "2026-02-25",
    comments: [
      { text: "Ignore the manual and watch a 10-minute YouTube video. You will never look back.", authorUsername: "Sofia A.", createdAt: "2026-02-26", upVotes: 19, downVotes: 2 },
      { text: "Yogurt mode is surprisingly good if you have the time.", authorUsername: "Greg W.", createdAt: "2026-02-27", upVotes: 4, downVotes: 1 },
    ],
  },
  {
    title: "Tartine Bakery",
    text: "The morning bun is legendary for a reason. Line moves fast and everything tastes freshly baked. A must-visit.",
    category: "FOOD",
    rating: 5,
    authorUsername: "Riley S.",
    createdAt: "2026-02-20",
    comments: [
      { text: "Morning bun AND the country loaf. Get both. Thank me later.", authorUsername: "Maya F.", createdAt: "2026-02-21", upVotes: 13, downVotes: 0 },
      { text: "They sell out of morning buns by 10am on weekends. Get there early.", authorUsername: "Chris D.", createdAt: "2026-02-22", upVotes: 10, downVotes: 1 },
    ],
  },
  {
    title: "The Bear (Season 3)",
    text: "Still one of the most intense shows on TV. This season leans more experimental — not everyone will love it, but I did.",
    category: "OTHER",
    rating: 4,
    authorUsername: "Dana H.",
    createdAt: "2026-02-15",
    comments: [
      { text: "The Fishes episode from S2 still haunts me. S3 is slower but the kitchen chaos is chef's kiss.", authorUsername: "Ivy M.", createdAt: "2026-02-16", upVotes: 18, downVotes: 3 },
      { text: "Too many montages for me. Felt like a two-hour music video with a plot.", authorUsername: "Nate B.", createdAt: "2026-02-18", upVotes: 6, downVotes: 9 },
      { text: "Carmy's arc this season actually landed for me. Give it a rewatch.", authorUsername: "Zoe Q.", createdAt: "2026-02-19", upVotes: 7, downVotes: 2 },
    ],
  },
  {
    title: "Pacific Heights Neighborhood",
    text: "Stunning Victorian homes and great views of the bay. Quiet, walkable, and full of hidden gem restaurants nearby.",
    category: "PLACES",
    rating: 4,
    authorUsername: "Chris B.",
    createdAt: "2026-02-10",
    comments: [
      { text: "Alta Plaza Park at golden hour is one of the best views in the city.", authorUsername: "Liam O.", createdAt: "2026-02-12", upVotes: 12, downVotes: 0 },
    ],
  },
  {
    title: "Anker PowerCore 20000",
    text: "Charges my phone three times over and fits in a jacket pocket. Reliable travel companion for years now.",
    category: "OTHER",
    rating: 5,
    authorUsername: "Jamie F.",
    createdAt: "2026-02-05",
    comments: [
      { text: "Mine lasted four years of daily use before the ports got loose. Still buying Anker.", authorUsername: "Tasha E.", createdAt: "2026-02-07", upVotes: 8, downVotes: 0 },
      { text: "Does it charge a laptop? Curious before I buy.", authorUsername: "Raj P.", createdAt: "2026-02-08", upVotes: 2, downVotes: 0 },
    ],
  },
];

async function main() {
	// Delete all comments, reviews, and users
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  await prisma.user.createMany({
    data: users.map((user) => ({
      username: user.username,
      password: SEED_PASSWORD,
    })),
  });

	// Get all users
  const createdUsers = await prisma.user.findMany();
	// Create a map of username to user id
  const userIdByUsername = Object.fromEntries(
    createdUsers.map((user) => [user.username, user.id])
  );

  // Create reviews
  for (const review of reviews) {
    await prisma.review.create({
      data: {
        title: review.title,
        text: review.text,
        category: review.category,
        rating: review.rating,
        authorId: userIdByUsername[review.authorUsername],
        createdAt: new Date(`${review.createdAt}T12:00:00.000Z`),
        comments: {
          create: review.comments.map((comment) => ({
            text: comment.text,
            upVotes: comment.upVotes,
            downVotes: comment.downVotes,
            authorId: userIdByUsername[comment.authorUsername],
            createdAt: new Date(`${comment.createdAt}T12:00:00.000Z`),
          })),
        },
      },
    });
  }

  // Log the results
  const commentCount = reviews.reduce((n, review) => n + review.comments.length, 0);
  console.log(`Seeded ${users.length} users, ${reviews.length} reviews, ${commentCount} comments.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectDB();
  });