export interface ProPlayer {
  id: string;
  name: string;
  country: string;
  team: string;
  worldRanking: number;
  hand: 'right' | 'left';
  grip: 'penhold' | 'shakehand';
  playingStyle: string;
  tactics: ProPlayerTactic[];
  bio: string;
  achievements: string[];
}

export interface ProPlayerTactic {
  name: string;
  description: string;
  usage: string;
  effectiveness: 'high' | 'medium' | 'low';
}

export const proPlayers: ProPlayer[] = [
  {
    id: 'fan-zhendong',
    name: 'ファン・ジェンドン',
    country: '中国',
    team: '中国国家代表チーム',
    worldRanking: 1,
    hand: 'right',
    grip: 'shakehand',
    playingStyle: 'オールラウンダー・攻撃型',
    bio: '中国の若きエースで、攻撃的なプレースタイルが特徴。フォアハンドの威力が非常に高く、ラリーの主導権を握る能力に優れている。',
    tactics: [
      {
        name: 'フォアハンド攻撃',
        description: 'ループドライブやカウンターアタックで相手の弱いボールを積極的に攻撃',
        usage: 'ラリーの主導権を握る際に多用。相手のミスを誘発する',
        effectiveness: 'high',
      },
      {
        name: 'ミドル攻撃',
        description: 'フォア・バック両サイドの中央部分を狙った攻撃で相手を揺さぶる',
        usage: 'バックハンドが強い相手に対して有効。相手の体勢を崩す',
        effectiveness: 'high',
      },
      {
        name: '短いボールへの対応',
        description: 'ネット際の短いボールに対して素早く前に出てフリックやチキータで攻撃',
        usage: '相手の守備を崩す。積極的な攻撃姿勢を示す',
        effectiveness: 'high',
      },
      {
        name: 'バックハンドループ',
        description: 'バックハンドでループドライブを打ち、相手の攻撃を受け流しながら反撃',
        usage: '守備的な場面で使用。相手の攻撃を防ぎながら主導権を奪う',
        effectiveness: 'medium',
      },
      {
        name: 'サーブ・レシーブ戦術',
        description: 'サーブの種類を多く用意し、レシーブも積極的に攻撃する',
        usage: 'ラリーの初期段階で有利な状況を作る',
        effectiveness: 'high',
      },
    ],
    achievements: [
      'ITTF世界ランキング1位',
      'オリンピック金メダル',
      'ワールドツアー複数優勝',
    ],
  },
  {
    id: 'ma-long',
    name: 'マー・ロン',
    country: '中国',
    team: '中国国家代表チーム',
    worldRanking: 5,
    hand: 'right',
    grip: 'shakehand',
    playingStyle: 'オールラウンダー・バランス型',
    bio: '中国の大ベテラン。バランスの取れたプレースタイルと試合経験の豊富さが特徴。多くの大会で優勝経験を持つ。',
    tactics: [
      {
        name: 'バックハンド攻撃',
        description: 'バックハンドループドライブやカウンター攻撃で相手を圧倒',
        usage: 'ラリーの主導権を握る。相手の強いボールにも対応',
        effectiveness: 'high',
      },
      {
        name: 'サーブの多様性',
        description: '下回転、横回転、無回転など多くのサーブを使い分ける',
        usage: 'レシーバーを惑わす。ラリーの初期段階で有利を得る',
        effectiveness: 'high',
      },
      {
        name: 'ペースの変化',
        description: 'ゆっくりしたボールと速いボールを交互に打ち、相手のリズムを崩す',
        usage: '相手の集中力を散らす。ミスを誘発する',
        effectiveness: 'medium',
      },
      {
        name: 'ネット際の処理',
        description: 'ネット際の短いボールに対して丁寧に処理し、相手の攻撃を防ぐ',
        usage: '守備的な場面で使用。相手の攻撃を受け流す',
        effectiveness: 'high',
      },
      {
        name: 'ラリーの粘り強さ',
        description: '何度もラリーを続けることで相手の集中力を奪う',
        usage: '長いラリーで相手を疲れさせる。ミスを待つ',
        effectiveness: 'medium',
      },
    ],
    achievements: [
      'オリンピック金メダル複数回',
      'ワールドカップ優勝',
      'ワールドツアー多数優勝',
    ],
  },
  {
    id: 'xu-xin',
    name: 'シュー・シン',
    country: '中国',
    team: '中国国家代表チーム',
    worldRanking: 8,
    hand: 'right',
    grip: 'shakehand',
    playingStyle: 'テクニシャン・戦術型',
    bio: '中国の技術派プレイヤー。多彩なテクニックと戦術眼が特徴。相手の弱点を見極め、それを徹底的に攻撃する。',
    tactics: [
      {
        name: 'チキータ',
        description: 'ネット際の短い下回転ボールに対して、ラケットを立てて攻撃的に処理',
        usage: '相手の守備を崩す。積極的な攻撃姿勢を示す',
        effectiveness: 'high',
      },
      {
        name: 'フリック',
        description: 'ネット際のボールを素早くラケットで弾いて攻撃',
        usage: '相手のネット際の攻撃を防ぎながら反撃する',
        effectiveness: 'high',
      },
      {
        name: 'ツッツキ',
        description: '下回転ボールに対して、ツッツキで返球し相手を揺さぶる',
        usage: '相手の攻撃を防ぐ。相手のミスを誘発する',
        effectiveness: 'medium',
      },
      {
        name: 'ブロック',
        description: '相手の強い攻撃に対して、ラケットを立てて守備的に処理',
        usage: '相手の攻撃を防ぎながら、反撃の機会を伺う',
        effectiveness: 'high',
      },
      {
        name: 'サーブ・レシーブ戦術',
        description: 'サーブの種類を多く用意し、相手の弱点を狙う',
        usage: 'ラリーの初期段階で有利な状況を作る',
        effectiveness: 'high',
      },
    ],
    achievements: [
      'ワールドツアー多数優勝',
      'オリンピック団体金メダル',
      'ワールドカップ出場多数',
    ],
  },
  {
    id: 'dimitrij-ovtcharov',
    name: 'ディミトリ・オフチャロフ',
    country: 'ドイツ',
    team: 'ドイツ国家代表チーム',
    worldRanking: 12,
    hand: 'right',
    grip: 'shakehand',
    playingStyle: 'オールラウンダー・攻撃型',
    bio: 'ドイツの攻撃的なプレイヤー。フォアハンドの威力が高く、積極的な攻撃姿勢が特徴。ヨーロッパを代表する選手。',
    tactics: [
      {
        name: 'フォアハンド攻撃',
        description: 'ループドライブやカウンターアタックで相手を圧倒',
        usage: 'ラリーの主導権を握る。相手のミスを誘発する',
        effectiveness: 'high',
      },
      {
        name: 'ミドル攻撃',
        description: 'フォア・バック両サイドの中央部分を狙った攻撃',
        usage: 'バックハンドが強い相手に対して有効',
        effectiveness: 'high',
      },
      {
        name: 'サーブの威力',
        description: 'スピードのあるサーブで相手を圧倒',
        usage: 'ラリーの初期段階で有利を得る',
        effectiveness: 'high',
      },
      {
        name: 'バックハンド守備',
        description: 'バックハンドで相手の攻撃を受け流しながら守備',
        usage: '守備的な場面で使用。相手の攻撃を防ぐ',
        effectiveness: 'medium',
      },
      {
        name: 'ペースの変化',
        description: 'ゆっくりしたボールと速いボールを交互に打つ',
        usage: '相手のリズムを崩す。ミスを誘発する',
        effectiveness: 'medium',
      },
    ],
    achievements: [
      'ヨーロッパチャンピオンシップ優勝',
      'ワールドツアー複数優勝',
      'オリンピック出場',
    ],
  },
  {
    id: 'hugo-calderano',
    name: 'ウーゴ・カルデラーノ',
    country: 'ブラジル',
    team: 'ブラジル国家代表チーム',
    worldRanking: 7,
    hand: 'right',
    grip: 'shakehand',
    playingStyle: 'オールラウンダー・攻撃型',
    bio: 'ブラジルの若き才能。攻撃的なプレースタイルと高い技術力が特徴。南米を代表する選手として急速に成長している。',
    tactics: [
      {
        name: 'フォアハンド攻撃',
        description: 'ループドライブやカウンターアタックで相手を圧倒',
        usage: 'ラリーの主導権を握る。相手のミスを誘発する',
        effectiveness: 'high',
      },
      {
        name: 'バックハンド攻撃',
        description: 'バックハンドループドライブで相手を攻撃',
        usage: 'ラリーの主導権を握る。相手の強いボールにも対応',
        effectiveness: 'high',
      },
      {
        name: 'チキータ',
        description: 'ネット際の短い下回転ボールに対して攻撃的に処理',
        usage: '相手の守備を崩す。積極的な攻撃姿勢を示す',
        effectiveness: 'high',
      },
      {
        name: 'サーブの多様性',
        description: '下回転、横回転、無回転など多くのサーブを使い分ける',
        usage: 'レシーバーを惑わす。ラリーの初期段階で有利を得る',
        effectiveness: 'high',
      },
      {
        name: 'ペースの変化',
        description: 'ゆっくりしたボールと速いボールを交互に打つ',
        usage: '相手のリズムを崩す。ミスを誘発する',
        effectiveness: 'medium',
      },
    ],
    achievements: [
      'ワールドツアー複数優勝',
      'オリンピック出場',
      'ワールドランキング7位',
    ],
  },
];

export const proPlayerCategories = [
  { id: 'top10', name: 'TOP10', description: '世界ランキング10位以内' },
  { id: 'asia', name: 'アジア選手', description: 'アジア地域の主要選手' },
  { id: 'europe', name: 'ヨーロッパ選手', description: 'ヨーロッパ地域の主要選手' },
  { id: 'americas', name: 'アメリカ大陸', description: 'アメリカ大陸の主要選手' },
];
