// Generates dummy contribution data (heatmap format) for the past 3 months
export function generateDummyEvents() {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 90);

  // Align start to the nearest previous Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks = [];
  let current = new Date(startDate);

  while (current <= today) {
    const week = { contributionDays: [] };
    for (let i = 0; i < 7; i++) {
      const dateStr = current.toISOString().split("T")[0];
      const count = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 4) + 1; // 0 to 4 contributions
      week.contributionDays.push({
        date: dateStr,
        contributionCount: count,
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks };
}
