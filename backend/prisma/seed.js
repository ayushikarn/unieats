
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting UniEats seeding...");

  // Create LPU campus
  const campus = await prisma.campus.upsert({
    where: { name: "Lovely Professional University" },
    update: {},
    create: {
      name: "Lovely Professional University",
      location: "Phagwara, Punjab, India",
      description: "UniEats campus."
    }
  });

  // Create categories
  const categories = [
    "Breakfast", "North Indian", "South Indian",
    "Chinese", "Fast Food", "Pizza", "Beverages",
    "Desserts", "Healthy Food", "Snacks", "Meals"
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  // Create food tags
  const tags = [
    "Vegetarian", "Vegan", "Spicy", "Sweet",
    "Healthy", "Budget Friendly", "High Protein",
    "Light Meal", "Comfort Food", "Quick Bite"
  ];

  for (const name of tags) {
    await prisma.foodTag.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  // Remove the three preliminary outlets
  await prisma.restaurant.deleteMany({
    where: {
      campus_id: campus.id,
      name: {
        in: [
          "Cafe Coffee Day - Block 15A",
          "Domino's Pizza - Block 15",
          "N.K. Food Court - Block 56"
        ]
      }
    }
  });

  // Add all eight Block 34 outlets
  const restaurants = [
    "Vrindavan",
    "Nepali Swadh",
    "Tealogy",
    "Bangali Bawarchi",
    "High on Chai",
    "Chaap Express",
    "Payal Chhat",
    "Northen Delight"
  ];

  for (const name of restaurants) {
    await prisma.restaurant.upsert({
      where: {
        id: (
          await prisma.restaurant.findFirst({
            where: { name, campus_id: campus.id },
            select: { id: true }
          })
        )?.id ?? -1
      },
      update: {
        address: "Food Court, Block 34, Lovely Professional University, Phagwara"
      },
      create: {
        name,
        campus_id: campus.id,
        address: "Food Court, Block 34, Lovely Professional University, Phagwara",
        description: "Food outlet at LPU Food Court, Block 34."
      }
    });
  }

  console.log("UniEats seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
