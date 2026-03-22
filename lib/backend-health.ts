/**
 * Backend health check utility
 * Verifies if the backend is online and responsive
 */

export interface BackendStatus {
  online: boolean;
  error?: string;
  timestamp?: number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const HEALTH_CHECK_TIMEOUT = 5000; // 5 seconds

/**
 * Check backend health status with timeout
 * Returns true if backend is online, false otherwise
 */
export async function checkBackendStatus(): Promise<BackendStatus> {
  if (!BACKEND_URL) {
    return {
      online: false,
      error: 'Backend URL not configured',
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT);

    const response = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok || response.status === 404 || response.status === 405) {
      // Server is responding (even 404/405 means it's online)
      return {
        online: true,
        timestamp: Date.now(),
      };
    }

    return {
      online: false,
      error: `Backend responded with status ${response.status}`,
      timestamp: Date.now(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      online: false,
      error: errorMessage.includes('abort')
        ? 'Backend health check timeout (5s)'
        : `Backend error: ${errorMessage}`,
      timestamp: Date.now(),
    };
  }
}

/**
 * Make a request to the backend query endpoint
 */
export async function queryBackend(query: string): Promise<{
  success: boolean;
  response?: string;
  error?: string;
}> {
  if (!BACKEND_URL) {
    return {
      success: false,
      error: 'Backend URL not configured',
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout for queries

    const response = await fetch(`${BACKEND_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        success: false,
        error: `Backend error: ${response.statusText}`,
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      response: data.response || data.message || JSON.stringify(data),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    if (errorMessage.includes('abort')) {
      return {
        success: false,
        error: 'Assistant offline - request timeout (10s)',
      };
    }

    return {
      success: false,
      error: `Assistant offline - ${errorMessage}`,
    };
  }
}
