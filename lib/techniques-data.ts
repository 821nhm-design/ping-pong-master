/**
 * 卓球技術データベース
 * 全31種類の卓球技術情報を定義
 */

export type TechniqueCategory = "attack" | "tabletop" | "defense" | "serve" | "other";

export interface ProPlayer {
  id: string;
  name: string;
  country: string;
  profile: string;
  specialty: string;
}

export interface Technique {
  id: string;
  name: string;
  category: TechniqueCategory;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  learningTime: string;
  overview: string;
  steps: string[];
  tips: string[];
  proPlayers: ProPlayer[];
}

export const TECHNIQUES: Technique[] = [
  // 攻撃技術
  {
    id: "drive",
    name: "ドライブ",
    category: "attack",
    description: "ボールをこすり上げるように打って強い上回転をかける攻撃技術",
    difficulty: 3,
    learningTime: "2-4週間",
    overview: "ドライブは卓球の攻撃技術の中でもっとも多用される技術です。ボールをこすり上げるように打つことで強い上回転をかけるため、強く打球しても空気抵抗によってボールが落ちて台に入ります。また、台についたときに摩擦で加速するのも特徴です。",
    steps: [
      "基本姿勢を取る：足幅は肩幅程度、膝を軽く曲げる",
      "ラケットを下げる：打球点より下にラケットを準備する",
      "下から上へスイング：ボールの下部をこすりながら上に打ち上げる",
      "フォロースルー：スイングを最後まで完成させる",
    ],
    tips: [
      "回転をかけることが最優先。スピードは二の次",
      "打球点は体の前方で捉える",
      "腰の回転を使ってパワーを生み出す",
      "下回転に対しては、ラケット面を立て気味にする",
    ],
    proPlayers: [
      {
        id: "fan-zhendong",
        name: "樊振東",
        country: "中国",
        profile: "中国の世界トップクラスの選手。バックハンドドライブが得意",
        specialty: "バックハンドドライブ",
      },
    ],
  },

  {
    id: "speed-drive",
    name: "スピードドライブ",
    category: "attack",
    description: "回転量よりスピードを重視するドライブ。遠心力を生かした高速打球",
    difficulty: 4,
    learningTime: "3-5週間",
    overview: "スピードドライブは、ドライブの一種で、回転量よりもボールのスピードを重視する打ち方です。腰の回転と腕のスイングを大きく使い、遠心力を生むことでボールのスピードを出します。コースに決まれば得点につながりやすいですが、大きな弧線を描かないため台に入らないリスクもあります。",
    steps: [
      "準備姿勢：体を少し開く",
      "大きなバックスイング：腕を大きく引く",
      "素早いスイング：腰の回転と腕の力を組み合わせる",
      "インパクト：ボールの中心を捉える",
    ],
    tips: [
      "スピード重視なので、完全な回転をかける必要はない",
      "タイミングが重要。早い打点で捉える",
      "コースを狙う意識を持つ",
    ],
    proPlayers: [],
  },

  {
    id: "loop-drive",
    name: "ループドライブ",
    category: "attack",
    description: "スピードより回転量を重視するドライブ。安定性が高い",
    difficulty: 3,
    learningTime: "2-4週間",
    overview: "ループドライブはスピードよりも回転量を重視するドライブです。コンパクトにスイングすることで、強い回転をかけてミスを誘います。弧線が大きいため、スピードドライブより安定して台に入ります。",
    steps: [
      "コンパクトな準備：ラケットを立て気味に準備",
      "下から上へのスイング：強い摩擦を意識",
      "高い弧線を描く：ボールを高く上げる",
      "安定した着地：台の深い位置に落とす",
    ],
    tips: [
      "回転をかけることに集中する",
      "弧線が大きいほど安定する",
      "相手のドライブに対する守備としても機能",
    ],
    proPlayers: [],
  },

  {
    id: "smash",
    name: "スマッシュ",
    category: "attack",
    description: "高い打点から台と平行に強打する技術。最速時速90km",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "スマッシュは、高い打点から台と平行にスイングして、強打を打つ技術です。最も打球速度が高い技術で、プロだと時速90kmに達することもあります。入れば高い確率でポイントを奪えるでしょう。",
    steps: [
      "ボール位置の確認：高いボールを見つける",
      "ラケット準備：ラケットを高く構える",
      "台と平行にスイング：力強く打ち込む",
      "フォロースルー：スイングを完成させる",
    ],
    tips: [
      "高いボールに対してのみ使用する",
      "力を入れすぎてミスしないようにする",
      "コースを狙う余裕を持つ",
    ],
    proPlayers: [],
  },

  {
    id: "counter",
    name: "カウンター",
    category: "attack",
    description: "相手のドライブを早い打点で捉えてドライブで返す技術",
    difficulty: 5,
    learningTime: "4-6週間",
    overview: "カウンターとは、相手のドライブを早い打点（バウンドした直後）で捉えて、ドライブで返す技術です。早い打点で打つため、相手の回転が強く残っており、ボールのスピードも速い状態です。そのため、正確に捉えるのは困難ですが、相手のボールの力を利用して強い打球を打つことができます。",
    steps: [
      "相手のボールを予測する",
      "早い打点で準備する",
      "相手の力を利用する",
      "正確なタイミングで打つ",
    ],
    tips: [
      "タイミングが最も重要",
      "相手の回転を読む力が必要",
      "失敗を恐れずに挑戦する",
    ],
    proPlayers: [
      {
        id: "zhang-ben",
        name: "張本智和",
        country: "日本",
        profile: "日本の若手トップ選手。パンチカウンターが得意",
        specialty: "パンチカウンター",
      },
    ],
  },

  // 台上技術
  {
    id: "flick",
    name: "フリック",
    category: "tabletop",
    description: "台上からコンパクトに払うように打って上回転をかける攻撃技術",
    difficulty: 3,
    learningTime: "2-3週間",
    overview: "フリックとは、攻撃的な台上技術です。台上技術とは、卓球台の上で使う技術のこと。卓球台の上では、ドライブのようにラケットを下げるバックスイングができません。そのため台上は、台外とは違う技術が必要になります。フリックは台上からコンパクトに払うように打って、上回転をかけます。",
    steps: [
      "台上での準備：ラケットを立て気味に構える",
      "コンパクトなスイング：短い動きで払う",
      "上回転をかける：ボールをこする",
      "相手コートへ送る：短い距離で返球",
    ],
    tips: [
      "バックスイングを最小限にする",
      "手首のスナップを使う",
      "ボールの下部をこする",
    ],
    proPlayers: [],
  },

  {
    id: "chiquita",
    name: "チキータ",
    category: "tabletop",
    description: "バックハンド限定の台上技術。手首をひねって横上回転をかける",
    difficulty: 4,
    learningTime: "3-4週間",
    overview: "チキータは、フリックと同様に攻撃的な台上技術です。バックハンド限定の技術で、手首を大きくひねり、ボールの左側を打球することで、横上回転をかけます。フリック以上に強烈な回転がかかるため、より有効な攻撃が可能です。",
    steps: [
      "台上での準備：バックハンド側に構える",
      "手首をひねる：大きく手首を回転させる",
      "ボールの側面を打つ：横上回転を意識",
      "強い回転で返球：相手に強い回転を与える",
    ],
    tips: [
      "手首の回転が最も重要",
      "ボールの側面を正確に捉える",
      "強い下回転に対して有効",
    ],
    proPlayers: [
      {
        id: "zhang-ben",
        name: "張本智和",
        country: "日本",
        profile: "チキータが得意な若手選手",
        specialty: "スピードチキータ",
      },
    ],
  },

  // 守備技術
  {
    id: "tsutsuki",
    name: "ツッツキ",
    category: "defense",
    description: "下回転に対する基本的な守備技術",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "ツッツキは下回転に対する基本的な守備技術です。ボールを軽くこすりながら返球する技術で、初心者が最初に習う技術の一つです。",
    steps: [
      "基本姿勢：足幅は肩幅程度",
      "ラケット準備：ラケット面を立て気味に準備",
      "軽くこする：ボールを軽くこすりながら返す",
      "相手コートへ返球：安定した返球を心がける",
    ],
    tips: [
      "ボールを軽くこすることが重要",
      "力を入れすぎない",
      "ボールの下部をこする",
    ],
    proPlayers: [
      {
        id: "fan-zhendong",
        name: "樊振東",
        country: "中国",
        profile: "ツッツキからのバックハンドドライブが得意",
        specialty: "ツッツキからのドライブ",
      },
    ],
  },

  {
    id: "block",
    name: "ブロック",
    category: "defense",
    description: "相手のドライブを受けて返す守備技術",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "ブロックは相手のドライブを受けて返す守備技術です。ラケットを立て気味に構えて、相手のボールを受け止めるように返球します。",
    steps: [
      "準備姿勢：ラケットを立て気味に構える",
      "ボールを受ける：相手のドライブを受け止める",
      "軽く返す：ボールを軽く返球する",
      "次の球に備える：すぐに次の準備をする",
    ],
    tips: [
      "ラケット面を立て気味にする",
      "力を入れすぎない",
      "相手のボールの力を利用する",
    ],
    proPlayers: [],
  },

  {
    id: "cut",
    name: "カット",
    category: "defense",
    description: "下回転を打つ守備技術。カットマンが多用する",
    difficulty: 3,
    learningTime: "2-4週間",
    overview: "カットは下回転を打つ守備技術です。ボールの下部を大きくこすることで、強い下回転をかけて返球します。",
    steps: [
      "準備姿勢：後ろに下がる",
      "ラケット準備：ラケットを上に構える",
      "下から上へスイング：ボールの下部をこする",
      "強い下回転で返球：相手に下回転を与える",
    ],
    tips: [
      "ボールの下部をこすることが重要",
      "後ろに下がるスペースが必要",
      "強い下回転をかけることを意識",
    ],
    proPlayers: [],
  },

  {
    id: "stop",
    name: "ストップ",
    category: "defense",
    description: "台上での守備技術。ボールを短く返す",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "ストップは台上での守備技術です。ボールを短く返すことで、相手に時間を与えない返球をします。",
    steps: [
      "台上での準備：ラケットを立て気味に構える",
      "ボールを受ける：ボールを軽く受ける",
      "短く返す：ボールを短く返球する",
      "次の球に備える：すぐに次の準備をする",
    ],
    tips: [
      "ボールを短く返すことが重要",
      "力を入れすぎない",
      "相手の位置を考えて返球する",
    ],
    proPlayers: [],
  },

  // サーブ
  {
    id: "fore-serve",
    name: "フォアサーブ",
    category: "serve",
    description: "フォアハンド側から打つサーブ。基本的なサーブ",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "フォアサーブはフォアハンド側から打つサーブです。最も基本的なサーブで、初心者が最初に習う技術です。",
    steps: [
      "準備姿勢：足幅は肩幅程度、体を少し開く",
      "トスアップ：ボールを上に投げ上げる",
      "スイング：ボールを打つ",
      "フォロースルー：スイングを完成させる",
    ],
    tips: [
      "トスアップを安定させることが重要",
      "ボールをこすって回転をかける",
      "コースを狙う意識を持つ",
    ],
    proPlayers: [],
  },

  {
    id: "back-serve",
    name: "バックサーブ",
    category: "serve",
    description: "バックハンド側から打つサーブ",
    difficulty: 3,
    learningTime: "2-3週間",
    overview: "バックサーブはバックハンド側から打つサーブです。フォアサーブとは異なる回転をかけることができます。",
    steps: [
      "準備姿勢：体をやや閉じる",
      "トスアップ：ボールを上に投げ上げる",
      "スイング：バックハンドでボールを打つ",
      "フォロースルー：スイングを完成させる",
    ],
    tips: [
      "トスアップの位置が重要",
      "ボールをこすって回転をかける",
      "フォアサーブとは異なる回転を意識",
    ],
    proPlayers: [],
  },

  // その他
  {
    id: "meet",
    name: "ミート打ち",
    category: "other",
    description: "小さいモーションで押し出すように打つ基本技術",
    difficulty: 1,
    learningTime: "1週間",
    overview: "ミート打ちは練習の最初に行うフォア打ちのような打ち方をいいます。ボールをこすって回転をかけるのではなく、小さいモーションで押し出すように打ちます。",
    steps: [
      "基本姿勢：足幅は肩幅程度",
      "ラケット準備：ラケットを準備する",
      "小さなスイング：短い動きでボールを打つ",
      "相手コートへ返球：安定した返球を心がける",
    ],
    tips: [
      "小さなモーションを心がける",
      "力を入れすぎない",
      "ボールの中心を捉える",
    ],
    proPlayers: [],
  },

  {
    id: "push",
    name: "プッシュ",
    category: "other",
    description: "台上での攻撃技術。ボールを押し出すように打つ",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "プッシュは台上での攻撃技術です。ボールを押し出すように打つことで、相手に攻撃を仕掛けます。",
    steps: [
      "台上での準備：ラケットを準備する",
      "ボールを押す：ボールを押し出すように打つ",
      "攻撃的に返球：相手に攻撃を仕掛ける",
      "次の球に備える：すぐに次の準備をする",
    ],
    tips: [
      "ボールを押し出すことが重要",
      "攻撃的な姿勢を持つ",
      "相手の位置を考えて返球する",
    ],
    proPlayers: [],
  },

  {
    id: "lob",
    name: "ロビング",
    category: "other",
    description: "ボールを高く上げて返す守備技術",
    difficulty: 2,
    learningTime: "1-2週間",
    overview: "ロビングはボールを高く上げて返す守備技術です。相手が前に詰めてきた場合に有効な技術です。",
    steps: [
      "準備姿勢：後ろに下がる",
      "ラケット準備：ラケットを下に構える",
      "下から上へスイング：ボールを高く上げる",
      "高い弧線で返球：相手コートの深い位置に落とす",
    ],
    tips: [
      "ボールを高く上げることが重要",
      "後ろに下がるスペースが必要",
      "相手の位置を考えて返球する",
    ],
    proPlayers: [],
  },
];

export const CATEGORIES = [
  { id: "attack", name: "攻撃技術", color: "#FF6B35" },
  { id: "tabletop", name: "台上技術", color: "#4ECDC4" },
  { id: "defense", name: "守備技術", color: "#45B7D1" },
  { id: "serve", name: "サーブ", color: "#FFA07A" },
  { id: "other", name: "その他", color: "#95E1D3" },
];

export function getTechniquesByCategory(category: TechniqueCategory): Technique[] {
  return TECHNIQUES.filter((tech) => tech.category === category);
}

export function getTechniqueById(id: string): Technique | undefined {
  return TECHNIQUES.find((tech) => tech.id === id);
}

export function searchTechniques(query: string): Technique[] {
  const lowerQuery = query.toLowerCase();
  return TECHNIQUES.filter(
    (tech) =>
      tech.name.toLowerCase().includes(lowerQuery) ||
      tech.description.toLowerCase().includes(lowerQuery)
  );
}
