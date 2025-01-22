const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  const categories = [
    { name: 'Health & Medical', description: 'Healthcare, medical treatments, and wellness' },
    { name: 'Education', description: 'School, college, and learning initiatives' },
    { name: 'Business', description: 'Small business and entrepreneurship' },
    { name: 'Emergency', description: 'Crisis and urgent needs' },
    { name: 'Community', description: 'Local projects and community development' },
    { name: 'Technology', description: 'Tech projects and innovation' },
    { name: 'Creative', description: 'Art, music, and creative projects' },
    { name: 'Sports', description: 'Athletics and sports initiatives' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        description: category.description,
        slug: createSlug(category.name)
      },
    });
  }

  console.log('Categories seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 