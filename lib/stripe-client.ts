/**
 * Stripe決済クライアント（買い切り型）
 * フロントエンドから決済処理を実行するためのユーティリティ
 */

export type CheckoutSessionResponse = {
  success: boolean;
  sessionId?: string;
  checkoutUrl?: string;
  error?: string;
};

export type PurchaseResponse = {
  success: boolean;
  purchase?: {
    id: string;
    userId: string;
    planId: string;
    status: 'completed' | 'pending' | 'failed';
    purchaseDate: number;
    amount: number;
    currency: string;
  };
  error?: string;
};

/**
 * 決済セッションを作成（買い切り型）
 */
export async function createCheckoutSession(
  planId: string,
  userEmail: string,
  userId: string
): Promise<CheckoutSessionResponse> {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        userEmail,
        userId,
        billingType: 'onetime', // 買い切り型を指定
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * ユーザーの購入情報を取得
 */
export async function getPurchase(userId: string): Promise<PurchaseResponse> {
  try {
    const response = await fetch(`/api/stripe/purchase/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching purchase:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * 購入を記録（Webhook用）
 */
export async function recordPurchase(
  userId: string,
  planId: string,
  amount: number,
  currency: string
): Promise<PurchaseResponse> {
  try {
    const response = await fetch('/api/stripe/record-purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        planId,
        amount,
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error recording purchase:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * 決済URLを開く（実装例）
 */
export async function openCheckout(checkoutUrl: string): Promise<void> {
  try {
    // モバイルアプリではWebViewまたはブラウザで開く
    // Webではwindow.location.hrefで遷移
    if (typeof window !== 'undefined') {
      window.location.href = checkoutUrl;
    }
  } catch (error) {
    console.error('Error opening checkout:', error);
  }
}
