import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting automated database seeding via @faker-js/faker...");

  // 1. Clean existing records (idempotent reset)
  await prisma.auditLog.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  console.log("🧹 Flushed existing records.");

  // 2. Seed Roles
  const adminRole = await prisma.role.create({
    data: {
      name: "ADMIN",
      description: "Full system administration and sensitive audit log inspection",
    },
  });

  const memberRole = await prisma.role.create({
    data: {
      name: "MEMBER",
      description: "Verified community member and portfolio collaborator",
    },
  });

  const guestRole = await prisma.role.create({
    data: {
      name: "GUEST",
      description: "Unauthenticated or public client with read-only access",
    },
  });

  console.log("✅ Seeded 3 Roles: ADMIN, MEMBER, GUEST");

  // 3. Seed Primary Admin User
  const primaryAdmin = await prisma.user.create({
    data: {
      name: "Indraneel Samanta",
      email: "indraneel@portfolio.dev",
      roleId: adminRole.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "ADMIN_INITIALIZED",
      actor: primaryAdmin.email,
      details: "Bootstrap administrator account initialized into database",
      userId: primaryAdmin.id,
    },
  });

  // 4. Seed Relational Users with Faker.js
  const users = [primaryAdmin];
  for (let i = 0; i < 8; i++) {
    const isMember = i < 6;
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        roleId: isMember ? memberRole.id : guestRole.id,
      },
    });
    users.push(user);

    await prisma.auditLog.create({
      data: {
        action: "USER_REGISTERED",
        actor: user.email,
        details: `Auto-registered via simulated pipeline with role ${isMember ? "MEMBER" : "GUEST"}`,
        userId: user.id,
      },
    });
  }
  console.log(`✅ Seeded ${users.length} Users with relational foreign keys`);

  // 5. Seed Inquiries with Faker.js
  const projectTypes = ["fullstack", "ml_pipeline", "consulting", "other"];
  const budgetTiers = ["< $1k", "$1k - $5k", "$5k - $10k", "> $10k"];
  const statuses = ["PENDING", "REVIEWED", "APPROVED", "DELIVERED"];

  for (let i = 0; i < 12; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const inquiry = await prisma.inquiry.create({
      data: {
        name: randomUser.name,
        email: randomUser.email,
        projectType: faker.helpers.arrayElement(projectTypes),
        budget: faker.helpers.arrayElement(budgetTiers),
        message: faker.lorem.paragraph({ min: 2, max: 4 }),
        status: faker.helpers.arrayElement(statuses),
        userId: randomUser.id,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "INQUIRY_CREATED",
        actor: inquiry.email,
        details: `Inquiry #${inquiry.id} created for ${inquiry.projectType} [${inquiry.budget}]`,
        userId: randomUser.id,
      },
    });
  }
  console.log("✅ Seeded 12 Relational Inquiries and linked Audit Logs");

  const totalUsers = await prisma.user.count();
  const totalRoles = await prisma.role.count();
  const totalInquiries = await prisma.inquiry.count();
  const totalLogs = await prisma.auditLog.count();

  console.log("\n================ SEEDING COMPLETE ================");
  console.log(`📊 Database Summary:`);
  console.log(`- Roles:       ${totalRoles}`);
  console.log(`- Users:       ${totalUsers}`);
  console.log(`- Inquiries:   ${totalInquiries}`);
  console.log(`- Audit Logs:  ${totalLogs}`);
  console.log("==================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
