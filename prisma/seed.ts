import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROLES = [
  { name: "PLATFORM_SUPER_ADMIN", nameAr: "���� ������ �����", nameEn: "Platform Super Admin", sortOrder: 1 },
  { name: "TENANT_OWNER", nameAr: "���� ������", nameEn: "Tenant Owner", sortOrder: 2 },
  { name: "EXECUTIVE_MANAGER", nameAr: "���� ������", nameEn: "Executive Manager", sortOrder: 3 },
  { name: "PROJECTS_DIRECTOR", nameAr: "���� ��������", nameEn: "Projects Director", sortOrder: 4 },
  { name: "PROJECT_MANAGER", nameAr: "���� �����", nameEn: "Project Manager", sortOrder: 5 },
  { name: "SITE_ENGINEER", nameAr: "����� ����", nameEn: "Site Engineer", sortOrder: 6 },
  { name: "PLANNING_ENGINEER", nameAr: "����� �����", nameEn: "Planning Engineer", sortOrder: 7 },
  { name: "QUANTITY_SURVEYOR", nameAr: "���� �����", nameEn: "Quantity Surveyor", sortOrder: 8 },
  { name: "PROCUREMENT_MANAGER", nameAr: "���� �������", nameEn: "Procurement Manager", sortOrder: 9 },
  { name: "STOREKEEPER", nameAr: "���� ������", nameEn: "Storekeeper", sortOrder: 10 },
  { name: "FINANCE_MANAGER", nameAr: "���� ����", nameEn: "Finance Manager", sortOrder: 11 },
  { name: "ACCOUNTANT", nameAr: "�����", nameEn: "Accountant", sortOrder: 12 },
  { name: "HR_MANAGER", nameAr: "���� ����� �����", nameEn: "HR Manager", sortOrder: 13 },
  { name: "HSE_OFFICER", nameAr: "����� �����", nameEn: "HSE Officer", sortOrder: 14 },
  { name: "QA_QC_ENGINEER", nameAr: "����� ����", nameEn: "QA/QC Engineer", sortOrder: 15 },
  { name: "VIEWER", nameAr: "�����", nameEn: "Viewer", sortOrder: 16 },
];

