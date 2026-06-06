import { Router, Request, Response } from 'express';
import Stripe from 'stripe';

const router = Router();

// 環境変数からStripeシークレットキーを読み込む
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('⚠️ Warning: STRIPE_SECRET_KEY is not set in environment variables');
}

// Stripeクライアントを初期化（キーが設定されている場合）
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

/**
 * 決済セッションの作成
 * POST /api/stripe/create-checkout-session
 */
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe is not configured',
      });
    }

    const { planId, userEmail, userId } = req.body;

    if (!planId || !userEmail || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: planId, userEmail, userId',
      });
    }

    // プラン情報を定義
    const plans: Record<string, { name: string; amount: number; interval: 'month' | 'year' }> = {
      monthly: {
        name: 'Monthly Premium',
        amount: 999, // $9.99
        interval: 'month',
      },
      yearly: {
        name: 'Yearly Premium',
        amount: 9999, // $99.99
        interval: 'year',
      },
    };

    const plan = plans[planId];
    if (!plan) {
      return res.status(400).json({
        success: false,
        error: 'Invalid planId',
      });
    }

    // Stripe決済セッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: 'Ping Pong Master Premium Subscription',
            },
            unit_amount: plan.amount,
            recurring: {
              interval: plan.interval,
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/premium/cancel`,
      customer_email: userEmail,
      metadata: {
        userId,
        planId,
      },
    });

    // データベースにセッション情報を保存（実装例）
    // await db.stripeSession.create({
    //   sessionId: session.id,
    //   userId,
    //   planId,
    //   email: userEmail,
    //   status: 'pending',
    // });

    res.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    });
  }
});

/**
 * Webhook: 購入成功時の処理
 * POST /api/stripe/webhook
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe is not configured',
      });
    }

    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('⚠️ Warning: STRIPE_WEBHOOK_SECRET is not set');
      // Webhook署名検証をスキップ（開発環境用）
    }

    let event;

    if (webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          webhookSecret
        );
      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).json({
          success: false,
          error: 'Webhook signature verification failed',
        });
      }
    } else {
      // 署名検証なし（開発環境用）
      event = JSON.parse(req.body);
    }

    // イベント処理
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planId } = session.metadata as { userId: string; planId: string };

        // プレミアム機能をアンロック
        // await db.subscription.create({
        //   userId,
        //   planId,
        //   stripeSubscriptionId: session.subscription,
        //   status: 'active',
        //   startDate: new Date(),
        // });

        console.log(`✅ Subscription activated for user ${userId}, plan ${planId}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        // プレミアム機能をキャンセル
        // await db.subscription.update({
        //   where: { stripeSubscriptionId: subscription.id },
        //   data: { status: 'canceled' },
        // });

        console.log(`❌ Subscription canceled for user ${userId}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.error(`⚠️ Payment failed for invoice ${invoice.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ success: true, received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process webhook',
    });
  }
});

/**
 * ユーザーのサブスクリプション情報を取得
 * GET /api/stripe/subscription/:userId
 */
router.get('/subscription/:userId', async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe is not configured',
      });
    }

    const { userId } = req.params;

    // データベースからサブスクリプション情報を取得
    // const subscription = await db.subscription.findFirst({
    //   where: { userId, status: 'active' },
    // });

    // Stripe APIからサブスクリプション情報を取得（実装例）
    // const subscriptions = await stripe.subscriptions.list({
    //   metadata: { userId },
    //   limit: 1,
    // });

    res.json({
      success: true,
      subscription: null, // ユーザーがサブスクリプションを持っていない場合
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch subscription',
    });
  }
});

/**
 * サブスクリプションをキャンセル
 * POST /api/stripe/cancel-subscription
 */
router.post('/cancel-subscription', async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe is not configured',
      });
    }

    const { userId, subscriptionId } = req.body;

    if (!userId || !subscriptionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, subscriptionId',
      });
    }

    // Stripeでサブスクリプションをキャンセル
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId as string, {
      cancel_at_period_end: true,
    });

    // データベースでサブスクリプションをキャンセル
    // await db.subscription.update({
    //   where: { id: subscriptionId },
    //   data: { status: 'canceled' },
    // });

    res.json({
      success: true,
      message: 'Subscription canceled successfully',
      subscription: canceledSubscription,
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel subscription',
    });
  }
});

/**
 * 顧客ポータルを作成（サブスクリプション管理用）
 * POST /api/stripe/create-portal-session
 */
router.post('/create-portal-session', async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe is not configured',
      });
    }

    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: customerId',
      });
    }

    // 顧客ポータルセッションを作成
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/profile`,
    });

    res.json({
      success: true,
      url: portalSession.url,
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create portal session',
    });
  }
});

export default router;
