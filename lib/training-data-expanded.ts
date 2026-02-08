/**
 * 卓球練習メニュー・トレーニングデータベース（拡張版）
 * 初心者から上級者までの段階別練習メニューを網羅的に定義
 */

export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type TrainingType = "single-ball" | "multi-ball" | "random" | "match" | "footwork" | "pattern";

export interface TrainingMenuExpanded {
  id: string;
  name: string;
  skillLevel: SkillLevel;
  trainingType: TrainingType;
  duration: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  objectives: string[];
  procedure: string[];
  tips: string[];
  requiredEquipment: string[];
  variations: string[];
  benefits?: string[];
  precautions?: string[];
}

// 初心者向け練習メニュー（11種類）
export const BEGINNER_TRAINING_MENUS: TrainingMenuExpanded[] = [
  {
    id: "beginner-forehand-backhand-switch",
    name: "フォアハンド・バックハンド切り替え",
    skillLevel: "beginner",
    trainingType: "footwork",
    duration: "20分",
    difficulty: 2,
    description: "フォアハンドとバックハンドを交互に打ち分ける基本的な練習。現代卓球の基本中の基本。",
    objectives: [
      "両ハンドを策して打つ能力を高める",
      "フォアとバック間の粗い足を動かす",
      "テンポを上げる練習"
    ],
    procedure: [
      "相手にフォアサイドとバックサイドへ交互に返球してもらう",
      "初めはゆっくりとしたテンポで実施",
      "慣れるにつれて、段々とテンポを上げる"
    ],
    tips: [
      "毎指を中心に握る",
      "肩の力を抜いて、足を主体で動かす",
      "1打ごとに残心の構えに戻る"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "マシン練習で実施",
      "高速で実施",
      "強い球を打ち返す"
    ],
    benefits: [
      "現代卓球の基本技術を習得",
      "両ハンドのバランスを改善",
      "対応能力を高める"
    ]
  },
  {
    id: "beginner-footwork-2point",
    name: "2点フットワーク練習",
    skillLevel: "beginner",
    trainingType: "footwork",
    duration: "15分",
    difficulty: 2,
    description: "フォアサイドとミドルの間、またはバックサイドとミドルの間を行き来する練習。",
    objectives: [
      "フットワークの基本を習得",
      "左右への素早い移動能力",
      "バランス感覚の向上"
    ],
    procedure: [
      "フォアサイドとミドルへ交互に返球してもらう",
      "小さく素早い足の動きを意識",
      "ボールの到着に合わせて位置を調整"
    ],
    tips: [
      "常に膝を軽く曲げた状態を保つ",
      "つま先で小刻みに動く",
      "ラケットは常に構えた状態を保つ"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "3点フットワークに発展",
      "ランダムコースで実施",
      "多球練習で強度を上げる"
    ],
    benefits: [
      "フットワークの基本を習得",
      "素早い移動能力を向上",
      "試合での対応力を高める"
    ]
  },
  {
    id: "beginner-serve-3rd-ball",
    name: "サーブ3球目練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 2,
    description: "自分のサーブから始まる試合に近い状況を作る練習。サーブの精度向上と3球目攻撃の習得。",
    objectives: [
      "サーブの精度向上",
      "3球目攻撃の習得",
      "試合に近い状況での対応力"
    ],
    procedure: [
      "自分がサーブを出す",
      "相手のレシーブを受ける",
      "3球目で攻撃を仕掛ける"
    ],
    tips: [
      "ミスした場合は再度サーブから開始",
      "同じコースのサーブを繰り返す",
      "精度を重視する"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるサーブを使用",
      "ランダムレシーブで対応",
      "複数のパターンを練習"
    ],
    benefits: [
      "サーブの精度を向上",
      "試合での得点パターンを習得",
      "自信を持ってプレーできる"
    ]
  },
  {
    id: "beginner-block-practice",
    name: "ブロック練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 1,
    description: "相手の攻撃を受け止めるブロック技術の基本を習得する練習。",
    objectives: [
      "ブロック技術の習得",
      "ラケットの角度調整",
      "相手の攻撃への対応力"
    ],
    procedure: [
      "相手に強い球を打ってもらう",
      "ラケットで受け止める",
      "軽く返球する"
    ],
    tips: [
      "ラケットの面を調整する",
      "肘を固定する",
      "ボールの勢いを利用する"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアブロック",
      "バックブロック",
      "多球練習で強度を上げる"
    ],
    benefits: [
      "守備技術を習得",
      "相手の攻撃に対応できる",
      "ラリーを継続できる"
    ]
  },
  {
    id: "beginner-counter-attack",
    name: "カウンター攻撃練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 2,
    description: "相手の攻撃に対して、タイミングよく攻撃を仕掛けるカウンター技術の習得。",
    objectives: [
      "カウンター技術の習得",
      "タイミングの習得",
      "攻撃的な返球"
    ],
    procedure: [
      "相手に攻撃を仕掛けてもらう",
      "ボールの頂点で打つ",
      "強く返球する"
    ],
    tips: [
      "タイミングが重要",
      "ラケットを引きすぎない",
      "足を動かして位置を調整"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアカウンター",
      "バックカウンター",
      "異なる回転への対応"
    ],
    benefits: [
      "攻撃的なプレーができる",
      "試合での得点機会を増やす",
      "相手を圧倒できる"
    ]
  },
  {
    id: "beginner-tsutsuki-practice",
    name: "ツッツキ練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 1,
    description: "台上の短いボールを処理するツッツキ技術の習得。",
    objectives: [
      "ツッツキ技術の習得",
      "台上での対応力",
      "下回転への対応"
    ],
    procedure: [
      "相手に台上の短いボールを送ってもらう",
      "ラケットで軽く下に押す",
      "相手コートに返球"
    ],
    tips: [
      "ラケットの角度を調整",
      "力を入れすぎない",
      "ボールの下を捉える"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアツッツキ",
      "バックツッツキ",
      "攻撃的なツッツキ"
    ],
    benefits: [
      "台上の短いボールに対応",
      "ラリーを継続できる",
      "得点機会を作れる"
    ]
  },
  {
    id: "beginner-backhand-drive",
    name: "バックハンドドライブ基本",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 2,
    description: "バックハンドドライブの基本的な打ち方を習得する練習。",
    objectives: [
      "バックハンドドライブの習得",
      "正しいフォームの確立",
      "安定した返球"
    ],
    procedure: [
      "バックサイドにボールを送ってもらう",
      "腰から回転させて打つ",
      "フォロースルーを完成させる"
    ],
    tips: [
      "肘を固定する",
      "腰の回転を使う",
      "ラケットの面を調整"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "強いドライブ",
      "回転量の多いドライブ",
      "ランダムコースでの実施"
    ],
    benefits: [
      "バックハンドの攻撃力を向上",
      "両ハンドでの攻撃が可能",
      "試合での得点機会を増やす"
    ]
  },
  {
    id: "beginner-forehand-drive",
    name: "フォアハンドドライブ基本",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 2,
    description: "フォアハンドドライブの基本的な打ち方を習得する練習。",
    objectives: [
      "フォアハンドドライブの習得",
      "正しいフォームの確立",
      "安定した返球"
    ],
    procedure: [
      "フォアサイドにボールを送ってもらう",
      "腰から回転させて打つ",
      "フォロースルーを完成させる"
    ],
    tips: [
      "肘を固定する",
      "腰の回転を使う",
      "ラケットの面を調整"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "強いドライブ",
      "回転量の多いドライブ",
      "ランダムコースでの実施"
    ],
    benefits: [
      "フォアハンドの攻撃力を向上",
      "安定した返球ができる",
      "試合での得点機会を増やす"
    ]
  },
  {
    id: "beginner-loop-drive",
    name: "ループドライブ練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 2,
    description: "下回転ボールに対して、ループドライブで返球する練習。",
    objectives: [
      "ループドライブの習得",
      "下回転への対応",
      "攻撃的な返球"
    ],
    procedure: [
      "相手に下回転ボールを送ってもらう",
      "ラケットを下から上へ振る",
      "ネットを越えて返球"
    ],
    tips: [
      "ラケットの面を立てる",
      "下から上への動き",
      "タイミングが重要"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアループ",
      "バックループ",
      "強いループ"
    ],
    benefits: [
      "下回転への対応ができる",
      "攻撃的な返球ができる",
      "試合での得点機会を増やす"
    ]
  },
  {
    id: "beginner-rally-practice",
    name: "ラリー練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 1,
    description: "相手とボールを打ち合うラリー練習。基本技術の定着と試合感覚の習得。",
    objectives: [
      "基本技術の定着",
      "ラリーの継続",
      "試合感覚の習得"
    ],
    procedure: [
      "相手とラリーを行う",
      "ボールを落とさないことを目標",
      "徐々に強度を上げる"
    ],
    tips: [
      "焦らずゆっくり始める",
      "ボールをよく見る",
      "安定性を重視"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "強いラリー",
      "回転量の多いラリー",
      "ランダムなラリー"
    ],
    benefits: [
      "基本技術が定着する",
      "試合感覚を習得",
      "自信を持ってプレーできる"
    ]
  },
  {
    id: "beginner-receive-practice",
    name: "レシーブ練習",
    skillLevel: "beginner",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 2,
    description: "相手のサーブを受け止めるレシーブ技術の習得。",
    objectives: [
      "レシーブ技術の習得",
      "サーブへの対応力",
      "返球の精度"
    ],
    procedure: [
      "相手にサーブを出してもらう",
      "ラケットで受け止める",
      "相手コートに返球"
    ],
    tips: [
      "ラケットの角度を調整",
      "サーブの回転を読む",
      "早めに準備する"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるサーブへの対応",
      "強いレシーブ",
      "攻撃的なレシーブ"
    ],
    benefits: [
      "サーブに対応できる",
      "返球の精度が向上",
      "試合での得点機会を増やす"
    ]
  }
];

