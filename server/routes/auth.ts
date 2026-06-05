import { Router, Request, Response } from 'express';

const router = Router();

// シンプルなID生成関数
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// シミュレーション用のユーザーストア（実装時はデータベースを使用）
const users: Record<string, any> = {};

/**
 * メール認証でログイン
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // シミュレーション用：ユーザーを検索
    const user = Object.values(users).find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // トークンを生成
    const accessToken = `access_${generateId()}`;
    const refreshToken = `refresh_${generateId()}`;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        authProvider: 'email',
        createdAt: user.createdAt,
        lastLoginAt: Date.now(),
      },
      token: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 3600000, // 1時間
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * メール認証で登録
 * POST /api/auth/register
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
      });
    }

    // シミュレーション用：ユーザーが既に存在するかチェック
    const existingUser = Object.values(users).find((u: any) => u.email === email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    // 新規ユーザーを作成
    const userId = generateId();
    const user = {
      id: userId,
      email,
      password, // 実装時はハッシュ化
      name,
      authProvider: 'email',
      createdAt: Date.now(),
    };

    users[userId] = user;

    // トークンを生成
    const accessToken = `access_${generateId()}`;
    const refreshToken = `refresh_${generateId()}`;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        authProvider: 'email',
        createdAt: user.createdAt,
        lastLoginAt: Date.now(),
      },
      token: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 3600000,
      },
    });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * Google OAuth でログイン
 * POST /api/auth/google
 */
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Google token is required',
      });
    }

    // 実装時：Google APIでトークンを検証
    // const googleUser = await verifyGoogleToken(token);

    // シミュレーション用
    const userId = generateId();
    const user = {
      id: userId,
      email: `user_${userId}@google.com`,
      name: 'Google User',
      authProvider: 'google',
      createdAt: Date.now(),
    };

    users[userId] = user;

    const accessToken = `access_${generateId()}`;
    const refreshToken = `refresh_${generateId()}`;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        authProvider: 'google',
        createdAt: user.createdAt,
        lastLoginAt: Date.now(),
      },
      token: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 3600000,
      },
    });
  } catch (error) {
    console.error('Error with Google auth:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * Apple OAuth でログイン
 * POST /api/auth/apple
 */
router.post('/apple', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Apple token is required',
      });
    }

    // 実装時：Apple APIでトークンを検証
    // const appleUser = await verifyAppleToken(token);

    // シミュレーション用
    const userId = generateId();
    const user = {
      id: userId,
      email: `user_${userId}@apple.com`,
      name: 'Apple User',
      authProvider: 'apple',
      createdAt: Date.now(),
    };

    users[userId] = user;

    const accessToken = `access_${generateId()}`;
    const refreshToken = `refresh_${generateId()}`;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        authProvider: 'apple',
        createdAt: user.createdAt,
        lastLoginAt: Date.now(),
      },
      token: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 3600000,
      },
    });
  } catch (error) {
    console.error('Error with Apple auth:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * トークンをリフレッシュ
 * POST /api/auth/refresh
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // 実装時：トークンの有効性をチェック
    const accessToken = `access_${generateId()}`;
    const newRefreshToken = `refresh_${generateId()}`;

    res.json({
      success: true,
      token: {
        accessToken,
        refreshToken: newRefreshToken,
        expiresAt: Date.now() + 3600000,
      },
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