const PERMISSIONS = [
  { key: "dashboard.view", nameAr: "��� ���� ������", nameEn: "View Dashboard", module: "dashboard" },
  { key: "projects.view", nameAr: "��� ��������", nameEn: "View Projects", module: "projects" },
  { key: "projects.create", nameAr: "����� �����", nameEn: "Create Project", module: "projects" },
  { key: "projects.update", nameAr: "����� �������", nameEn: "Update Project", module: "projects" },
  { key: "projects.delete", nameAr: "��� �������", nameEn: "Delete Project", module: "projects" },
  { key: "users.view", nameAr: "��� ����������", nameEn: "View Users", module: "users" },
  { key: "users.invite", nameAr: "���� ������", nameEn: "Invite User", module: "users" },
  { key: "users.manage_roles", nameAr: "����� ���������", nameEn: "Manage Roles", module: "users" },
  { key: "settings.view", nameAr: "��� ���������", nameEn: "View Settings", module: "settings" },
  { key: "settings.update", nameAr: "����� ���������", nameEn: "Update Settings", module: "settings" },
  { key: "billing.view", nameAr: "��� ��������", nameEn: "View Billing", module: "billing" },
  { key: "reports.view", nameAr: "��� ��������", nameEn: "View Reports", module: "reports" },
];
const ROLE_PERMISSIONS: Record<string, string[]> = {
  PLATFORM_SUPER_ADMIN: [
    "dashboard.view", "projects.view", "projects.create", "projects.update", "projects.delete",
    "users.view", "users.invite", "users.manage_roles",
    "settings.view", "settings.update", "billing.view", "reports.view",
  ],
  TENANT_OWNER: [
    "dashboard.view", "projects.view", "projects.create", "projects.update", "projects.delete",
    "users.view", "users.invite", "users.manage_roles",
    "settings.view", "settings.update", "billing.view", "reports.view",
  ],
  EXECUTIVE_MANAGER: [
    "dashboard.view", "projects.view", "projects.create", "projects.update", "projects.delete",
    "users.view",
    "settings.view", "billing.view", "reports.view",
  ],
  PROJECTS_DIRECTOR: [
    "dashboard.view", "projects.view", "projects.create", "projects.update", "projects.delete",
    "users.view",
    "reports.view",
  ],
  PROJECT_MANAGER: [
    "dashboard.view", "projects.view", "projects.create", "projects.update",
    "reports.view",
  ],
  SITE_ENGINEER: [
    "dashboard.view", "projects.view", "projects.update",
  ],
  PLANNING_ENGINEER: [
    "dashboard.view", "projects.view",
  ],
  QUANTITY_SURVEYOR: [
    "dashboard.view", "projects.view",
    "reports.view",
  ],
  PROCUREMENT_MANAGER: [
    "dashboard.view", "projects.view",
  ],
  STOREKEEPER: [
    "dashboard.view", "projects.view",
  ],
  FINANCE_MANAGER: [
    "dashboard.view", "projects.view",
    "billing.view", "reports.view",
  ],
  ACCOUNTANT: [
    "dashboard.view", "projects.view",
    "billing.view",
  ],
  HR_MANAGER: [
    "dashboard.view",
    "users.view",
  ],
  HSE_OFFICER: [
    "dashboard.view", "projects.view",
  ],
  QA_QC_ENGINEER: [
    "dashboard.view", "projects.view",
  ],
  VIEWER: [
    "dashboard.view", "projects.view",
  ],
};
const SUBSCRIPTION_PLANS = [
  {
    code: "build_start",
    nameAr: "���� �������",
    nameEn: "Build Start",
    descriptionAr: "��������� ������ ������ ������",
    descriptionEn: "For small contractors starting out",
    maxUsers: 5,
    maxProjects: 3,
    storageLimitMB: 500,
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: JSON.stringify(["�� ��� ��� 3 ������", "�� ��� ��� 5 ��������", "����� ����� 500 ��������", "������ ������"]),
    sortOrder: 1,
  },
  {
    code: "build_pro",
    nameAr: "���� ����������",
    nameEn: "Build Pro",
    descriptionAr: "��������� ��������� �� �������� ������",
    descriptionEn: "For medium contractors with advanced needs",
    maxUsers: 20,
    maxProjects: 15,
    storageLimitMB: 2000,
    monthlyPrice: 799,
    yearlyPrice: 7990,
    features: JSON.stringify(["�� ��� ��� 15 �����", "�� ��� ��� 20 ������", "����� ����� 2 ��������", "������ ������", "��� ��� ��� ���� ������"]),
    sortOrder: 2,
  },
  {
    code: "build_enterprise",
    nameAr: "���� ��������",
    nameEn: "Build Enterprise",
    descriptionAr: "�������� ������� �������� ��������",
    descriptionEn: "For large enterprises and corporations",
    maxUsers: 100,
    maxProjects: -1,
    storageLimitMB: 10000,
    monthlyPrice: 1999,
    yearlyPrice: 19990,
    features: JSON.stringify(["������ ��� ������", "�� ��� ��� 100 ������", "����� ����� 10 ��������", "���� �������� ����������", "��� ��� ����", "API ����"]),
    sortOrder: 3,
  },
  {
    code: "build_custom",
    nameAr: "���� ������",
    nameEn: "Build Custom",
    descriptionAr: "��� ����� ��� ���������",
    descriptionEn: "Custom plan tailored to your needs",
    maxUsers: -1,
    maxProjects: -1,
    storageLimitMB: -1,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: JSON.stringify(["��� ����� ��� ��������� / Custom plan tailored to your needs"]),
    sortOrder: 4,
  },
];
async function main() {
  console.log("Starting seed...");

  const hashedAdminPassword = await bcrypt.hash(
    process.env.SEED_ADMIN_PASSWORD || "JaadBuild@2025",
    12,
  );
  const hashedDemoPassword = await bcrypt.hash("Demo@123456", 12);

  // 1. Create Roles
  console.log("Creating roles...");
  const createdRoles: Record<string, string> = {};
  for (const r of ROLES) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: {
        name: r.name,
        nameAr: r.nameAr,
        nameEn: r.nameEn,
        isSystem: true,
        sortOrder: r.sortOrder,
      },
    });
    createdRoles[r.name] = role.id;
  }

  // 2. Create Permissions
  console.log("Creating permissions...");
  const createdPermissions: Record<string, string> = {};
  for (const p of PERMISSIONS) {
    const perm = await prisma.permission.upsert({
      where: { key: p.key },
      update: {},
      create: {
        key: p.key,
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        module: p.module,
      },
    });
    createdPermissions[p.key] = perm.id;
  }

  // 3. Assign Permissions to Roles
  console.log("Assigning role permissions...");
  for (const [roleName, permKeys] of Object.entries(ROLE_PERMISSIONS)) {
    const roleId = createdRoles[roleName];
    if (!roleId) continue;
    for (const permKey of permKeys) {
      const permissionId = createdPermissions[permKey];
      if (!permissionId) continue;
    await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId, permissionId } },
        update: {},
        create: { roleId, permissionId },
      });
    }
  }

  // 4. Create Subscription Plans
  console.log("Creating subscription plans...");
  for (const plan of SUBSCRIPTION_PLANS) {
    await prisma.subscriptionPlan.upsert({
      where: { code: plan.code },
      update: {},
      create: {
        code: plan.code,
        nameAr: plan.nameAr,
        nameEn: plan.nameEn,
        descriptionAr: plan.descriptionAr,
        descriptionEn: plan.descriptionEn,
        maxUsers: plan.maxUsers,
        maxProjects: plan.maxProjects,
        storageLimitMB: plan.storageLimitMB,
        monthlyPrice: plan.monthlyPrice,
        yearlyPrice: plan.yearlyPrice,
        features: plan.features,
        sortOrder: plan.sortOrder,
      },
    });
  }

  // 5. Create Demo Tenant
  console.log("Creating demo tenant...");
  const tenant = await prisma.tenant.upsert({
    where: { id: "demo-tenant-alufuq" },
    update: {},
    create: {
      id: "demo-tenant-alufuq",
      companyNameAr: "���� ����� ���������",
      companyNameEn: "Al Ufuq Contracting Company",
      legalName: "���� ����� ��������� ������",
      commercialRegister: "4030214567",
      taxNumber: "310456789012345",
      activityType: "������� ����",
      companySize: "medium",
      country: "SA",
      city: "������",
      currency: "SAR",
      timezone: "Asia/Riyadh",
      dateFormat: "DD/MM/YYYY",
      weekStartDay: "Sunday",
      fiscalYearStart: "01-01",
      status: "ACTIVE",
      maxUsers: 20,
      maxProjects: 15,
      storageLimitMB: 2000,
    },
  });

  // 6. Create Users
  console.log("Creating users...");

  const usersData = [
    {
      email: "admin@jaadbuild.com",
      nameAr: "���� ������",
      nameEn: "System Admin",
      phone: "+966500000001",
      isPlatformAdmin: true,
      password: hashedAdminPassword,
      roleName: "PLATFORM_SUPER_ADMIN",
    },
    {
      email: "owner@ufuq.com",
      nameAr: "���� �������",
      nameEn: "Saleh Al-Otaibi",
      phone: "+966500000002",
      password: hashedDemoPassword,
      roleName: "TENANT_OWNER",
    },
    {
      email: "executive@ufuq.com",
      nameAr: "���� ������",
      nameEn: "Khaled Al-Rashid",
      phone: "+966500000003",
      password: hashedDemoPassword,
      roleName: "EXECUTIVE_MANAGER",
    },
    {
      email: "director@ufuq.com",
      nameAr: "������� ������",
      nameEn: "Abdullah Al-Saleem",
      phone: "+966500000004",
      password: hashedDemoPassword,
      roleName: "PROJECTS_DIRECTOR",
    },
    {
      email: "pm@ufuq.com",
      nameAr: "���� ������",
      nameEn: "Mohammed Al-Harbi",
      phone: "+966500000005",
      password: hashedDemoPassword,
      roleName: "PROJECT_MANAGER",
    },
    {
      email: "engineer@ufuq.com",
      nameAr: "���� ��������",
      nameEn: "Faisal Al-Qahtani",
      phone: "+966500000006",
      password: hashedDemoPassword,
      roleName: "SITE_ENGINEER",
    },
    {
      email: "qs@ufuq.com",
      nameAr: "���� ��������",
      nameEn: "Nasser Al-Zahrani",
      phone: "+966500000007",
      password: hashedDemoPassword,
      roleName: "QUANTITY_SURVEYOR",
    },
    {
      email: "viewer@ufuq.com",
      nameAr: "����� ������",
      nameEn: "Demo Viewer",
      phone: "+966500000008",
      password: hashedDemoPassword,
      roleName: "VIEWER",
    },
  ];
  const createdUsers: Record<string, string> = {};
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        nameAr: u.nameAr,
        nameEn: u.nameEn,
        phone: u.phone,
        passwordHash: u.password,
        isPlatformAdmin: u.isPlatformAdmin ?? false,
        emailVerified: new Date(),
        locale: "ar",
      },
    });
    createdUsers[u.email] = user.id;

    await prisma.tenantMembership.upsert({
      where: { tenantId_userId: { tenantId: tenant.id, userId: user.id } },
      update: {},
      create: {
        tenantId: tenant.id,
        userId: user.id,
        roleId: createdRoles[u.roleName],
        status: "ACTIVE",
        joinedAt: new Date(),
      },
    });
  }

  // 7. Create Demo Projects
  console.log("Creating demo projects...");

  const projectsData = [
    {
      id: "project-rawdah",
      nameAr: "���� ������ ������",
      nameEn: "Al Rawda Residential Complex",
      projectNumber: "PRJ-2024-001",
      clientName: "���� ������ ������� �������",
      clientContact: "+966501111111",
      city: "������",
      projectType: "����",
      contractValue: 12500000,
      budget: 10000000,
      actualCost: 6500000,
      commitments: 1500000,
      expectedProfit: 2500000,
      invoicedAmount: 8125000,
      collectedAmount: 7500000,
      progressPercentage: 65,
      plannedProgress: 70,
      status: "ACTIVE" as const,
      health: "GREEN" as const,
      riskLevel: "LOW" as const,
      startDate: new Date("2024-01-15"),
      endDate: new Date("2025-06-30"),
      delayDays: 15,
      projectManagerEmail: "pm@ufuq.com",
    },
    {
      id: "project-business-tower",
      nameAr: "��� ������� �������",
      nameEn: "Commercial Business Tower",
      projectNumber: "PRJ-2024-002",
      clientName: "���� ����� �������",
      clientContact: "+966502222222",
      city: "���",
      projectType: "�����",
      contractValue: 8750000,
      budget: 7000000,
      actualCost: 3675000,
      commitments: 1200000,
      expectedProfit: 1750000,
      invoicedAmount: 3675000,
      collectedAmount: 3500000,
      progressPercentage: 42,
      plannedProgress: 45,
      status: "ACTIVE" as const,
      health: "YELLOW" as const,
      riskLevel: "MEDIUM" as const,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2025-09-30"),
      delayDays: 0,
      projectManagerEmail: "pm@ufuq.com",
    },
    {
      id: "project-madinah-hospital",
      nameAr: "������ ������� �������",
      nameEn: "Madinah Hospital",
      projectNumber: "PRJ-2024-003",
      clientName: "����� �����",
      clientContact: "+966503333333",
      city: "������� �������",
      projectType: "���",
      contractValue: 15000000,
      budget: 12000000,
      actualCost: 4200000,
      commitments: 2500000,
      expectedProfit: 3000000,
      invoicedAmount: 4200000,
      collectedAmount: 4000000,
      progressPercentage: 28,
      plannedProgress: 30,
      status: "ACTIVE" as const,
      health: "GREEN" as const,
      riskLevel: "LOW" as const,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2026-03-31"),
      delayDays: 0,
      projectManagerEmail: "director@ufuq.com",
    },
    {
      id: "project-villas",
      nameAr: "��� ������ �������",
      nameEn: "Al Oasis Residential Villas",
      projectNumber: "PRJ-2024-004",
      clientName: "���� ������ ��������",
      clientContact: "+966504444444",
      city: "�����",
      projectType: "����",
      contractValue: 3500000,
      budget: 2800000,
      actualCost: 2800000,
      commitments: 350000,
      expectedProfit: 700000,
      invoicedAmount: 3150000,
      collectedAmount: 3100000,
      progressPercentage: 80,
      plannedProgress: 85,
      status: "ACTIVE" as const,
      health: "GREEN" as const,
      riskLevel: "LOW" as const,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2025-01-31"),
      delayDays: 0,
      projectManagerEmail: "engineer@ufuq.com",
    },
    {
      id: "project-gov-building",
      nameAr: "���� ������� �������",
      nameEn: "Government Administration Building",
      projectNumber: "PRJ-2024-005",
      clientName: "������ �������� �������",
      clientContact: "+966505555555",
      city: "��� �������",
      projectType: "�����",
      contractValue: 5000000,
      budget: 4000000,
      actualCost: 2750000,
      commitments: 750000,
      expectedProfit: 1000000,
      invoicedAmount: 2750000,
      collectedAmount: 2500000,
      progressPercentage: 55,
      plannedProgress: 55,
      status: "ACTIVE" as const,
      health: "GREEN" as const,
      riskLevel: "LOW" as const,
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-05-31"),
      delayDays: 0,
      projectManagerEmail: "pm@ufuq.com",
    },
    {
      id: "project-king-fahd-road",
      nameAr: "���� ����� ���",
      nameEn: "King Fahd Road",
      projectNumber: "PRJ-2024-006",
      clientName: "����� �����",
      clientContact: "+966506666666",
      city: "������",
      projectType: "���� �����",
      contractValue: 18000000,
      budget: 14400000,
      actualCost: 6300000,
      commitments: 3500000,
      expectedProfit: 3600000,
      invoicedAmount: 6300000,
      collectedAmount: 6000000,
      progressPercentage: 35,
      plannedProgress: 40,
      status: "ACTIVE" as const,
      health: "YELLOW" as const,
      riskLevel: "HIGH" as const,
      startDate: new Date("2024-05-01"),
      endDate: new Date("2026-06-30"),
      delayDays: 0,
      projectManagerEmail: "director@ufuq.com",
    },
    {
      id: "project-desalination",
      nameAr: "���� ����� ������",
      nameEn: "Water Desalination Plant",
      projectNumber: "PRJ-2024-007",
      clientName: "������� ������ ������ ������",
      clientContact: "+966507777777",
      city: "������",
      projectType: "�����",
      contractValue: 22000000,
      budget: 17600000,
      actualCost: 3300000,
      commitments: 6000000,
      expectedProfit: 4400000,
      invoicedAmount: 3300000,
      collectedAmount: 3000000,
      progressPercentage: 15,
      plannedProgress: 15,
      status: "PLANNING" as const,
      health: "GREEN" as const,
      riskLevel: "MEDIUM" as const,
      startDate: new Date("2024-09-01"),
      endDate: new Date("2027-03-31"),
      delayDays: 0,
      projectManagerEmail: "director@ufuq.com",
    },
    {
      id: "project-schools",
      nameAr: "���� ����� �����",
      nameEn: "Al Namo Educational Complex",
      projectNumber: "PRJ-2024-008",
      clientName: "����� �������",
      clientContact: "+966508888888",
      city: "������",
      projectType: "������",
      contractValue: 4500000,
      budget: 3600000,
      actualCost: 4050000,
      commitments: 200000,
      expectedProfit: 900000,
      invoicedAmount: 4050000,
      collectedAmount: 4000000,
      progressPercentage: 90,
      plannedProgress: 95,
      status: "ACTIVE" as const,
      health: "YELLOW" as const,
      riskLevel: "LOW" as const,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      delayDays: 30,
      projectManagerEmail: "pm@ufuq.com",
    },
  ];
  const createdProjects: Record<string, string> = {};
  for (const pd of projectsData) {
    const { projectManagerEmail, ...projectFields } = pd;
    const project = await prisma.project.upsert({
      where: { id: pd.id },
      update: {},
      create: {
        ...projectFields,
        tenantId: tenant.id,
        managerId: createdUsers[projectManagerEmail] ?? createdUsers["pm@ufuq.com"],
        createdById: createdUsers["admin@jaadbuild.com"],
        updatedById: createdUsers["admin@jaadbuild.com"],
      },
    });
    createdProjects[pd.id] = project.id;

    const pmUserId = createdUsers[projectManagerEmail ?? "pm@ufuq.com"];
    if (pmUserId) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId_projectId: {
            userId: pmUserId,
            roleId: createdRoles["PROJECT_MANAGER"],
            projectId: project.id,
          },
        },
        update: {},
        create: {
          userId: pmUserId,
          roleId: createdRoles["PROJECT_MANAGER"],
          projectId: project.id,
        },
      });
    }
  }

  // 8. Create Project Milestones
  console.log("Creating project milestones...");
  const milestones = [
    { pid: "project-rawdah", nameAr: "����� ��������", nameEn: "Foundation Phase", due: new Date("2024-03-15"), comp: new Date("2024-03-10"), pct: 100, st: "COMPLETED" },
    { pid: "project-rawdah", nameAr: "����� ������ ��������", nameEn: "Structure Phase", due: new Date("2024-07-30"), comp: new Date("2024-07-25"), pct: 100, st: "COMPLETED" },
    { pid: "project-rawdah", nameAr: "����� ���������", nameEn: "Finishing Phase", due: new Date("2025-03-15"), comp: null, pct: 45, st: "IN_PROGRESS" },
    { pid: "project-rawdah", nameAr: "������� �������� ��������", nameEn: "Final Phase & Handover", due: new Date("2025-06-30"), comp: null, pct: 0, st: "PENDING" },
    { pid: "project-business-tower", nameAr: "����� ����� ���������", nameEn: "Excavation & Foundation", due: new Date("2024-05-01"), comp: new Date("2024-04-28"), pct: 100, st: "COMPLETED" },
    { pid: "project-business-tower", nameAr: "����� ������ ��������", nameEn: "Concrete Structure", due: new Date("2024-11-30"), comp: new Date("2024-12-15"), pct: 100, st: "COMPLETED" },
    { pid: "project-business-tower", nameAr: "����� ��������", nameEn: "Facade Phase", due: new Date("2025-03-31"), comp: null, pct: 30, st: "IN_PROGRESS" },
    { pid: "project-business-tower", nameAr: "����� ��������� ��������", nameEn: "Interior Finishing", due: new Date("2025-07-31"), comp: null, pct: 0, st: "PENDING" },
    { pid: "project-madinah-hospital", nameAr: "������� ����������", nameEn: "Design & Approvals", due: new Date("2024-08-31"), comp: new Date("2024-08-25"), pct: 100, st: "COMPLETED" },
    { pid: "project-madinah-hospital", nameAr: "����� �����", nameEn: "Excavation Phase", due: new Date("2024-11-30"), comp: new Date("2024-11-20"), pct: 100, st: "COMPLETED" },
    { pid: "project-madinah-hospital", nameAr: "����� ��������", nameEn: "Foundation Phase", due: new Date("2025-03-31"), comp: null, pct: 60, st: "IN_PROGRESS" },
    { pid: "project-villas", nameAr: "����� �������", nameEn: "Design Phase", due: new Date("2024-03-01"), comp: new Date("2024-02-25"), pct: 100, st: "COMPLETED" },
    { pid: "project-villas", nameAr: "����� ������", nameEn: "Construction Phase", due: new Date("2024-09-30"), comp: new Date("2024-09-28"), pct: 100, st: "COMPLETED" },
    { pid: "project-villas", nameAr: "����� �������", nameEn: "Finishing Phase", due: new Date("2024-12-31"), comp: null, pct: 85, st: "IN_PROGRESS" },
    { pid: "project-villas", nameAr: "������� �������", nameEn: "Final Handover", due: new Date("2025-01-31"), comp: null, pct: 0, st: "PENDING" },
    { pid: "project-gov-building", nameAr: "������� ���������", nameEn: "Design & Permits", due: new Date("2024-05-31"), comp: new Date("2024-05-25"), pct: 100, st: "COMPLETED" },
    { pid: "project-gov-building", nameAr: "����� ������", nameEn: "Structure Phase", due: new Date("2024-10-31"), comp: new Date("2024-10-20"), pct: 100, st: "COMPLETED" },
    { pid: "project-gov-building", nameAr: "����� ���������", nameEn: "Finishing Phase", due: new Date("2025-03-31"), comp: null, pct: 60, st: "IN_PROGRESS" },
    { pid: "project-king-fahd-road", nameAr: "����� �������", nameEn: "Planning Phase", due: new Date("2024-06-30"), comp: new Date("2024-06-25"), pct: 100, st: "COMPLETED" },
    { pid: "project-king-fahd-road", nameAr: "����� ����� ������", nameEn: "Site Preparation", due: new Date("2024-09-30"), comp: new Date("2024-10-15"), pct: 100, st: "COMPLETED" },
    { pid: "project-king-fahd-road", nameAr: "����� ������� ��������", nameEn: "Earthworks", due: new Date("2025-03-31"), comp: null, pct: 40, st: "IN_PROGRESS" },
    { pid: "project-king-fahd-road", nameAr: "����� ����� ������", nameEn: "Base Layers", due: new Date("2025-09-30"), comp: null, pct: 0, st: "PENDING" },
    { pid: "project-king-fahd-road", nameAr: "����� �������", nameEn: "Asphalting", due: new Date("2026-03-31"), comp: null, pct: 0, st: "PENDING" },
    { pid: "project-desalination", nameAr: "����� ������ ��������", nameEn: "Feasibility & Design", due: new Date("2024-12-31"), comp: new Date("2024-12-20"), pct: 100, st: "COMPLETED" },
    { pid: "project-desalination", nameAr: "����� ����� ������", nameEn: "Site Preparation", due: new Date("2025-06-30"), comp: null, pct: 20, st: "IN_PROGRESS" },
    { pid: "project-schools", nameAr: "����� �������", nameEn: "Design Phase", due: new Date("2024-02-28"), comp: new Date("2024-02-25"), pct: 100, st: "COMPLETED" },
    { pid: "project-schools", nameAr: "����� ������", nameEn: "Construction Phase", due: new Date("2024-08-31"), comp: new Date("2024-09-15"), pct: 100, st: "COMPLETED" },
    { pid: "project-schools", nameAr: "����� ���������", nameEn: "Finishing Phase", due: new Date("2024-11-30"), comp: null, pct: 90, st: "IN_PROGRESS" },
    { pid: "project-schools", nameAr: "������� �������", nameEn: "Final Handover", due: new Date("2024-12-31"), comp: null, pct: 0, st: "PENDING" },
  ];

  for (const m of milestones) {
    const projectId = createdProjects[m.pid];
    if (!projectId) continue;
    await prisma.projectMilestone.create({
      data: {
        projectId,
        nameAr: m.nameAr,
        nameEn: m.nameEn,
        dueDate: m.due,
        completedDate: m.comp,
        progress: m.pct,
        status: m.st,
      },
    });
  }
  // 9. Create Notifications
  console.log("Creating notifications...");
  const notifications = [
    {
      email: "owner@ufuq.com",
      type: "SUCCESS" as const,
      titleAr: "������ �� �� ��� ����",
      titleEn: "Welcome to JAAD BUILD",
      descAr: "�� ����� ���� ������ �����. ����� ���� ����� �� ����� �������.",
      descEn: "Your company account has been created. You can now start managing your projects.",
      link: "/dashboard",
    },
    {
      email: "owner@ufuq.com",
      type: "INFO" as const,
      titleAr: "������ �������: ��� ������",
      titleEn: "Project Completed: Al Oasis Villas",
      descAr: "���� ���� ������� �� ����� ��� ������ ������� ��� 80%",
      descEn: "The Al Oasis Residential Villas project has reached 80% completion.",
      link: "/projects/project-villas",
    },
    {
      email: "pm@ufuq.com",
      type: "WARNING" as const,
      titleAr: "����� �� �������: ���� ����� ���",
      titleEn: "Project Delay: King Fahd Road",
      descAr: "���� ������� ��� �� ������ ��. ���� ������ ��� �����.",
      descEn: "Progress is behind schedule. Please review the work plan.",
      link: "/projects/project-king-fahd-road",
    },
    {
      email: "pm@ufuq.com",
      type: "INFO" as const,
      titleAr: "���� �����: ������ ������ ������",
      titleEn: "New Task: Review Schedule",
      descAr: "���� ������ ������ ������ ������ ���� ����� �����",
      descEn: "Please review the schedule for Al Namo Educational Complex.",
      link: "/projects/project-schools",
    },
    {
      email: "director@ufuq.com",
      type: "INFO" as const,
      titleAr: "����� ������ ����",
      titleEn: "Weekly Report Ready",
      descAr: "������� �������� ����� �������� ���� �����",
      descEn: "The weekly project performance report is ready for review.",
      link: "/reports",
    },
  ];

  for (const n of notifications) {
    const userId = createdUsers[n.email];
    if (!userId) continue;
    await prisma.notification.create({
      data: {
        tenantId: tenant.id,
        userId,
        type: n.type,
        titleAr: n.titleAr,
        titleEn: n.titleEn,
        descriptionAr: n.descAr,
        descriptionEn: n.descEn,
        link: n.link,
      },
    });
  }

  // 10. Create Activity Logs
  console.log("Creating activity logs...");
  const activities = [
    { email: "admin@jaadbuild.com", event: "COMPANY_CREATED" as const, entity: "Tenant", eid: undefined, descAr: "����� ���� ����� ���������", descEn: "Created Al Ufuq Contracting Company" },
    { email: "admin@jaadbuild.com", event: "USER_INVITED" as const, entity: "User", eid: undefined, descAr: "���� ���� ������� ��������", descEn: "Invited Saleh Al-Otaibi to join" },
    { email: "admin@jaadbuild.com", event: "PROJECT_CREATED" as const, entity: "Project", eid: "project-rawdah", descAr: "����� ����� ���� ������ ������", descEn: "Created Al Rawda Residential Complex project" },
    { email: "owner@ufuq.com", event: "LOGIN" as const, entity: "User", eid: undefined, descAr: "����� ���� ���� �������", descEn: "Saleh Al-Otaibi logged in" },
    { email: "pm@ufuq.com", event: "PROJECT_STATUS_CHANGED" as const, entity: "Project", eid: "project-rawdah", descAr: "����� ���� ����� ���� ������ ������", descEn: "Updated status of Al Rawda Residential Complex" },
    { email: "director@ufuq.com", event: "LOGIN" as const, entity: "User", eid: undefined, descAr: "����� ���� ������� ������", descEn: "Abdullah Al-Saleem logged in" },
  ];

  for (const a of activities) {
    const userId = createdUsers[a.email];
    if (!userId) continue;
    await prisma.activityLog.create({
      data: {
        tenantId: tenant.id,
        userId,
        event: a.event,
        entity: a.entity,
        entityId: a.eid,
        descriptionAr: a.descAr,
        descriptionEn: a.descEn,
        metadata: { source: "seed" },
      },
    });
  }
  // 11. Create Company Profile
  console.log("Creating company profile...");
  await prisma.companyProfile.upsert({
    where: { tenantId: tenant.id },
    update: {},
    create: {
      tenantId: tenant.id,
      aboutAr: "���� ����� ��������� ������ �� ���� ����� �� ���� ��������� ������� �� ������� ������� �������ɡ ����� ������ ����� ������� �� ���� ������� �������.",
      aboutEn: "Al Ufuq Contracting Company is a leading construction company in Saudi Arabia, established to provide integrated services in the construction sector.",
      website: "https://alufuq.com.sa",
      phone: "+966920012345",
      address: "�����֡ �� �����ǡ ���� ����� ���",
      poBox: "12345",
      licenseNumber: "CON-4030214567",
      insuranceNumber: "INS-987654321",
      insuranceExpiry: new Date("2025-12-31"),
      classification: "���",
      classificationGrade: "A",
    },
  });

  // 12. Create Tenant Settings
  console.log("Creating tenant settings...");
  const tenantSettings = [
    { key: "default_language", value: JSON.stringify("ar") },
    { key: "enable_notifications", value: JSON.stringify(true) },
    { key: "auto_generate_project_numbers", value: JSON.stringify(true) },
    { key: "project_number_prefix", value: JSON.stringify("PRJ") },
    { key: "default_profit_margin", value: JSON.stringify(20) },
    { key: "working_days", value: JSON.stringify(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]) },
  ];

  for (const s of tenantSettings) {
    await prisma.tenantSetting.upsert({
      where: { tenantId_key: { tenantId: tenant.id, key: s.key } },
      update: {},
      create: {
        tenantId: tenant.id,
        key: s.key,
        value: s.value,
      },
    });
  }

  // 13. Create Active Subscription
  console.log("Creating subscription...");
  const proPlan = await prisma.subscriptionPlan.findUnique({ where: { code: "build_pro" } });
  if (proPlan) {
    await prisma.subscription.upsert({
      where: { id: "sub-alufuq-pro" },
      update: {},
      create: {
        id: "sub-alufuq-pro",
        tenantId: tenant.id,
        planId: proPlan.id,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2025-12-31"),
        isActive: true,
        autoRenew: true,
        paymentMethod: "bank_transfer",
        paymentRef: "PAY-2024-001",
        amount: 7990,
      },
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
