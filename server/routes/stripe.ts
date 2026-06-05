import { Router, Request, Response } from 'express';

const router = Router();

/**
 * 決済セッションの作成
 * POST /api/stripe/create-checkout-session
 */
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { planId, userEmail, userId } = req.body;

    if (!planId || !userEmail || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: planId, userEmail, userId',
      });
    }

    // 本格的なStripe統合では、ここでStripe APIを呼び出します
    // 例: const session = await stripe.checkout.sessions.create({ ... });

    // シミュレーション用の応答
    const sessionId = `cs_${Date.now()}`;
    const checkoutUrl = `https://checkout.stripe.com/pay/${sessionId}`;

    // データベースにセッション情報を保存
    // await db.stripeSession.create({
    //   sessionId,
    //   userId,
    //   planId,
    //   email: userEmail,
    //   status: 'pending',
    // });

    res.json({
      success: true,
      sessionId,
      checkoutUrl,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session',
    });
  }
});

/**
 * 購入成功時のコールバック
 * POST /api/stripe/webhook
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    if (type === 'checkout.session.completed') {
      const { sessionId, userId, planId } = data;

      // データベースにサブスクリプション情報を保存
      // await db.subscription.create({
      //   userId,
      //   planId,
      //   status: 'active',
      //   startDate: new Date(),
      //   endDate: calculateEndDate(planId),
      // });

      res.json({ success: true });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process webhook',
    });
  }
});

/**
 * ユーザーのサブスクリプション情報を取得
 * GET /api/stripe/subscription/:userId
 */
router.get('/subscription/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // データベースからサブスクリプション情報を取得
    // const subscription = await db.subscription.findFirst({
    //   where: { userId, status: 'active' },
    // });

    // シミュレーション用の応答
    res.json({
      success: true,
      subscription: null, // ユーザーがサブスクリプションを持っていない場合
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription',
    });
  }
});

/**
 * サブスクリプションをキャンセル
 * POST /api/stripe/cancel-subscription
 */
router.post('/cancel-subscription', async (req: Request, res: Response) => {
  try {
    const { userId, subscriptionId } = req.body;

    if (!userId || !subscriptionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, subscriptionId',
      });
    }

    // データベースでサブスクリプションをキャンセル
    // await db.subscription.update({
    //   where: { id: subscriptionId },
    //   data: { status: 'canceled' },
    // });

    res.json({
      success: true,
      message: 'Subscription canceled successfully',
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription',
    });
  }
});

export default router;
