// Change this to your actual API endpoint
const API_ENDPOINT = "https://home.timcloud.uk/api/bookmarks";

// Called whenever a bookmark is created
browser.bookmarks.onCreated.addListener(async (id, bookmark) => {
  try {
    // Some bookmark events can be folders; we only care about actual URLs.
    if (!bookmark.url) {
      return;
    }

    const payload =   {
        "title": bookmark.title,
        "url": bookmark.url,
        "groupName": "From Browser"
    }    
    
    await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aW0iLCJpYXQiOjE3NjY3OTI0MjEsImV4cCI6MTc2ODAwMjAyMX0.F4xpy0vqUgWshOxpKRaV_b-ZLgelOejHNNKnK7uIpg8"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Failed to send bookmark to API", err);
  }
});