// 中級者向け練習メニュー（11種類）
export const INTERMEDIATE_TRAINING_MENUS: TrainingMenuExpanded[] = [
  {
    id: "intermediate-pattern-practice-1",
    name: "パターン練習1：フォアドライブ連続攻撃",
    skillLevel: "intermediate",
    trainingType: "pattern",
    duration: "20分",
    difficulty: 3,
    description: "相手のフォアサイドにツッツキを送り、返ってきたボールをフォアドライブで連続攻撃する練習。",
    objectives: [
      "フォアドライブの連続攻撃",
      "パターン化した練習",
      "試合での得点パターン習得"
    ],
    procedure: [
      "相手のフォアサイドにツッツキを送る",
      "返ってきたボールをフォアドライブで攻撃",
      "複数球連続で実施"
    ],
    tips: [
      "リズムを一定に保つ",
      "ドライブの質を高める",
      "相手の返球を予測"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "バックドライブへの切り替え",
      "強度を上げる",
      "異なるツッツキコース"
    ],
    benefits: [
      "試合での得点パターンを習得",
      "攻撃的なプレーができる",
      "相手を圧倒できる"
    ]
  },
  {
    id: "intermediate-pattern-practice-2",
    name: "パターン練習2：バックドライブ連続攻撃",
    skillLevel: "intermediate",
    trainingType: "pattern",
    duration: "20分",
    difficulty: 3,
    description: "相手のバックサイドにツッツキを送り、返ってきたボールをバックドライブで連続攻撃する練習。",
    objectives: [
      "バックドライブの連続攻撃",
      "パターン化した練習",
      "試合での得点パターン習得"
    ],
    procedure: [
      "相手のバックサイドにツッツキを送る",
      "返ってきたボールをバックドライブで攻撃",
      "複数球連続で実施"
    ],
    tips: [
      "リズムを一定に保つ",
      "ドライブの質を高める",
      "相手の返球を予測"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアドライブへの切り替え",
      "強度を上げる",
      "異なるツッツキコース"
    ],
    benefits: [
      "試合での得点パターンを習得",
      "バックハンドの攻撃力を向上",
      "相手を圧倒できる"
    ]
  },
  {
    id: "intermediate-middle-attack",
    name: "ミドル攻撃練習",
    skillLevel: "intermediate",
    trainingType: "footwork",
    duration: "20分",
    difficulty: 3,
    description: "ミドルエリアへの攻撃を習得する練習。フォアとバックの境界線への対応。",
    objectives: [
      "ミドルエリアでの攻撃",
      "フォアとバックの切り替え",
      "攻撃的なプレー"
    ],
    procedure: [
      "ミドルエリアにボールを送ってもらう",
      "フォアまたはバックで攻撃",
      "連続で実施"
    ],
    tips: [
      "素早いフットワーク",
      "ラケットの準備を早める",
      "ボールの到着に合わせる"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアで攻撃",
      "バックで攻撃",
      "強度を上げる"
    ],
    benefits: [
      "ミドルエリアでの対応力を向上",
      "攻撃的なプレーができる",
      "試合での得点機会を増やす"
    ]
  },
  {
    id: "intermediate-flick-practice",
    name: "フリック練習",
    skillLevel: "intermediate",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 3,
    description: "台上の短いボールを攻撃するフリック技術の習得。",
    objectives: [
      "フリック技術の習得",
      "台上での攻撃",
      "短いボールへの対応"
    ],
    procedure: [
      "相手に台上の短いボールを送ってもらう",
      "フリックで攻撃",
      "相手コートに返球"
    ],
    tips: [
      "ラケットの面を調整",
      "素早い動き",
      "ボールの下を捉える"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアフリック",
      "バックフリック",
      "強いフリック"
    ],
    benefits: [
      "台上での攻撃ができる",
      "短いボールに対応できる",
      "試合での得点機会を増やす"
    ]
  },
  {
    id: "intermediate-chikita-practice",
    name: "チキータ練習",
    skillLevel: "intermediate",
    trainingType: "single-ball",
    duration: "15分",
    difficulty: 3,
    description: "台上のバックハンドで攻撃するチキータ技術の習得。",
    objectives: [
      "チキータ技術の習得",
      "バック台上での攻撃",
      "短いボールへの対応"
    ],
    procedure: [
      "相手に台上の短いボールを送ってもらう",
      "チキータで攻撃",
      "相手コートに返球"
    ],
    tips: [
      "ラケットの角度を調整",
      "素早い動き",
      "ボールの下を捉える"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "強いチキータ",
      "異なるコース",
      "複数球連続"
    ],
    benefits: [
      "バック台上での攻撃ができる",
      "短いボールに対応できる",
      "試合での得点機会を増やす"
    ]
  },
  {
    id: "intermediate-counter-loop",
    name: "カウンタードライブ練習",
    skillLevel: "intermediate",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 3,
    description: "相手の攻撃に対して、カウンタードライブで返球する練習。",
    objectives: [
      "カウンタードライブの習得",
      "攻撃への対応",
      "攻撃的な返球"
    ],
    procedure: [
      "相手にドライブを打ってもらう",
      "ボールの頂点でカウンタードライブ",
      "強く返球"
    ],
    tips: [
      "タイミングが重要",
      "ラケットを引きすぎない",
      "足を動かして位置を調整"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアカウンター",
      "バックカウンター",
      "異なる回転への対応"
    ],
    benefits: [
      "相手の攻撃に対応できる",
      "攻撃的な返球ができる",
      "試合での逆転を狙える"
    ]
  },
  {
    id: "intermediate-midfield-drive",
    name: "中陣ドライブ練習",
    skillLevel: "intermediate",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 3,
    description: "台から少し離れた中陣からのドライブ技術の習得。",
    objectives: [
      "中陣でのドライブ",
      "距離感の習得",
      "強力な攻撃"
    ],
    procedure: [
      "中陣の位置でボールを受ける",
      "ドライブで返球",
      "複数球連続で実施"
    ],
    tips: [
      "足を動かして位置を調整",
      "ドライブの質を高める",
      "相手の返球を予測"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアドライブ",
      "バックドライブ",
      "強度を上げる"
    ],
    benefits: [
      "中陣での攻撃ができる",
      "距離感を習得",
      "強力な攻撃ができる"
    ]
  },
  {
    id: "intermediate-backfield-drive",
    name: "後陣ドライブ練習",
    skillLevel: "intermediate",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 4,
    description: "台から遠い後陣からのドライブ技術の習得。",
    objectives: [
      "後陣でのドライブ",
      "距離感の習得",
      "強力な攻撃"
    ],
    procedure: [
      "後陣の位置でボールを受ける",
      "ドライブで返球",
      "複数球連続で実施"
    ],
    tips: [
      "足を動かして位置を調整",
      "ドライブの質を高める",
      "相手の返球を予測"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "フォアドライブ",
      "バックドライブ",
      "強度を上げる"
    ],
    benefits: [
      "後陣での攻撃ができる",
      "距離感を習得",
      "強力な攻撃ができる"
    ]
  },
  {
    id: "intermediate-serve-return-pattern",
    name: "サーブレシーブパターン練習",
    skillLevel: "intermediate",
    trainingType: "pattern",
    duration: "25分",
    difficulty: 3,
    description: "自分のサーブから始まる試合パターンを習得する練習。",
    objectives: [
      "サーブレシーブの精度",
      "3球目攻撃の習得",
      "試合パターンの習得"
    ],
    procedure: [
      "自分がサーブを出す",
      "相手のレシーブを受ける",
      "3球目で攻撃を仕掛ける"
    ],
    tips: [
      "パターンを決める",
      "相手の返球を予測",
      "複数パターンを用意"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるサーブを使用",
      "異なる3球目攻撃",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "試合での得点パターンを習得",
      "攻撃的なプレーができる",
      "相手を圧倒できる"
    ]
  },
  {
    id: "intermediate-random-footwork",
    name: "ランダムフットワーク練習",
    skillLevel: "intermediate",
    trainingType: "footwork",
    duration: "20分",
    difficulty: 3,
    description: "予測不可能なコースへのボールに対応するフットワーク練習。",
    objectives: [
      "対応力の向上",
      "素早いフットワーク",
      "試合での対応"
    ],
    procedure: [
      "相手がランダムなコースにボールを送る",
      "素早く対応",
      "複数球連続で実施"
    ],
    tips: [
      "常に準備の姿勢",
      "ボールをよく見る",
      "素早い判断"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "強度を上げる",
      "異なるコース",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "対応力が向上",
      "試合での対応ができる",
      "自信を持ってプレーできる"
    ]
  },
  {
    id: "intermediate-multi-ball-training",
    name: "多球練習",
    skillLevel: "intermediate",
    trainingType: "multi-ball",
    duration: "20分",
    difficulty: 3,
    description: "複数のボールを短時間で打つ練習。効率的に多くの打球ができる。",
    objectives: [
      "短時間での多くの打球",
      "技術の反復習得",
      "体力の向上"
    ],
    procedure: [
      "相手が複数のボールを送る",
      "連続して打球",
      "複数セット実施"
    ],
    tips: [
      "リズムを一定に保つ",
      "技術を重視",
      "体力を温存"
    ],
    requiredEquipment: ["卓球台", "ラケット", "複数の卓球"],
    variations: [
      "異なるコース",
      "異なる技術",
      "強度を上げる"
    ],
    benefits: [
      "短時間で多くの打球ができる",
      "技術が定着する",
      "体力が向上"
    ]
  }
];

