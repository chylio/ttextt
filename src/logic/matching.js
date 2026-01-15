import { LEVEL_RANK } from "../data/constants";

export const calculateBestDoctor = (selectedItems, doctorList) => {
  if (selectedItems.length === 0) return null;

  const requiredRank = selectedItems.reduce((max, item) => {
    return LEVEL_RANK[item.minLevel] > max ? LEVEL_RANK[item.minLevel] : max;
  }, 0);

  const targetCategory = selectedItems[0].category;

  const scoredList = doctorList
    .filter((doc) => LEVEL_RANK[doc.level] >= requiredRank)
    .filter((doc) => doc.dailyCount < 5)
    .map((doc) => {
      let score = 0;
      const reasons = [];

      reasons.push(`符合 ${selectedItems[0].minLevel} 以上看診權限`);

      if (doc.dept.toLowerCase().includes(targetCategory)) {
        score += 35;
        reasons.push(`${doc.dept} 專案背景適配`);
      }

      const target = doc.targets[targetCategory] || 5;
      const current = doc.current[targetCategory] || 0;
      const gap = target - current;

      if (gap > 0) {
        score += gap * 25;
        reasons.push(`優先配對達成每月教育指標 (剩餘 ${gap} 例)`);
      }

      const remainingDaily = 5 - doc.dailyCount;
      score += remainingDaily * 10;

      const rankDiff = LEVEL_RANK[doc.level] - requiredRank;
      score -= rankDiff * 20;

      return { ...doc, matchScore: score, aiReasons: reasons };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return scoredList[0] || "NONE";
};
