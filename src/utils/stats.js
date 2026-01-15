import { LEVEL_RANK } from "../data/constants";

export const buildClinicStats = (intervalDays) => ({
  total: Math.floor(intervalDays * 18.5),
  os: Math.floor(intervalDays * 4.2),
  endo: Math.floor(intervalDays * 5.8),
  pros: Math.floor(intervalDays * 3.5),
  gen: Math.floor(intervalDays * 5.0),
});

export const buildDoctorRangeStats = (doctors, intervalDays) =>
  doctors.map((doc) => {
    const personalMultiplier = LEVEL_RANK[doc.level] * 0.4 + 1.1;
    const totalCount = Math.floor(intervalDays * 2.5 * personalMultiplier);

    return {
      id: doc.id,
      total: totalCount,
      cases: {
        os: doc.dept === "OS" ? Math.floor(totalCount * 0.5) : Math.floor(totalCount * 0.1),
        endo: doc.dept === "Endo" ? Math.floor(totalCount * 0.5) : Math.floor(totalCount * 0.15),
        pros: doc.dept === "Pros" ? Math.floor(totalCount * 0.5) : Math.floor(totalCount * 0.1),
        gen: Math.floor(totalCount * 0.2),
      },
    };
  });
