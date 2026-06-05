/**
 * Stripe決済クライアント
 * フロントエンドから決済処理を実行するためのユーティリティ
 */

export type CheckoutSessionResponse = {
  success: boolean;
  sessionId?: string;
  checkoutUrl?: string;
  error?: string;
};

export type SubscriptionResponse = {
  success: boolean;
  subscription?: {
    id: string;
    userId: string;
    planId: string;
    status: 'active' | 'canceled' | 'expired';
    startDate: number;
    endDate: number;
  };
  error?: string;
};

/**
 * 決済セッションを作成
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
 * ユーザーのサブスクリプション情報を取得
 */
export async function getSubscription(userId: string): Promise<SubscriptionResponse> {
  try {
    const response = await fetch(`/api/stripe/subscription/${userId}`, {
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
    console.error('Error fetching subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * サブスクリプションをキャンセル
 */
export async function cancelSubscription(
  userId: string,
  subscriptionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/stripe/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        subscriptionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
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
