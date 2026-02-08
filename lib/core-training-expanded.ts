/**
 * 体幹トレーニング・補強運動データベース（拡張版）
 * 初心者から上級者までの段階別体幹トレーニングを網羅的に定義
 */

export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type TrainingCategory = "core" | "upper-body" | "lower-body" | "rotator-cuff" | "flexibility";

export interface CoreTrainingExpanded {
  id: string;
  name: string;
  skillLevel: SkillLevel;
  category: TrainingCategory;
  duration: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  targetMuscles: string[];
  procedure: string[];
  tips: string[];
  sets?: string;
  reps?: string;
  holdTime?: string;
  variations: string[];
  benefits?: string[];
  precautions?: string[];
}

// 初心者向け体幹トレーニング（12種類）
export const BEGINNER_CORE_TRAINING: CoreTrainingExpanded[] = [
  {
    id: "beginner-front-plank",
    name: "フロントプランク",
    skillLevel: "beginner",
    category: "core",
    duration: "5-10分",
    difficulty: 1,
    description: "体幹前面全体に効果の高い基本的な体幹トレーニング。",
    targetMuscles: ["腹筋群", "腸腰筋"],
    procedure: [
      "うつぶせになる",
      "肘と足のつま先で体を支える",
      "体を一直線に保つ",
      "30秒～2分停止"
    ],
    tips: [
      "背中を丸めない",
      "腰を落とさない",
      "呼吸を止めない"
    ],
    holdTime: "30秒～2分",
    variations: [
      "片足を上げる",
      "腕を前に伸ばす",
      "動的プランク"
    ],
    benefits: [
      "体幹の安定性向上",
      "腹筋の強化",
      "姿勢の改善"
    ],
    precautions: [
      "首に力を入れない",
      "腰に負担をかけない"
    ]
  },
  {
    id: "beginner-side-plank",
    name: "サイドプランク",
    skillLevel: "beginner",
    category: "core",
    duration: "5-10分",
    difficulty: 1,
    description: "体幹側面に効果の高いトレーニング。左右のバランス向上。",
    targetMuscles: ["腹斜筋", "側腹筋"],
    procedure: [
      "横向きになる",
      "肘と足で体を支える",
      "体を一直線に保つ",
      "30秒～2分停止",
      "反対側も同様に実施"
    ],
    tips: [
      "腰を落とさない",
      "体が前後に傾かない",
      "呼吸を止めない"
    ],
    holdTime: "30秒～2分",
    variations: [
      "上側の足を上げる",
      "腕を上に伸ばす",
      "動的サイドプランク"
    ],
    benefits: [
      "側腹筋の強化",
      "左右のバランス向上",
      "体幹の安定性向上"
    ],
    precautions: [
      "肩に力を入れない",
      "腰に負担をかけない"
    ]
  },
  {
    id: "beginner-arm-leg-cross",
    name: "アームレッグクロスレイズ",
    skillLevel: "beginner",
    category: "core",
    duration: "5-10分",
    difficulty: 1,
    description: "体幹背面全体に効果の高いトレーニング。",
    targetMuscles: ["脊柱起立筋", "臀筋群"],
    procedure: [
      "うつぶせになる",
      "右腕と左足を同時に上げる",
      "10秒停止",
      "反対側も同様に実施",
      "左右合わせて20回反復"
    ],
    tips: [
      "必要以上に手足を上げない",
      "水平位置で停止",
      "腰を傷めないように注意"
    ],
    reps: "左右合わせて20回",
    holdTime: "10秒",
    variations: [
      "両腕を上げる",
      "両足を上げる",
      "腕と足を交互に上げる"
    ],
    benefits: [
      "背中の筋肉強化",
      "臀筋の強化",
      "姿勢の改善"
    ],
    precautions: [
      "腰を傷めないように注意",
      "首に力を入れない"
    ]
  },
  {
    id: "beginner-dead-bug",
    name: "デッドバグ",
    skillLevel: "beginner",
    category: "core",
    duration: "5-10分",
    difficulty: 1,
    description: "腹筋と腸腰筋を効果的に鍛えるトレーニング。",
    targetMuscles: ["腹筋群", "腸腰筋"],
    procedure: [
      "仰向けになる",
      "膝と肘を合わせる",
      "対角線上に腕と足を伸ばす",
      "元の位置に戻す",
      "反対側も同様に実施"
    ],
    tips: [
      "腰を浮かせない",
      "ゆっくり動く",
      "呼吸を止めない"
    ],
    reps: "左右合わせて20回",
    variations: [
      "片足ずつ伸ばす",
      "腕だけを伸ばす",
      "足だけを伸ばす"
    ],
    benefits: [
      "腹筋の強化",
      "腸腰筋の強化",
      "腰痛予防"
    ],
    precautions: [
      "腰を浮かせない",
      "首に力を入れない"
    ]
  },
  {
    id: "beginner-bird-dog",
    name: "バードドッグ",
    skillLevel: "beginner",
    category: "core",
    duration: "5-10分",
    difficulty: 1,
    description: "体幹の安定性を向上させるトレーニング。",
    targetMuscles: ["脊柱起立筋", "臀筋群", "腹筋群"],
    procedure: [
      "四つん這いになる",
      "右腕と左足を同時に伸ばす",
      "5秒停止",
      "元の位置に戻す",
      "反対側も同様に実施"
    ],
    tips: [
      "背中を丸めない",
      "腰を落とさない",
      "体が回転しないように注意"
    ],
    reps: "左右合わせて20回",
    holdTime: "5秒",
    variations: [
      "腕だけを伸ばす",
      "足だけを伸ばす",
      "膝と肘を合わせる"
    ],
    benefits: [
      "体幹の安定性向上",
      "背中の筋肉強化",
      "バランス能力向上"
    ],
    precautions: [
      "腰を傷めないように注意",
      "首に力を入れない"
    ]
  },
  {
    id: "beginner-bridge",
    name: "ブリッジ",
    skillLevel: "beginner",
    category: "lower-body",
    duration: "5-10分",
    difficulty: 1,
    description: "臀筋と脊柱起立筋を効果的に鍛えるトレーニング。",
    targetMuscles: ["臀筋群", "脊柱起立筋", "ハムストリングス"],
    procedure: [
      "仰向けになる",
      "膝を曲げて足を床に置く",
      "腰を上げる",
      "1-2秒停止",
      "腰を下ろす"
    ],
    tips: [
      "膝を肩幅に開く",
      "腰を高く上げる",
      "肩を床に押しつける"
    ],
    reps: "15-20回",
    variations: [
      "片足ブリッジ",
      "腕を上に伸ばす",
      "ウエイトを乗せる"
    ],
    benefits: [
      "臀筋の強化",
      "ハムストリングスの強化",
      "腰痛予防"
    ],
    precautions: [
      "首に力を入れない",
      "腰を傷めないように注意"
    ]
  },
  {
    id: "beginner-glute-squeeze",
    name: "グルートスクイーズ",
    skillLevel: "beginner",
    category: "lower-body",
    duration: "5分",
    difficulty: 1,
    description: "臀筋を集中的に鍛えるシンプルなトレーニング。",
    targetMuscles: ["臀筋群"],
    procedure: [
      "立つか座る",
      "臀筋に力を入れて5秒間キープ",
      "力を抜く",
      "繰り返す"
    ],
    tips: [
      "最大限に力を入れる",
      "呼吸を止めない",
      "毎日実施できる"
    ],
    reps: "20-30回",
    holdTime: "5秒",
    variations: [
      "立った状態で実施",
      "座った状態で実施",
      "ウォーキング中に実施"
    ],
    benefits: [
      "臀筋の強化",
      "ヒップアップ",
      "日常生活で実施可能"
    ],
    precautions: []
  },
  {
    id: "beginner-quadriceps-stretch",
    name: "大腿四頭筋ストレッチ",
    skillLevel: "beginner",
    category: "flexibility",
    duration: "5-10分",
    difficulty: 1,
    description: "太もも前の筋肉を伸ばすストレッチ。",
    targetMuscles: ["大腿四頭筋"],
    procedure: [
      "立つ",
      "片足を後ろに曲げる",
      "足首を掴む",
      "30秒キープ",
      "反対側も同様に実施"
    ],
    tips: [
      "無理に引っ張らない",
      "呼吸を止めない",
      "温かい筋肉の時に実施"
    ],
    holdTime: "30秒",
    variations: [
      "座った状態で実施",
      "壁を使って実施",
      "パートナーにサポートしてもらう"
    ],
    benefits: [
      "太もも前の柔軟性向上",
      "筋肉の疲労回復",
      "怪我予防"
    ],
    precautions: [
      "無理に伸ばさない",
      "痛みを感じたら中止"
    ]
  },
  {
    id: "beginner-hamstring-stretch",
    name: "ハムストリングスストレッチ",
    skillLevel: "beginner",
    category: "flexibility",
    duration: "5-10分",
    difficulty: 1,
    description: "太もも後ろの筋肉を伸ばすストレッチ。",
    targetMuscles: ["ハムストリングス"],
    procedure: [
      "座る",
      "片足を前に伸ばす",
      "体を前に倒す",
      "30秒キープ",
      "反対側も同様に実施"
    ],
    tips: [
      "無理に倒さない",
      "呼吸を止めない",
      "温かい筋肉の時に実施"
    ],
    holdTime: "30秒",
    variations: [
      "立った状態で実施",
      "片足を上げて実施",
      "パートナーにサポートしてもらう"
    ],
    benefits: [
      "太もも後ろの柔軟性向上",
      "筋肉の疲労回復",
      "怪我予防"
    ],
    precautions: [
      "無理に伸ばさない",
      "痛みを感じたら中止"
    ]
  },
  {
    id: "beginner-shoulder-rotation",
    name: "肩関節回旋トレーニング",
    skillLevel: "beginner",
    category: "rotator-cuff",
    duration: "5-10分",
    difficulty: 1,
    description: "肩関節の可動域を広げるトレーニング。",
    targetMuscles: ["回旋筋腱板", "三角筋"],
    procedure: [
      "立つ",
      "腕を横に上げる",
      "肘を曲げて前後に回す",
      "ゆっくり動く",
      "反対側も同様に実施"
    ],
    tips: [
      "ゆっくり動く",
      "無理に動かさない",
      "呼吸を止めない"
    ],
    reps: "15-20回",
    variations: [
      "チューブを使用",
      "ウエイトを持って実施",
      "異なる高さで実施"
    ],
    benefits: [
      "肩関節の可動域向上",
      "肩の安定性向上",
      "怪我予防"
    ],
    precautions: [
      "肩に痛みがある場合は中止",
      "無理に動かさない"
    ]
  },
  {
    id: "beginner-cat-cow",
    name: "キャットカウストレッチ",
    skillLevel: "beginner",
    category: "core",
    duration: "5-10分",
    difficulty: 1,
    description: "背中と腹部の柔軟性を向上させるストレッチ。",
    targetMuscles: ["脊柱起立筋", "腹筋群"],
    procedure: [
      "四つん這いになる",
      "背中を丸める（キャット）",
      "背中を反らせる（カウ）",
      "ゆっくり繰り返す"
    ],
    tips: [
      "ゆっくり動く",
      "呼吸を止めない",
      "無理に動かさない"
    ],
    reps: "10-15回",
    variations: [
      "片足を上げながら実施",
      "腕を伸ばしながら実施",
      "異なるペースで実施"
    ],
    benefits: [
      "背中の柔軟性向上",
      "脊椎の可動域向上",
      "腰痛緩和"
    ],
    precautions: [
      "腰に痛みがある場合は中止",
      "無理に動かさない"
    ]
  },
  {
    id: "beginner-child-pose",
    name: "チャイルドポーズ",
    skillLevel: "beginner",
    category: "flexibility",
    duration: "5-10分",
    difficulty: 1,
    description: "背中と肩をリラックスさせるストレッチ。",
    targetMuscles: ["脊柱起立筋", "三角筋", "腕の筋肉"],
    procedure: [
      "四つん這いになる",
      "腰を後ろに下ろす",
      "腕を前に伸ばす",
      "30秒～1分キープ"
    ],
    tips: [
      "無理に下ろさない",
      "呼吸を止めない",
      "リラックスする"
    ],
    holdTime: "30秒～1分",
    variations: [
      "腕を横に伸ばす",
      "片腕を伸ばす",
      "腕を後ろに回す"
    ],
    benefits: [
      "背中のリラックス",
      "肩のリラックス",
      "ストレス軽減"
    ],
    precautions: [
      "膝に負担をかけない",
      "無理に下ろさない"
    ]
  }
];

