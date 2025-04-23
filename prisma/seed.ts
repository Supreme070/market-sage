import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean
  await prisma.emailLog.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Demo users
  const passwordHash1 = await bcrypt.hash('pass123', 10);
  const passwordHash2 = await bcrypt.hash('pass456', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: passwordHash1,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      name: 'User Two',
      email: 'user2@example.com',
      password: passwordHash2,
    },
  });

  // Contacts
  const contact1 = await prisma.contact.create({
    data: {
      userId: admin.id,
      name: 'Alice Market',
      email: 'alice@client.com',
      tags: ['new', 'premium'],
    },
  });
  const contact2 = await prisma.contact.create({
    data: {
      userId: admin.id,
      name: 'Bob Target',
      email: 'bob@agency.com',
      tags: ['agency'],
    },
  });
  const contact3 = await prisma.contact.create({
    data: {
      userId: user2.id,
      name: 'Client C',
      email: 'clientc@corp.com',
      tags: ['corporate', 'warm'],
    },
  });

  // Campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      userId: admin.id,
      subject: 'Welcome to MarketSage! 🌱',
      content: '<h1>Hello!</h1><p>Thanks for joining MarketSage. Start your first campaign today!</p>',
      status: 'sent',
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      userId: admin.id,
      subject: 'Special Promo',
      content: '<p>Don\'t miss our spring sale!</p>',
      status: 'draft',
    },
  });

  // Workflows
  await prisma.workflow.create({
    data: {
      userId: admin.id,
      name: 'Onboard New Clients',
      trigger: 'contact_added',
      steps: [{ type: 'email', template: 'Welcome!' }],
      status: 'active',
    },
  });
  await prisma.workflow.create({
    data: {
      userId: user2.id,
      name: 'Re-engagement',
      trigger: 'no_activity_30d',
      steps: [{ type: 'email', template: 'We miss you!' }],
      status: 'paused',
    },
  });

  // Email logs
  await prisma.emailLog.create({
    data: {
      campaignId: campaign1.id,
      contactId: contact1.id,
      event: 'sent',
    },
  });
  await prisma.emailLog.create({
    data: {
      campaignId: campaign1.id,
      contactId: contact2.id,
      event: 'opened',
    },
  });
}

main()
  .then(() => {
    console.log('DB seeded!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