// 上級者向け練習メニュー（10種類）
export const ADVANCED_TRAINING_MENUS: TrainingMenuExpanded[] = [
  {
    id: "advanced-aggressive-pattern",
    name: "アグレッシブパターン練習",
    skillLevel: "advanced",
    trainingType: "pattern",
    duration: "25分",
    difficulty: 4,
    description: "相手を圧倒する連続攻撃パターンの習得。",
    objectives: [
      "連続攻撃の習得",
      "試合での得点パターン",
      "攻撃的なプレー"
    ],
    procedure: [
      "相手に短いボールを送ってもらう",
      "フリックで攻撃",
      "連続ドライブで得点",
      "複数パターンを組み合わせ"
    ],
    tips: [
      "リズムを一定に保つ",
      "相手の返球を予測",
      "複数パターンを用意"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるパターン",
      "強度を上げる",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "試合での得点パターンを習得",
      "攻撃的なプレーができる",
      "相手を圧倒できる"
    ]
  },
  {
    id: "advanced-defense-counter",
    name: "守備からのカウンター練習",
    skillLevel: "advanced",
    trainingType: "single-ball",
    duration: "25分",
    difficulty: 4,
    description: "守備的なプレーから攻撃へ転じるカウンター技術の習得。",
    objectives: [
      "守備からの転換",
      "カウンター技術",
      "試合での逆転"
    ],
    procedure: [
      "相手に強い攻撃を仕掛けてもらう",
      "守備で返球",
      "隙をついてカウンター",
      "得点を狙う"
    ],
    tips: [
      "相手の隙を見つける",
      "タイミングが重要",
      "素早い判断"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるカウンター",
      "強度を上げる",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "相手の攻撃に対応できる",
      "攻撃的な返球ができる",
      "試合での逆転を狙える"
    ]
  },
  {
    id: "advanced-spin-variation",
    name: "回転量変化練習",
    skillLevel: "advanced",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 4,
    description: "異なる回転量のボールに対応する練習。",
    objectives: [
      "回転への対応",
      "柔軟な対応力",
      "試合での対応"
    ],
    procedure: [
      "相手が異なる回転量のボールを送る",
      "回転を読んで対応",
      "複数球連続で実施"
    ],
    tips: [
      "ボールをよく見る",
      "回転を読む",
      "素早い判断"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なる回転",
      "強度を上げる",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "回転への対応ができる",
      "試合での対応力が向上",
      "自信を持ってプレーできる"
    ]
  },
  {
    id: "advanced-speed-variation",
    name: "速度変化練習",
    skillLevel: "advanced",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 4,
    description: "異なるスピードのボールに対応する練習。",
    objectives: [
      "速度への対応",
      "柔軟な対応力",
      "試合での対応"
    ],
    procedure: [
      "相手が異なるスピードのボールを送る",
      "スピードを読んで対応",
      "複数球連続で実施"
    ],
    tips: [
      "ボールをよく見る",
      "スピードを読む",
      "素早い判断"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるスピード",
      "強度を上げる",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "速度への対応ができる",
      "試合での対応力が向上",
      "自信を持ってプレーできる"
    ]
  },
  {
    id: "advanced-match-simulation",
    name: "試合シミュレーション練習",
    skillLevel: "advanced",
    trainingType: "match",
    duration: "30分",
    difficulty: 5,
    description: "実際の試合を想定した練習。",
    objectives: [
      "試合での対応",
      "メンタルトレーニング",
      "総合的な技術向上"
    ],
    procedure: [
      "実際の試合ルールで対戦",
      "複数セットを実施",
      "スコアを記録"
    ],
    tips: [
      "集中力を保つ",
      "メンタルコントロール",
      "試合経験を積む"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なる相手との対戦",
      "複数セット",
      "異なるルール"
    ],
    benefits: [
      "試合での対応ができる",
      "メンタルが鍛えられる",
      "総合的な技術が向上"
    ]
  },
  {
    id: "advanced-combination-attack",
    name: "複合攻撃練習",
    skillLevel: "advanced",
    trainingType: "pattern",
    duration: "25分",
    difficulty: 4,
    description: "複数の攻撃技術を組み合わせた練習。",
    objectives: [
      "複合攻撃の習得",
      "試合での得点パターン",
      "攻撃的なプレー"
    ],
    procedure: [
      "相手に異なるボールを送ってもらう",
      "複数の攻撃技術を組み合わせ",
      "得点を狙う"
    ],
    tips: [
      "パターンを決める",
      "相手の返球を予測",
      "複数パターンを用意"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なるパターン",
      "強度を上げる",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "複合攻撃ができる",
      "試合での得点パターンを習得",
      "相手を圧倒できる"
    ]
  },
  {
    id: "advanced-pressure-situation",
    name: "プレッシャー状況練習",
    skillLevel: "advanced",
    trainingType: "match",
    duration: "25分",
    difficulty: 5,
    description: "試合の重要な場面を想定した練習。",
    objectives: [
      "メンタルトレーニング",
      "プレッシャー対応",
      "試合での対応"
    ],
    procedure: [
      "重要な場面を想定",
      "複数の試合を実施",
      "スコアを記録"
    ],
    tips: [
      "集中力を保つ",
      "メンタルコントロール",
      "試合経験を積む"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なる場面",
      "複数セット",
      "異なるルール"
    ],
    benefits: [
      "プレッシャー対応ができる",
      "メンタルが鍛えられる",
      "試合での対応力が向上"
    ]
  },
  {
    id: "advanced-weakness-training",
    name: "弱点克服練習",
    skillLevel: "advanced",
    trainingType: "single-ball",
    duration: "30分",
    difficulty: 4,
    description: "自分の弱点を集中的に克服する練習。",
    objectives: [
      "弱点の克服",
      "総合的な技術向上",
      "試合での対応"
    ],
    procedure: [
      "弱点を分析",
      "集中的に練習",
      "複数球連続で実施"
    ],
    tips: [
      "弱点を正確に把握",
      "継続的に練習",
      "進捗を記録"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なる弱点",
      "強度を上げる",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "弱点が克服できる",
      "総合的な技術が向上",
      "試合での対応力が向上"
    ]
  },
  {
    id: "advanced-high-speed-rally",
    name: "高速ラリー練習",
    skillLevel: "advanced",
    trainingType: "single-ball",
    duration: "20分",
    difficulty: 5,
    description: "高速でのラリー練習。試合のテンポを上げる。",
    objectives: [
      "高速ラリーへの対応",
      "反応速度の向上",
      "試合でのテンポ"
    ],
    procedure: [
      "高速でラリーを行う",
      "複数球連続で実施",
      "ミスを減らす"
    ],
    tips: [
      "集中力を保つ",
      "素早い判断",
      "反応速度を高める"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "さらに高速",
      "異なるコース",
      "複数パターンを組み合わせ"
    ],
    benefits: [
      "高速ラリーに対応できる",
      "反応速度が向上",
      "試合でのテンポを上げられる"
    ]
  },
  {
    id: "advanced-tactical-analysis",
    name: "戦術分析練習",
    skillLevel: "advanced",
    trainingType: "match",
    duration: "30分",
    difficulty: 5,
    description: "相手の戦術を分析して対応する練習。",
    objectives: [
      "戦術分析能力",
      "対応策の立案",
      "試合での戦略"
    ],
    procedure: [
      "相手の戦術を観察",
      "対応策を立案",
      "実際に対戦"
    ],
    tips: [
      "相手をよく観察",
      "柔軟に対応",
      "複数の対応策を用意"
    ],
    requiredEquipment: ["卓球台", "ラケット", "卓球"],
    variations: [
      "異なる相手",
      "複数セット",
      "異なる戦術"
    ],
    benefits: [
      "戦術分析ができる",
      "柔軟に対応できる",
      "試合での勝率が向上"
    ]
  }
];

// 全練習メニューを統合
export const ALL_TRAINING_MENUS_EXPANDED: TrainingMenuExpanded[] = [
  ...BEGINNER_TRAINING_MENUS,
  ...INTERMEDIATE_TRAINING_MENUS,
  ...ADVANCED_TRAINING_MENUS
];

export const getTrainingMenusByLevel = (level: SkillLevel): TrainingMenuExpanded[] => {
  return ALL_TRAINING_MENUS_EXPANDED.filter(menu => menu.skillLevel === level);
};

export const getTrainingMenusByType = (type: TrainingType): TrainingMenuExpanded[] => {
  return ALL_TRAINING_MENUS_EXPANDED.filter(menu => menu.trainingType === type);
};

export const getTotalTrainingMenuCount = (): number => {
  return ALL_TRAINING_MENUS_EXPANDED.length;
};