// 中級者向け体幹トレーニング（12種類）
export const INTERMEDIATE_CORE_TRAINING: CoreTrainingExpanded[] = [
  {
    id: "intermediate-dynamic-plank",
    name: "ダイナミックプランク",
    skillLevel: "intermediate",
    category: "core",
    duration: "10-15分",
    difficulty: 2,
    description: "フロントプランクに動きを加えたトレーニング。",
    targetMuscles: ["腹筋群", "腸腰筋", "肩"],
    procedure: [
      "フロントプランク姿勢になる",
      "肘を曲げて体を下げる",
      "元の位置に戻す",
      "繰り返す"
    ],
    tips: [
      "体を一直線に保つ",
      "呼吸を止めない",
      "ゆっくり動く"
    ],
    reps: "10-15回",
    variations: [
      "片腕で実施",
      "片足を上げながら実施",
      "回転させながら実施"
    ],
    benefits: [
      "体幹の安定性向上",
      "腹筋の強化",
      "肩の安定性向上"
    ],
    precautions: [
      "腰に負担をかけない",
      "肩に力を入れすぎない"
    ]
  },
  {
    id: "intermediate-side-plank-rotation",
    name: "サイドプランクロテーション",
    skillLevel: "intermediate",
    category: "core",
    duration: "10-15分",
    difficulty: 2,
    description: "サイドプランクに回転動作を加えたトレーニング。",
    targetMuscles: ["腹斜筋", "側腹筋", "腹筋群"],
    procedure: [
      "サイドプランク姿勢になる",
      "上側の腕を下側の脇に通す",
      "元の位置に戻す",
      "繰り返す"
    ],
    tips: [
      "体が前後に傾かない",
      "呼吸を止めない",
      "ゆっくり動く"
    ],
    reps: "10-15回",
    variations: [
      "腕を上に伸ばしながら実施",
      "足を上げながら実施",
      "より大きく回転させる"
    ],
    benefits: [
      "腹斜筋の強化",
      "体幹の回転力向上",
      "側腹筋の強化"
    ],
    precautions: [
      "腰に負担をかけない",
      "肩に力を入れすぎない"
    ]
  },
  {
    id: "intermediate-pallof-press",
    name: "パロフプレス",
    skillLevel: "intermediate",
    category: "core",
    duration: "10-15分",
    difficulty: 2,
    description: "チューブを使った体幹の回転安定性トレーニング。",
    targetMuscles: ["腹斜筋", "腹筋群", "脊柱起立筋"],
    procedure: [
      "チューブを胸の高さで持つ",
      "体の前に腕を伸ばす",
      "体が回転しないように保つ",
      "戻す"
    ],
    tips: [
      "体が回転しないように注意",
      "チューブのテンションを保つ",
      "呼吸を止めない"
    ],
    reps: "12-15回",
    variations: [
      "異なる高さで実施",
      "片足で実施",
      "より強いテンションで実施"
    ],
    benefits: [
      "体幹の回転安定性向上",
      "腹斜筋の強化",
      "脊椎の安定性向上"
    ],
    precautions: [
      "腰に負担をかけない",
      "肩に力を入れすぎない"
    ]
  },
  {
    id: "intermediate-dead-bug-advanced",
    name: "デッドバグ（アドバンス）",
    skillLevel: "intermediate",
    category: "core",
    duration: "10-15分",
    difficulty: 2,
    description: "デッドバグに複雑な動きを加えたトレーニング。",
    targetMuscles: ["腹筋群", "腸腰筋"],
    procedure: [
      "仰向けになる",
      "膝と肘を合わせる",
      "対角線上に腕と足を伸ばす",
      "腕と足を交差させる",
      "元の位置に戻す"
    ],
    tips: [
      "腰を浮かせない",
      "ゆっくり動く",
      "呼吸を止めない"
    ],
    reps: "15-20回",
    variations: [
      "より大きく動く",
      "ウエイトを持って実施",
      "異なるパターンで実施"
    ],
    benefits: [
      "腹筋の強化",
      "腸腰筋の強化",
      "体幹の安定性向上"
    ],
    precautions: [
      "腰を浮かせない",
      "首に力を入れない"
    ]
  },
  {
    id: "intermediate-single-leg-bridge",
    name: "シングルレッグブリッジ",
    skillLevel: "intermediate",
    category: "lower-body",
    duration: "10-15分",
    difficulty: 2,
    description: "片足でのブリッジトレーニング。臀筋と脊柱起立筋を集中的に鍛える。",
    targetMuscles: ["臀筋群", "脊柱起立筋", "ハムストリングス"],
    procedure: [
      "仰向けになる",
      "片足を上に伸ばす",
      "もう一方の足で腰を上げる",
      "1-2秒停止",
      "腰を下ろす"
    ],
    tips: [
      "腰を高く上げる",
      "膝を曲げすぎない",
      "呼吸を止めない"
    ],
    reps: "12-15回",
    variations: [
      "上側の足を動かす",
      "腕を上に伸ばす",
      "ウエイトを乗せる"
    ],
    benefits: [
      "臀筋の強化",
      "バランス能力向上",
      "腰痛予防"
    ],
    precautions: [
      "首に力を入れない",
      "腰を傷めないように注意"
    ]
  },
  {
    id: "intermediate-monster-walk",
    name: "モンスターウォーク",
    skillLevel: "intermediate",
    category: "lower-body",
    duration: "10-15分",
    difficulty: 2,
    description: "臀筋を活性化させるウォーキングトレーニング。",
    targetMuscles: ["臀筋群", "大腿四頭筋"],
    procedure: [
      "立つ",
      "膝を高く上げながら前に進む",
      "臀筋に力を入れる",
      "ゆっくり歩く"
    ],
    tips: [
      "臀筋を意識する",
      "膝を高く上げる",
      "ゆっくり歩く"
    ],
    reps: "20-30歩",
    variations: [
      "後ろに歩く",
      "横に歩く",
      "チューブを使用"
    ],
    benefits: [
      "臀筋の活性化",
      "股関節の可動域向上",
      "ウォーミングアップに最適"
    ],
    precautions: [
      "膝に負担をかけない",
      "バランスを保つ"
    ]
  },
  {
    id: "intermediate-clamshell",
    name: "クラムシェル",
    skillLevel: "intermediate",
    category: "lower-body",
    duration: "10-15分",
    difficulty: 2,
    description: "臀筋の外側（中臀筋）を鍛えるトレーニング。",
    targetMuscles: ["臀筋群（中臀筋）"],
    procedure: [
      "横向きに寝る",
      "膝を曲げる",
      "上側の膝を上げる",
      "元の位置に戻す"
    ],
    tips: [
      "腰を動かさない",
      "ゆっくり動く",
      "臀筋を意識する"
    ],
    reps: "15-20回",
    variations: [
      "チューブを使用",
      "より大きく開く",
      "停止時間を長くする"
    ],
    benefits: [
      "中臀筋の強化",
      "股関節の安定性向上",
      "膝痛予防"
    ],
    precautions: [
      "腰を動かさない",
      "膝に負担をかけない"
    ]
  },
  {
    id: "intermediate-internalrotation",
    name: "インターナルローテーション",
    skillLevel: "intermediate",
    category: "rotator-cuff",
    duration: "10-15分",
    difficulty: 2,
    description: "肩甲下筋を鍛えるローテーターカフトレーニング。",
    targetMuscles: ["肩甲下筋", "回旋筋腱板"],
    procedure: [
      "立つか座る",
      "肘を90度曲げる",
      "チューブを持つ",
      "腕を内側に回す",
      "元の位置に戻す"
    ],
    tips: [
      "肘を固定する",
      "ゆっくり動く",
      "チューブのテンションを保つ"
    ],
    reps: "15-20回",
    variations: [
      "より強いテンションで実施",
      "異なる高さで実施",
      "ウエイトを使用"
    ],
    benefits: [
      "肩甲下筋の強化",
      "肩の安定性向上",
      "肩痛予防"
    ],
    precautions: [
      "肩に痛みがある場合は中止",
      "肘を動かさない"
    ]
  },
  {
    id: "intermediate-external-rotation",
    name: "エクスターナルローテーション",
    skillLevel: "intermediate",
    category: "rotator-cuff",
    duration: "10-15分",
    difficulty: 2,
    description: "棘上筋と棘下筋を鍛えるローテーターカフトレーニング。",
    targetMuscles: ["棘上筋", "棘下筋", "回旋筋腱板"],
    procedure: [
      "立つか座る",
      "肘を90度曲げる",
      "チューブを持つ",
      "腕を外側に回す",
      "元の位置に戻す"
    ],
    tips: [
      "肘を固定する",
      "ゆっくり動く",
      "チューブのテンションを保つ"
    ],
    reps: "15-20回",
    variations: [
      "より強いテンションで実施",
      "異なる高さで実施",
      "ウエイトを使用"
    ],
    benefits: [
      "棘上筋と棘下筋の強化",
      "肩の安定性向上",
      "肩痛予防"
    ],
    precautions: [
      "肩に痛みがある場合は中止",
      "肘を動かさない"
    ]
  },
  {
    id: "intermediate-thoracic-rotation",
    name: "胸椎ローテーション",
    skillLevel: "intermediate",
    category: "flexibility",
    duration: "10-15分",
    difficulty: 2,
    description: "背中の可動域を広げるストレッチ。",
    targetMuscles: ["脊柱起立筋", "腹斜筋"],
    procedure: [
      "四つん這いになる",
      "片手を後ろに回す",
      "胸を開く",
      "30秒キープ",
      "反対側も同様に実施"
    ],
    tips: [
      "ゆっくり動く",
      "無理に回さない",
      "呼吸を止めない"
    ],
    holdTime: "30秒",
    variations: [
      "より大きく回す",
      "異なるポジションで実施",
      "パートナーにサポートしてもらう"
    ],
    benefits: [
      "背中の柔軟性向上",
      "脊椎の可動域向上",
      "肩の可動域向上"
    ],
    precautions: [
      "無理に回さない",
      "腰に負担をかけない"
    ]
  },
  {
    id: "intermediate-pigeon-pose",
    name: "ピジョンポーズ",
    skillLevel: "intermediate",
    category: "flexibility",
    duration: "10-15分",
    difficulty: 2,
    description: "臀筋と股関節を伸ばすストレッチ。",
    targetMuscles: ["臀筋群", "梨状筋"],
    procedure: [
      "床に座る",
      "片足を前に曲げる",
      "体を前に倒す",
      "30秒～1分キープ",
      "反対側も同様に実施"
    ],
    tips: [
      "無理に倒さない",
      "呼吸を止めない",
      "温かい筋肉の時に実施"
    ],
    holdTime: "30秒～1分",
    variations: [
      "より深く倒す",
      "パートナーにサポートしてもらう",
      "異なるポジションで実施"
    ],
    benefits: [
      "臀筋の柔軟性向上",
      "股関節の可動域向上",
      "坐骨神経痛緩和"
    ],
    precautions: [
      "膝に負担をかけない",
      "無理に倒さない"
    ]
  }
];

