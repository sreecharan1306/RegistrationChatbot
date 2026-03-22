/**
 * Session management utilities for storing user data in sessionStorage
 */

export interface IGRSUser {
  name: string;
  email: string;
  phone: string;
  isRecruiter: boolean;
}

const SESSION_KEY = 'igrs_user';
const CHAT_HISTORY_KEY = 'igrs_chat_history';

/**
 * Get user from sessionStorage
 */
export function getUser(): IGRSUser | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const user = sessionStorage.getItem(SESSION_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading user from sessionStorage:', error);
    return null;
  }
}

/**
 * Save user to sessionStorage
 */
export function setUser(
  name: string,
  email: string,
  phone: string,
  isRecruiter: boolean
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const user: IGRSUser = { name, email, phone, isRecruiter };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to sessionStorage:', error);
  }
}

/**
 * Clear user from sessionStorage
 */
export function clearUser(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
}

/**
 * Get chat history from sessionStorage
 */
export function getChatHistory(): Array<{ role: 'user' | 'bot'; message: string }> {
  if (typeof window === 'undefined') return [];
  
  try {
    const history = sessionStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading chat history from sessionStorage:', error);
    return [];
  }
}

/**
 * Add message to chat history
 */
export function addToChatHistory(role: 'user' | 'bot', message: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getChatHistory();
    history.push({ role, message });
    sessionStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error adding to chat history:', error);
  }
}

/**
 * Clear chat history
 */
export function clearChatHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
}
