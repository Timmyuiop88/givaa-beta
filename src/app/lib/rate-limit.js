const requests = new Map();

export async function rateLimit(identifier) {
  const now = Date.now();
  const windowMs = 30 * 1000; // 30 seconds
  const maxRequests = 5; // 5 requests per window
  
  // Get or create request log for this IP
  const requestLog = requests.get(identifier) || [];
  
  // Remove old requests outside current window
  const recentRequests = requestLog.filter(time => time > now - windowMs);
  
  // Check if rate limit exceeded
  if (recentRequests.length >= maxRequests) {
    return { success: false };
  }
  
  // Add current request
  recentRequests.push(now);
  requests.set(identifier, recentRequests);
  
  return { 
    success: true,
    remaining: maxRequests - recentRequests.length 
  };
} 