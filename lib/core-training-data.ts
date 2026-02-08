/**
 * 体幹トレーニングメニューデータベース
 * 卓球上達に必要な体幹強化トレーニング
 */

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface CoreTrainingMenu {
  id: string;
  name: string;
  skillLevel: SkillLevel;
  duration: string;
  difficulty: number;
  description: string;
  objectives: string[];
  procedure: string[];
  tips: string[];
  requiredEquipment: string[];
  variations: string[];
  benefits: string[];
}

export const CORE_TRAINING_MENUS: CoreTrainingMenu[] = [
  // 初心者向け体幹トレーニング
  {
    id: "beginner-plank",
    name: "プランク（基本）",
    skillLevel: "beginner",
    duration: "20～30秒 × 3セット",
    difficulty: 1,
    description: "体幹の基本的なトレーニング。腹筋と背筋を同時に鍛える。",
    objectives: [
      "体幹の基礎筋力を養う",
      "正しい姿勢を習得する",
      "腹筋と背筋のバランスを整える",
    ],
    procedure: [
      "うつぶせになり、肘と足の爪先で体を支える",
      "肘は肩の真下に位置させる",
      "体が一直線になるように意識する",
      "お尻が上がらないよう注意する",
      "20～30秒間キープする",
      "30秒休憩して、3セット繰り返す",
    ],
    tips: [
      "首を上げすぎず、視線は下に向ける",
      "呼吸を止めず、常に呼吸を続ける",
      "腹筋に力を入れることを意識する",
      "背中が反らないようにする",
    ],
    requiredEquipment: ["ヨガマット（あると良い）"],
    variations: [
      "膝をついてプランクを行う（難易度を下げる）",
      "片足を上げてプランクを行う（難易度を上げる）",
    ],
    benefits: [
      "体幹の安定性が向上する",
      "姿勢が改善される",
      "卓球での安定した打球が可能になる",
    ],
  },

  {
    id: "beginner-dead-bug",
    name: "デッドバグ",
    skillLevel: "beginner",
    duration: "10回 × 3セット",
    difficulty: 1,
    description: "仰向けで行う体幹トレーニング。腹筋を中心に鍛える。",
    objectives: [
      "腹筋の力を養う",
      "体幹の安定性を高める",
      "腰への負担を減らす",
    ],
    procedure: [
      "仰向けに寝て、両腕を天井に向かって伸ばす",
      "両膝を90度に曲げて、腰の上に位置させる",
      "右腕と左脚を同時に伸ばす",
      "元の位置に戻す",
      "左腕と右脚を同時に伸ばす",
      "10回繰り返す",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "腰が浮かないようにする",
      "ゆっくりとした動きで行う",
      "腹筋に力を入れることを意識する",
      "呼吸を止めないようにする",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "動きを遅くして、負荷を高める",
      "片側ずつ行って、難易度を下げる",
    ],
    benefits: [
      "腹筋が強化される",
      "体幹の安定性が向上する",
      "腰痛の予防になる",
    ],
  },

  {
    id: "beginner-bird-dog",
    name: "バードドッグ",
    skillLevel: "beginner",
    duration: "10回 × 3セット",
    difficulty: 2,
    description: "四つん這いで行う体幹トレーニング。背筋を中心に鍛える。",
    objectives: [
      "背筋の力を養う",
      "体幹の安定性を高める",
      "腰の安定性を向上させる",
    ],
    procedure: [
      "四つん這いになる",
      "両手は肩の真下、両膝は腰の真下に位置させる",
      "右腕と左脚を同時に伸ばす",
      "1秒間キープする",
      "元の位置に戻す",
      "左腕と右脚を同時に伸ばす",
      "10回繰り返す",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "腰が反らないようにする",
      "腕と脚を一直線に伸ばす",
      "ゆっくりとした動きで行う",
      "体幹に力を入れることを意識する",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "脚だけを伸ばして、難易度を下げる",
      "キープ時間を長くして、難易度を上げる",
    ],
    benefits: [
      "背筋が強化される",
      "体幹の安定性が向上する",
      "卓球での打球姿勢が安定する",
    ],
  },

  {
    id: "beginner-glute-bridge",
    name: "グルートブリッジ",
    skillLevel: "beginner",
    duration: "15回 × 3セット",
    difficulty: 1,
    description: "仰向けで行うお尻と腰の筋肉を鍛えるトレーニング。",
    objectives: [
      "お尻の筋肉を強化する",
      "腰の安定性を高める",
      "体幹全体の力を養う",
    ],
    procedure: [
      "仰向けに寝て、膝を曲げる",
      "両足は肩幅程度に開く",
      "両腕は体の横に置く",
      "お尻と腰を上げて、体が一直線になるようにする",
      "1秒間キープする",
      "ゆっくり下ろす",
      "15回繰り返す",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "お尻の筋肉を意識する",
      "腰が反らないようにする",
      "ゆっくりとした動きで行う",
      "呼吸を止めないようにする",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "片足を上げてブリッジを行う（難易度を上げる）",
      "キープ時間を長くする（難易度を上げる）",
    ],
    benefits: [
      "お尻の筋肉が強化される",
      "腰の安定性が向上する",
      "卓球での下半身の安定性が高まる",
    ],
  },

  {
    id: "beginner-side-plank",
    name: "サイドプランク（初心者）",
    skillLevel: "beginner",
    duration: "15～20秒 × 3セット（各側）",
    difficulty: 2,
    description: "横向きで行う体幹トレーニング。脇腹の筋肉を鍛える。",
    objectives: [
      "脇腹の筋肉を強化する",
      "体幹の側面の安定性を高める",
      "バランス感覚を養う",
    ],
    procedure: [
      "横向きに寝る",
      "肘と脚の側面で体を支える",
      "肘は肩の真下に位置させる",
      "体が一直線になるように意識する",
      "15～20秒間キープする",
      "30秒休憩して、反対側も同様に行う",
      "各側3セット繰り返す",
    ],
    tips: [
      "腰が下がらないようにする",
      "首を上げすぎず、視線は前に向ける",
      "呼吸を止めず、常に呼吸を続ける",
      "脇腹に力を入れることを意識する",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "膝をついてサイドプランクを行う（難易度を下げる）",
      "上側の脚を上げてサイドプランクを行う（難易度を上げる）",
    ],
    benefits: [
      "脇腹の筋肉が強化される",
      "体幹の側面の安定性が向上する",
      "卓球での左右の動きが安定する",
    ],
  },

  // 中級者向け体幹トレーニング
  {
    id: "intermediate-plank-reach",
    name: "プランク・リーチ",
    skillLevel: "intermediate",
    duration: "10回 × 3セット",
    difficulty: 3,
    description: "プランク姿勢から腕を伸ばすトレーニング。体幹の安定性を高める。",
    objectives: [
      "体幹の安定性を大幅に向上させる",
      "肩の安定性を高める",
      "バランス感覚を養う",
    ],
    procedure: [
      "プランク姿勢になる",
      "右腕を前に伸ばす",
      "1秒間キープする",
      "元の位置に戻す",
      "左腕を前に伸ばす",
      "10回繰り返す",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "体が回転しないようにする",
      "腕を伸ばすときに体が傾かないようにする",
      "ゆっくりとした動きで行う",
      "体幹に力を入れることを意識する",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "脚を伸ばしたまま腕を伸ばす（難易度を上げる）",
      "キープ時間を長くする（難易度を上げる）",
    ],
    benefits: [
      "体幹の安定性が大幅に向上する",
      "肩の安定性が高まる",
      "卓球での複雑な動きが安定する",
    ],
  },

  {
    id: "intermediate-russian-twist",
    name: "ロシアンツイスト",
    skillLevel: "intermediate",
    duration: "20回 × 3セット",
    difficulty: 3,
    description: "体をひねるトレーニング。腹斜筋と体幹の回転力を鍛える。",
    objectives: [
      "腹斜筋を強化する",
      "体幹の回転力を養う",
      "卓球での回転動作を改善する",
    ],
    procedure: [
      "仰向けに寝て、膝を曲げる",
      "上体を少し起こして、両腕を胸の前で組む",
      "右側に体をひねる",
      "左側に体をひねる",
      "20回繰り返す（左右で1回）",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "腹斜筋に力を入れることを意識する",
      "ゆっくりとした動きで行う",
      "腰が浮かないようにする",
      "呼吸を止めないようにする",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "ダンベルやメディシンボールを持って行う（難易度を上げる）",
      "脚を上げたまま行う（難易度を上げる）",
    ],
    benefits: [
      "腹斜筋が強化される",
      "体幹の回転力が向上する",
      "卓球でのドライブやスマッシュの威力が上がる",
    ],
  },

  {
    id: "intermediate-mountain-climber",
    name: "マウンテンクライマー",
    skillLevel: "intermediate",
    duration: "30秒 × 3セット",
    difficulty: 3,
    description: "プランク姿勢から膝を交互に引き上げるトレーニング。",
    objectives: [
      "体幹と下半身の筋力を養う",
      "心肺機能を向上させる",
      "体幹の動的安定性を高める",
    ],
    procedure: [
      "プランク姿勢になる",
      "右膝を胸に引き上げる",
      "素早く左膝を胸に引き上げる",
      "交互に膝を引き上げる動きを続ける",
      "30秒間続ける",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "速度を上げすぎず、正確な動きを心がける",
      "体が上下に揺れないようにする",
      "呼吸を止めないようにする",
      "体幹に力を入れることを意識する",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "速度を上げて、難易度を上げる",
      "膝を横に引き上げて、難易度を変える",
    ],
    benefits: [
      "体幹と下半身の筋力が向上する",
      "心肺機能が向上する",
      "卓球での素早い動きが可能になる",
    ],
  },

  {
    id: "intermediate-ab-wheel",
    name: "アブホイール",
    skillLevel: "intermediate",
    duration: "8～10回 × 3セット",
    difficulty: 4,
    description: "ローラーを使った腹筋トレーニング。強度が高い。",
    objectives: [
      "腹筋を強力に鍛える",
      "体幹の安定性を大幅に向上させる",
      "肩の安定性を高める",
    ],
    procedure: [
      "膝をついて、アブホイールを持つ",
      "ゆっくり前に転がす",
      "体が一直線になるまで転がす",
      "腹筋の力で元の位置に戻す",
      "8～10回繰り返す",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "ゆっくりとした動きで行う",
      "腹筋に力を入れることを意識する",
      "腰が反らないようにする",
      "呼吸を止めないようにする",
    ],
    requiredEquipment: ["アブホイール"],
    variations: [
      "立った状態で行う（難易度を大幅に上げる）",
      "片側ずつ転がす（難易度を変える）",
    ],
    benefits: [
      "腹筋が強力に鍛えられる",
      "体幹の安定性が大幅に向上する",
      "卓球での強力な打球が可能になる",
    ],
  },

  {
    id: "intermediate-side-plank-reach",
    name: "サイドプランク・リーチ",
    skillLevel: "intermediate",
    duration: "10回 × 3セット（各側）",
    difficulty: 3,
    description: "サイドプランク姿勢から腕を伸ばすトレーニング。",
    objectives: [
      "脇腹の筋肉を強化する",
      "体幹の側面の安定性を高める",
      "バランス感覚を養う",
    ],
    procedure: [
      "サイドプランク姿勢になる",
      "上側の腕を天井に向かって伸ばす",
      "上側の腕を体の下に通す",
      "元の位置に戻す",
      "10回繰り返す",
      "30秒休憩して、反対側も同様に行う",
      "各側3セット繰り返す",
    ],
    tips: [
      "体が回転しないようにする",
      "腕の動きに合わせて体が動かないようにする",
      "ゆっくりとした動きで行う",
      "脇腹に力を入れることを意識する",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "脚を伸ばしたまま行う（難易度を上げる）",
      "上側の脚を上げたまま行う（難易度を上げる）",
    ],
    benefits: [
      "脇腹の筋肉が強化される",
      "体幹の側面の安定性が向上する",
      "卓球での左右の動きが安定する",
    ],
  },

  // 上級者向け体幹トレーニング
  {
    id: "advanced-plank-to-downward-dog",
    name: "プランク・トゥ・ダウンワードドッグ",
    skillLevel: "advanced",
    duration: "12回 × 3セット",
    difficulty: 4,
    description: "プランクからダウンワードドッグへの動的トレーニング。",
    objectives: [
      "体幹全体の筋力を養う",
      "肩と背筋を強化する",
      "柔軟性と筋力を同時に高める",
    ],
    procedure: [
      "プランク姿勢になる",
      "腰を上げて、ダウンワードドッグの姿勢になる",
      "プランク姿勢に戻す",
      "12回繰り返す",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "動きをゆっくり行う",
      "体幹に力を入れることを意識する",
      "肩が耳に近づかないようにする",
      "呼吸を止めないようにする",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "ダウンワードドッグで脚を上げる（難易度を上げる）",
      "速度を上げて行う（難易度を上げる）",
    ],
    benefits: [
      "体幹全体の筋力が向上する",
      "肩と背筋が強化される",
      "卓球での複雑な動きが安定する",
    ],
  },

  {
    id: "advanced-rotating-plank",
    name: "ロテーティングプランク",
    skillLevel: "advanced",
    duration: "10回 × 3セット",
    difficulty: 4,
    description: "プランク姿勢から体を回転させるトレーニング。",
    objectives: [
      "体幹の回転力を養う",
      "体幹全体の筋力を高める",
      "バランス感覚を養う",
    ],
    procedure: [
      "プランク姿勢になる",
      "体を右側に回転させ、右側のサイドプランクになる",
      "プランク姿勢に戻す",
      "体を左側に回転させ、左側のサイドプランクになる",
      "プランク姿勢に戻す",
      "10回繰り返す（左右で1回）",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "体が上下に揺れないようにする",
      "ゆっくりとした動きで行う",
      "体幹に力を入れることを意識する",
      "呼吸を止めないようにする",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "脚を伸ばしたまま行う（難易度を上げる）",
      "速度を上げて行う（難易度を上げる）",
    ],
    benefits: [
      "体幹の回転力が向上する",
      "体幹全体の筋力が高まる",
      "卓球でのドライブやスマッシュの威力が大幅に上がる",
    ],
  },

  {
    id: "advanced-hollow-body-hold",
    name: "ホロウボディホールド",
    skillLevel: "advanced",
    duration: "30～45秒 × 3セット",
    difficulty: 4,
    description: "体を反らせた状態でキープするトレーニング。体幹全体を鍛える。",
    objectives: [
      "体幹全体の筋力を養う",
      "体の緊張感を高める",
      "姿勢を改善する",
    ],
    procedure: [
      "仰向けに寝る",
      "両腕を頭の上に伸ばす",
      "両脚を伸ばす",
      "腹筋に力を入れて、体全体を少し浮かせる",
      "体が一直線になるようにキープする",
      "30～45秒間キープする",
      "30秒休憩して、3セット行う",
    ],
    tips: [
      "腹筋に力を入れることを意識する",
      "腰が浮きすぎないようにする",
      "呼吸を止めず、常に呼吸を続ける",
      "首に力が入らないようにする",
    ],
    requiredEquipment: ["ヨガマット"],
    variations: [
      "キープ時間を長くする（難易度を上げる）",
      "脚を上げたまま行う（難易度を上げる）",
    ],
    benefits: [
      "体幹全体の筋力が向上する",
      "体の緊張感が高まる",
      "卓球での安定した打球が可能になる",
    ],
  },
];

export const SKILL_LEVELS = [
  { id: "beginner", name: "初心者" },
  { id: "intermediate", name: "中級者" },
  { id: "advanced", name: "上級者" },
];

export function getCoreTrainingMenusByLevel(level: SkillLevel): CoreTrainingMenu[] {
  return CORE_TRAINING_MENUS.filter((menu) => menu.skillLevel === level);
}

export function getCoreTrainingMenuById(id: string): CoreTrainingMenu | undefined {
  return CORE_TRAINING_MENUS.find((menu) => menu.id === id);
}

export function searchCoreTrainingMenus(query: string): CoreTrainingMenu[] {
  const lowerQuery = query.toLowerCase();
  return CORE_TRAINING_MENUS.filter(
    (menu) =>
      menu.name.toLowerCase().includes(lowerQuery) ||
      menu.description.toLowerCase().includes(lowerQuery)
  );
}