// 上級者向け体幹トレーニング（10種類）
export const ADVANCED_CORE_TRAINING: CoreTrainingExpanded[] = [
  {
    id: "advanced-ab-wheel",
    name: "アブホイール",
    skillLevel: "advanced",
    category: "core",
    duration: "15-20分",
    difficulty: 4,
    description: "腹筋全体を集中的に鍛える高難度トレーニング。",
    targetMuscles: ["腹筋群", "腸腰筋"],
    procedure: [
      "膝をついて立つ",
      "アブホイールを持つ",
      "前に転がす",
      "腹筋で引き戻す"
    ],
    tips: [
      "腰を落とさない",
      "呼吸を止めない",
      "ゆっくり動く"
    ],
    reps: "8-12回",
    variations: [
      "立った状態で実施",
      "より遠くまで転がす",
      "片腕で実施"
    ],
    benefits: [
      "腹筋の強化",
      "体幹の安定性向上",
      "腸腰筋の強化"
    ],
    precautions: [
      "腰を傷めないように注意",
      "初心者は膝をついて実施"
    ]
  },
  {
    id: "advanced-hanging-leg-raise",
    name: "ハンギングレッグレイズ",
    skillLevel: "advanced",
    category: "core",
    duration: "15-20分",
    difficulty: 4,
    description: "懸垂棒を使った腹筋トレーニング。",
    targetMuscles: ["腹筋群", "腸腰筋"],
    procedure: [
      "懸垂棒にぶら下がる",
      "膝を曲げて上げる",
      "ゆっくり下ろす"
    ],
    tips: [
      "反動を使わない",
      "ゆっくり動く",
      "呼吸を止めない"
    ],
    reps: "10-15回",
    variations: [
      "足を伸ばして上げる",
      "より高く上げる",
      "回転させながら上げる"
    ],
    benefits: [
      "腹筋の強化",
      "腸腰筋の強化",
      "握力の向上"
    ],
    precautions: [
      "肩に負担をかけない",
      "反動を使わない"
    ]
  },
  {
    id: "advanced-stability-ball-plank",
    name: "スタビリティボールプランク",
    skillLevel: "advanced",
    category: "core",
    duration: "15-20分",
    difficulty: 4,
    description: "バランスボールを使った不安定な環境でのプランク。",
    targetMuscles: ["腹筋群", "腸腰筋", "肩"],
    procedure: [
      "バランスボールに肘を乗せる",
      "プランク姿勢になる",
      "体を一直線に保つ",
      "1-2分キープ"
    ],
    tips: [
      "バランスを保つ",
      "呼吸を止めない",
      "体が動かないように注意"
    ],
    holdTime: "1-2分",
    variations: [
      "片足を上げる",
      "腕を動かす",
      "ボールを動かす"
    ],
    benefits: [
      "体幹の安定性向上",
      "バランス能力向上",
      "深層筋の強化"
    ],
    precautions: [
      "バランスを失わないように注意",
      "肩に力を入れすぎない"
    ]
  },
  {
    id: "advanced-turkish-getup",
    name: "ターキッシュゲットアップ",
    skillLevel: "advanced",
    category: "core",
    duration: "15-20分",
    difficulty: 5,
    description: "複雑な全身トレーニング。体幹の安定性と可動性を向上させる。",
    targetMuscles: ["全身"],
    procedure: [
      "仰向けになる",
      "ケトルベルを持つ",
      "段階的に立ち上がる",
      "元の位置に戻す"
    ],
    tips: [
      "ゆっくり動く",
      "バランスを保つ",
      "呼吸を止めない"
    ],
    reps: "5-8回",
    variations: [
      "より重いウエイトを使用",
      "より速く動く",
      "異なるウエイトを使用"
    ],
    benefits: [
      "全身の強化",
      "体幹の安定性向上",
      "可動性の向上"
    ],
    precautions: [
      "複雑な動きなので十分な練習が必要",
      "バランスを失わないように注意"
    ]
  },
  {
    id: "advanced-pistol-squat",
    name: "ピストルスクワット",
    skillLevel: "advanced",
    category: "lower-body",
    duration: "15-20分",
    difficulty: 5,
    description: "片足でのスクワット。下半身と体幹を集中的に鍛える。",
    targetMuscles: ["大腿四頭筋", "ハムストリングス", "臀筋群"],
    procedure: [
      "立つ",
      "片足を上げる",
      "もう一方の足でしゃがむ",
      "立ち上がる"
    ],
    tips: [
      "バランスを保つ",
      "膝を内側に曲げない",
      "ゆっくり動く"
    ],
    reps: "8-12回",
    variations: [
      "壁を使ってサポート",
      "より深くしゃがむ",
      "ウエイトを持って実施"
    ],
    benefits: [
      "下半身の強化",
      "バランス能力向上",
      "体幹の安定性向上"
    ],
    precautions: [
      "膝に負担をかけない",
      "バランスを失わないように注意"
    ]
  },
  {
    id: "advanced-sled-push",
    name: "スレッドプッシュ",
    skillLevel: "advanced",
    category: "lower-body",
    duration: "15-20分",
    difficulty: 4,
    description: "スレッドを押すトレーニング。下半身と体幹の強化。",
    targetMuscles: ["大腿四頭筋", "臀筋群", "腹筋群"],
    procedure: [
      "スレッドの後ろに立つ",
      "両手でハンドルを握る",
      "前に押す",
      "元の位置に戻す"
    ],
    tips: [
      "膝を曲げて押す",
      "体を一直線に保つ",
      "呼吸を止めない"
    ],
    reps: "10-15回",
    variations: [
      "より重いウエイトを使用",
      "より速く動く",
      "異なる距離で実施"
    ],
    benefits: [
      "下半身の強化",
      "体幹の安定性向上",
      "爆発力の向上"
    ],
    precautions: [
      "膝に負担をかけない",
      "腰を傷めないように注意"
    ]
  },
  {
    id: "advanced-landmine-rotation",
    name: "ランドマインローテーション",
    skillLevel: "advanced",
    category: "core",
    duration: "15-20分",
    difficulty: 4,
    description: "ランドマインを使った体幹回転トレーニング。",
    targetMuscles: ["腹斜筋", "腹筋群"],
    procedure: [
      "立つ",
      "ランドマインを胸の高さで持つ",
      "体を回転させながら上に押す",
      "元の位置に戻す"
    ],
    tips: [
      "体を回転させる",
      "ゆっくり動く",
      "呼吸を止めない"
    ],
    reps: "12-15回",
    variations: [
      "より重いウエイトを使用",
      "より大きく回転させる",
      "異なる高さで実施"
    ],
    benefits: [
      "腹斜筋の強化",
      "体幹の回転力向上",
      "爆発力の向上"
    ],
    precautions: [
      "腰に負担をかけない",
      "肩に力を入れすぎない"
    ]
  },
  {
    id: "advanced-overhead-carry",
    name: "オーバーヘッドキャリー",
    skillLevel: "advanced",
    category: "upper-body",
    duration: "15-20分",
    difficulty: 4,
    description: "ウエイトを頭上に持ったまま歩くトレーニング。",
    targetMuscles: ["肩", "三角筋", "体幹"],
    procedure: [
      "ウエイトを頭上に持つ",
      "歩く",
      "バランスを保つ"
    ],
    tips: [
      "バランスを保つ",
      "肩を安定させる",
      "呼吸を止めない"
    ],
    reps: "20-30歩",
    variations: [
      "より重いウエイトを使用",
      "より長い距離を歩く",
      "片手で実施"
    ],
    benefits: [
      "肩の安定性向上",
      "体幹の強化",
      "バランス能力向上"
    ],
    precautions: [
      "バランスを失わないように注意",
      "肩に負担をかけない"
    ]
  },
  {
    id: "advanced-deep-squat-hold",
    name: "ディープスクワットホールド",
    skillLevel: "advanced",
    category: "lower-body",
    duration: "15-20分",
    difficulty: 4,
    description: "深いスクワット姿勢を保つトレーニング。可動性と強度の向上。",
    targetMuscles: ["大腿四頭筋", "ハムストリングス", "臀筋群"],
    procedure: [
      "立つ",
      "深くしゃがむ",
      "30秒～1分キープ",
      "立ち上がる"
    ],
    tips: [
      "バランスを保つ",
      "膝を内側に曲げない",
      "呼吸を止めない"
    ],
    holdTime: "30秒～1分",
    variations: [
      "より深くしゃがむ",
      "ウエイトを持って実施",
      "より長く保つ"
    ],
    benefits: [
      "下半身の柔軟性向上",
      "下半身の強化",
      "可動性の向上"
    ],
    precautions: [
      "膝に負担をかけない",
      "バランスを失わないように注意"
    ]
  },
  {
    id: "advanced-full-body-tension",
    name: "フルボディテンション",
    skillLevel: "advanced",
    category: "core",
    duration: "15-20分",
    difficulty: 5,
    description: "全身に力を入れて保つトレーニング。体幹の最大強化。",
    targetMuscles: ["全身"],
    procedure: [
      "立つ",
      "全身に力を入れる",
      "10-15秒キープ",
      "力を抜く"
    ],
    tips: [
      "最大限に力を入れる",
      "呼吸を止めない",
      "全身を意識する"
    ],
    holdTime: "10-15秒",
    reps: "5-10回",
    variations: [
      "より長く保つ",
      "異なるポジションで実施",
      "複数回繰り返す"
    ],
    benefits: [
      "全身の強化",
      "体幹の最大強化",
      "神経系の向上"
    ],
    precautions: [
      "血圧が上がるので注意",
      "呼吸を止めない"
    ]
  }
];

// 全体幹トレーニングを統合
export const ALL_CORE_TRAINING_EXPANDED: CoreTrainingExpanded[] = [
  ...BEGINNER_CORE_TRAINING,
  ...INTERMEDIATE_CORE_TRAINING,
  ...ADVANCED_CORE_TRAINING
];

export const getCoreTrainingByLevel = (level: SkillLevel): CoreTrainingExpanded[] => {
  return ALL_CORE_TRAINING_EXPANDED.filter(training => training.skillLevel === level);
};

export const getCoreTrainingByCategory = (category: TrainingCategory): CoreTrainingExpanded[] => {
  return ALL_CORE_TRAINING_EXPANDED.filter(training => training.category === category);
};

export const getTotalCoreTrainingCount = (): number => {
  return ALL_CORE_TRAINING_EXPANDED.length;
};
