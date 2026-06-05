import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: string;
  email: string;
  name: string;
  authProvider: 'email' | 'google' | 'apple';
  createdAt: number;
  lastLoginAt: number;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

const USER_KEY = 'ping_pong_user';
const TOKEN_KEY = 'ping_pong_token';

/**
 * ユーザーをログイン状態で保存
 */
export async function saveUser(user: User, token: AuthToken): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

/**
 * 現在のユーザーを取得
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * 認証トークンを取得
 */
export async function getAuthToken(): Promise<AuthToken | null> {
  try {
    const data = await AsyncStorage.getItem(TOKEN_KEY);
    if (!data) return null;

    const token = JSON.parse(data);

    // トークンの有効期限をチェック
    if (token.expiresAt < Date.now()) {
      // トークンが期限切れの場合はリフレッシュ
      const refreshed = await refreshAuthToken(token.refreshToken);
      if (refreshed) {
        return refreshed;
      }
      // リフレッシュ失敗時はログアウト
      await logout();
      return null;
    }

    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

/**
 * メール認証でログイン
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    const { user, token } = await response.json();
    await saveUser(user, token);

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * メール認証で登録
 */
export async function registerWithEmail(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    const { user, token } = await response.json();
    await saveUser(user, token);

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Google OAuth でログイン
 */
export async function loginWithGoogle(
  googleToken: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    const { user, token } = await response.json();
    await saveUser(user, token);

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Apple OAuth でログイン
 */
export async function loginWithApple(
  appleToken: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch('/api/auth/apple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: appleToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    const { user, token } = await response.json();
    await saveUser(user, token);

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * トークンをリフレッシュ
 */
export async function refreshAuthToken(refreshToken: string): Promise<AuthToken | null> {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const { token } = await response.json();
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));

    return token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

/**
 * ログアウト
 */
export async function logout(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

/**
 * ユーザーがログインしているかチェック
 */
export async function isLoggedIn(): Promise<boolean> {
  const user = await getCurrentUser();
  const token = await getAuthToken();
  return !!user && !!token;
}
