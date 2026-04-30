export const prepareGrowthData = (users: any[]) => {
    const chartDataMap = users.reduce((acc: Record<string, number>, user: any) => {
      const date = new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
  
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(chartDataMap)
      .map(([date, count]) => ({
        date,
        count: Number(count),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };