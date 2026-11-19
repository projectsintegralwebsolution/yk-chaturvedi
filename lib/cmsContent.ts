import prisma from "./prisma";
import { servicesData, ServiceDetail } from "@/data/servicesData";
import { firmData, Partner, Office } from "@/data/firmData";

/**
 * Universal content getter with guaranteed zero-failure fallback
 * Reads dynamically from SQLite (Prisma) when available, falling back seamlessly to static data.
 */

export async function getCmsServices(): Promise<ServiceDetail[]> {
  try {
    const items = await prisma.serviceItem.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (items && items.length > 0) {
      return items.map((item) => ({
        slug: item.slug,
        title: item.title,
        categoryNumber: item.categoryNumber,
        shortDesc: item.shortDesc,
        heroTagline: item.heroTagline,
        bannerImage: item.bannerImage,
        iconName: item.iconName,
        inclusions: JSON.parse(item.inclusions || "[]"),
        strategicBenefits: JSON.parse(item.strategicBenefits || "[]"),
        processSteps: JSON.parse(item.processSteps || "[]"),
        faqs: JSON.parse(item.faqs || "[]"),
        relatedSlugs: JSON.parse(item.relatedSlugs || "[]"),
      }));
    }
  } catch (error) {
    console.warn("[getCmsServices] Fallback to static servicesData:", error);
  }
  return servicesData;
}

export async function getCmsServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  try {
    const item = await prisma.serviceItem.findUnique({
      where: { slug },
    });

    if (item && item.isActive) {
      return {
        slug: item.slug,
        title: item.title,
        categoryNumber: item.categoryNumber,
        shortDesc: item.shortDesc,
        heroTagline: item.heroTagline,
        bannerImage: item.bannerImage,
        iconName: item.iconName,
        inclusions: JSON.parse(item.inclusions || "[]"),
        strategicBenefits: JSON.parse(item.strategicBenefits || "[]"),
        processSteps: JSON.parse(item.processSteps || "[]"),
        faqs: JSON.parse(item.faqs || "[]"),
        relatedSlugs: JSON.parse(item.relatedSlugs || "[]"),
      };
    }
  } catch (error) {
    console.warn(`[getCmsServiceBySlug] Fallback for ${slug}:`, error);
  }
  return servicesData.find((s) => s.slug === slug) || null;
}

export async function getCmsPartners(): Promise<Partner[]> {
  try {
    const items = await prisma.partnerProfile.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (items && items.length > 0) {
      return items.map((item) => ({
        name: item.name,
        designation: item.designation,
        qualification: item.qualification,
        membershipNo: item.membershipNo || undefined,
        experienceYears: item.experienceYears,
        summary: item.summary,
        expertise: JSON.parse(item.expertise || "[]"),
        pastRoles: item.pastRoles ? JSON.parse(item.pastRoles) : undefined,
        phones: JSON.parse(item.phones || "[]"),
        email: item.email,
        image: item.image || undefined,
      }));
    }
  } catch (error) {
    console.warn("[getCmsPartners] Fallback to static firmData.partners:", error);
  }
  return firmData.partners;
}

export async function getCmsSiteSetting<T = any>(key: string, defaultValue: T): Promise<T> {
  try {
    const record = await prisma.siteSetting.findUnique({
      where: { key },
    });
    if (record && record.value) {
      return JSON.parse(record.value) as T;
    }
  } catch (error) {
    console.warn(`[getCmsSiteSetting] Fallback for key ${key}:`, error);
  }
  return defaultValue;
}

export async function getCmsTeam() {
  try {
    const items = await prisma.teamMemberProfile.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    if (items && items.length > 0) {
      return items.map((item) => ({
        ...item,
        phones: item.phones ? JSON.parse(item.phones) : [],
      }));
    }
  } catch (error) {
    console.warn("[getCmsTeam] Fallback to firmData:", error);
  }
  return [firmData.keyPersonnel];
}
