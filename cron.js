const cron = require('node-cron');

console.log("Supabase Pinger Cron Scheduler started.");

// Run at 08:00 and 20:00 every day
cron.schedule('0 8,20 * * *', async () => {
  console.log(`[${new Date().toISOString()}] Triggering scheduled ping...`);
  
  try {
    const response = await fetch('http://localhost:3000/api/ping', {
      method: 'GET',
      headers: {
        'Authorization': process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : undefined
      }
    });
    
    if (response.ok) {
        console.log(`[${new Date().toISOString()}] Scheduled ping executed successfully.`);
    } else {
        console.error(`[${new Date().toISOString()}] Scheduled ping returned status ${response.status}`);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to trigger ping endpoint:`, error);
  }
});
