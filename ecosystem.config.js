module.exports = {
  apps: [
    {
      name: "supabase-pinger-web",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/botuser/supabase-pinger",
      env: {
        PORT: 3001,
        NODE_ENV: "production",
        SUPABASE_1_URL: "https://fwooyvwjhoggqxrwsrgm.supabase.co",
        SUPABASE_1_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3b295dndqaG9nZ3F4cndzcmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5Njk3NzAsImV4cCI6MjA4MzU0NTc3MH0.kH4_--7W9RyKy4-nrQdS9yCLeXtkgcg_6VXYsWLHmKw",
        SUPABASE_2_URL: "https://btncqsmlcahvboezqdlc.supabase.co",
        SUPABASE_2_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bmNxc21sY2FodmJvZXpxZGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MTI0NjIsImV4cCI6MjA4NTQ4ODQ2Mn0.P-Oik0nuPGXEHtaUAiTfqOR9JM25uEPzy47Ztf-IKQ0",
        SUPABASE_3_URL: "https://uabuhtrtommkfmlhseul.supabase.co",
        SUPABASE_3_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYnVodHJ0b21ta2ZtbGhzZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Njc1MjAsImV4cCI6MjA4NjI0MzUyMH0.gadkaVX40vUDEpDM5N7CqllKU9OLwEad-V1KjlMLzmc",
        SUPABASE_4_URL: "https://jhsvcmrdzwtjdbvglnjs.supabase.co",
        SUPABASE_4_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoc3ZjbXJkend0amRidmdsbmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MTkwNzIsImV4cCI6MjA5MDI5NTA3Mn0.OyIY7ymCCwOEvwM6l1vkhOJEySrDKlmVoZHMSzHjJA0",
      }
    },
    {
      name: "supabase-pinger-cron",
      script: "cron.js",
      cwd: "/home/botuser/supabase-pinger",
      env: {
        NODE_ENV: "production",
        SUPABASE_1_URL: "https://fwooyvwjhoggqxrwsrgm.supabase.co",
        SUPABASE_1_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3b295dndqaG9nZ3F4cndzcmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5Njk3NzAsImV4cCI6MjA4MzU0NTc3MH0.kH4_--7W9RyKy4-nrQdS9yCLeXtkgcg_6VXYsWLHmKw",
        SUPABASE_2_URL: "https://btncqsmlcahvboezqdlc.supabase.co",
        SUPABASE_2_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bmNxc21sY2FodmJvZXpxZGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MTI0NjIsImV4cCI6MjA4NTQ4ODQ2Mn0.P-Oik0nuPGXEHtaUAiTfqOR9JM25uEPzy47Ztf-IKQ0",
        SUPABASE_3_URL: "https://uabuhtrtommkfmlhseul.supabase.co",
        SUPABASE_3_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYnVodHJ0b21ta2ZtbGhzZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Njc1MjAsImV4cCI6MjA4NjI0MzUyMH0.gadkaVX40vUDEpDM5N7CqllKU9OLwEad-V1KjlMLzmc",
        SUPABASE_4_URL: "https://jhsvcmrdzwtjdbvglnjs.supabase.co",
        SUPABASE_4_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoc3ZjbXJkend0amRidmdsbmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MTkwNzIsImV4cCI6MjA5MDI5NTA3Mn0.OyIY7ymCCwOEvwM6l1vkhOJEySrDKlmVoZHMSzHjJA0",
      }
    }
  ]
};
