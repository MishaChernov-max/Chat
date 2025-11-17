class DailyService {
  async createRoom() {
    const response = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: { max_participants: 2 },
      }),
    });
    return await response.json();
  }
}
export default new DailyService();
