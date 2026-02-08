/**
 * 卓球用語辞典データベース
 * 初心者向けの卓球用語を詳しく説明
 */

export type GlossaryCategory = "equipment" | "table" | "technique" | "rule" | "other";

export interface GlossaryTerm {
  id: string;
  term: string;
  category: GlossaryCategory;
  furigana: string;
  definition: string;
  detailedExplanation: string;
  relatedTerms: string[];
  examples: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ラケット・道具関連
  {
    id: "forehand",
    term: "フォアハンド",
    category: "equipment",
    furigana: "ふぉあはんど",
    definition: "利き腕側での打ち方。右利きなら右側、左利きなら左側。",
    detailedExplanation: "フォアハンドとは、卓球で利き腕側（通常は体の右側）で打つ打ち方のことです。バックハンドと対比される基本的な打ち方で、多くの攻撃技術はフォアハンドから生まれます。フォアハンドドライブ、フォアハンドスマッシュなど、様々な技術があります。",
    relatedTerms: ["backhand", "drive", "smash"],
    examples: [
      "フォアハンドドライブで相手の下回転を攻撃する",
      "フォアハンド側に来たボールを打つ",
      "フォアハンドの基本フォームを習得する",
    ],
  },

  {
    id: "backhand",
    term: "バックハンド",
    category: "equipment",
    furigana: "ばっくはんど",
    definition: "利き腕と反対側での打ち方。右利きなら左側、左利きなら右側。",
    detailedExplanation: "バックハンドとは、卓球で利き腕と反対側（通常は体の左側）で打つ打ち方のことです。フォアハンドより習得が難しいとされていますが、現代卓球ではバックハンドの重要性が増しています。バックハンドドライブ、バックハンドツッツキなど、様々な技術があります。",
    relatedTerms: ["forehand", "drive", "tsutsuki"],
    examples: [
      "バックハンド側に来たボールを返す",
      "バックハンドドライブで攻撃する",
      "バックハンドツッツキで下回転に対応する",
    ],
  },

  {
    id: "penhold",
    term: "ペンホルダー",
    category: "equipment",
    furigana: "ぺんほるだー",
    definition: "ペンを持つように握るラケットの握り方。主にアジア圏で使われる。",
    detailedExplanation: "ペンホルダーとは、ラケットをペンを持つように握る握り方のことです。親指と人差し指でラケットの柄を挟み、他の指は裏側に添える握り方です。フォアハンドが強力で、台上技術に優れているという特徴があります。主に中国や日本などのアジア圏で使われています。",
    relatedTerms: ["shakehand", "grip", "forehand"],
    examples: [
      "ペンホルダーでフォアハンドドライブを打つ",
      "ペンホルダーの握り方を習得する",
      "ペンホルダーは台上技術が得意",
    ],
  },

  {
    id: "shakehand",
    term: "シェークハンド",
    category: "equipment",
    furigana: "しぇーくはんど",
    definition: "握手をするように握るラケットの握り方。世界的に主流。",
    detailedExplanation: "シェークハンドとは、ラケットを握手をするように握る握り方のことです。手のひら全体でラケットの柄を握り、人差し指と中指でラケットを支える握り方です。バックハンドが強力で、両ハンドが均等に使えるという特徴があります。世界的に最も主流な握り方です。",
    relatedTerms: ["penhold", "grip", "backhand"],
    examples: [
      "シェークハンドで握手をするようにラケットを握る",
      "シェークハンドはバックハンドが強い",
      "シェークハンドで両ハンドドライブを使う",
    ],
  },

  {
    id: "rubber",
    term: "ラバー",
    category: "equipment",
    furigana: "らばー",
    definition: "ラケットに貼る弾性のあるシート。ボールの回転やスピードに影響。",
    detailedExplanation: "ラバーとは、ラケットの木製部分に貼る弾性のあるシート状の素材のことです。ラバーの種類によって、ボールの回転のかかりやすさ、スピード、コントロール性が大きく変わります。表ソフト、裏ソフト、粒高など、様々な種類があります。",
    relatedTerms: ["racket", "spin", "speed"],
    examples: [
      "回転がよくかかるラバーを選ぶ",
      "ラバーの種類によってプレースタイルが変わる",
      "定期的にラバーを張り替える",
    ],
  },

  {
    id: "racket",
    term: "ラケット",
    category: "equipment",
    furigana: "らけっと",
    definition: "卓球でボールを打つための道具。木製の板にラバーを貼ったもの。",
    detailedExplanation: "ラケットとは、卓球でボールを打つための道具のことです。木製の板（ブレード）にラバーを貼ったもので、ペンホルダーとシェークハンドの2つの握り方があります。ラケットの重さ、厚さ、ブレードの大きさなどによって、プレースタイルが変わります。",
    relatedTerms: ["blade", "rubber", "grip"],
    examples: [
      "自分に合ったラケットを選ぶ",
      "ラケットのメンテナンスを定期的に行う",
      "初心者向けのラケットを購入する",
    ],
  },

  {
    id: "blade",
    term: "ブレード",
    category: "equipment",
    furigana: "ぶれーど",
    definition: "ラケットの木製部分。ラバーを貼る板。",
    detailedExplanation: "ブレードとは、ラケットの木製部分のことです。ラバーを貼る板で、木の種類や厚さによって、ボールの打ちやすさやスピード感が変わります。一般的には、5層～7層の木を合わせて作られています。",
    relatedTerms: ["racket", "rubber"],
    examples: [
      "ブレードの厚さを確認する",
      "高級なブレードを使う",
      "ブレードの種類によってプレースタイルが変わる",
    ],
  },

  // 卓球台関連
  {
    id: "table",
    term: "卓球台",
    category: "table",
    furigana: "たっきゅうだい",
    definition: "卓球をする台。長さ2.74m、幅1.525m、高さ0.76m。",
    detailedExplanation: "卓球台とは、卓球をするための台のことです。国際規格では、長さ2.74m、幅1.525m、高さ0.76mと定められています。台の表面は濃紺色で、白いラインが引かれています。台の中央にはネットが張られており、両側から打ち合います。",
    relatedTerms: ["net", "sideline", "endline"],
    examples: [
      "卓球台の大きさを確認する",
      "卓球台の高さを調整する",
      "卓球台の表面を清潔に保つ",
    ],
  },

  {
    id: "net",
    term: "ネット",
    category: "table",
    furigana: "ねっと",
    definition: "卓球台の中央に張られた網。高さ15.25cm。",
    detailedExplanation: "ネットとは、卓球台の中央に張られた網のことです。高さは15.25cmと定められており、ボールがネットに当たると失点になります。ネットの両側から打ち合い、ネットを越えて相手コートにボールを入れることが目標です。",
    relatedTerms: ["table", "court"],
    examples: [
      "ボールがネットに当たった",
      "ネットの高さを確認する",
      "ネットを越えてボールを入れる",
    ],
  },

  {
    id: "sideline",
    term: "サイドライン",
    category: "table",
    furigana: "さいどらいん",
    definition: "卓球台の左右の白いライン。コートの幅を示す。",
    detailedExplanation: "サイドラインとは、卓球台の左右に引かれた白いラインのことです。このラインの内側がコートの範囲となります。ボールがサイドラインの外に出ると失点になります。サイドラインはダブルスのコートの幅も示します。",
    relatedTerms: ["endline", "table"],
    examples: [
      "ボールがサイドラインの外に出た",
      "サイドラインの内側に打つ",
      "サイドラインを目安にコースを狙う",
    ],
  },

  {
    id: "endline",
    term: "エンドライン",
    category: "table",
    furigana: "えんどらいん",
    definition: "卓球台の奥の白いライン。コートの奥行きを示す。",
    detailedExplanation: "エンドラインとは、卓球台の奥に引かれた白いラインのことです。このラインの内側がコートの範囲となります。ボールがエンドラインの外に出ると失点になります。エンドラインは台の奥行きの限界を示します。",
    relatedTerms: ["sideline", "table"],
    examples: [
      "ボールがエンドラインの外に出た",
      "エンドラインの近くに打つ",
      "エンドラインを目安に深いボールを打つ",
    ],
  },

  {
    id: "court",
    term: "コート",
    category: "table",
    furigana: "こーと",
    definition: "卓球台の片側の範囲。サイドラインとエンドラインで囲まれた部分。",
    detailedExplanation: "コートとは、卓球台の片側の範囲のことです。サイドラインとエンドラインで囲まれた部分が1つのコートになります。ボールがコートの内側に入ることが目標です。コートの大きさは、長さ1.37m、幅0.7625mです。",
    relatedTerms: ["sideline", "endline", "table"],
    examples: [
      "ボールをコートの内側に入れる",
      "コートの奥深くに打つ",
      "コートの手前に短く打つ",
    ],
  },

  {
    id: "center",
    term: "センターマーク",
    category: "table",
    furigana: "せんたーまーく",
    definition: "卓球台の中央に引かれた白い短いライン。ダブルスのコート分け。",
    detailedExplanation: "センターマークとは、卓球台の中央に引かれた白い短いラインのことです。ダブルスの試合で、各プレイヤーのコートを分ける目印になります。シングルスではあまり使われません。",
    relatedTerms: ["table", "doubles"],
    examples: [
      "ダブルスではセンターマークでコートを分ける",
      "センターマークを目安にサーブを打つ",
    ],
  },

  // 技術関連用語
  {
    id: "spin",
    term: "スピン（回転）",
    category: "technique",
    furigana: "すぴん",
    definition: "ボールに与える回転。上回転、下回転、横回転などがある。",
    detailedExplanation: "スピンとは、ボールに与える回転のことです。上回転、下回転、横回転、無回転など、様々な種類があります。スピンの種類によって、ボールの軌道や相手の返球が変わります。スピンをかけることは卓球の基本です。",
    relatedTerms: ["topspin", "backspin", "sidespin"],
    examples: [
      "強いスピンをかけてボールを打つ",
      "相手のスピンを読む",
      "スピンの種類を使い分ける",
    ],
  },

  {
    id: "topspin",
    term: "トップスピン（上回転）",
    category: "technique",
    furigana: "とっぷすぴん",
    definition: "ボールの上側に回転をかけること。ドライブなど攻撃技術の基本。",
    detailedExplanation: "トップスピンとは、ボールに上方向の回転をかけることです。ドライブやスマッシュなどの攻撃技術で使われます。トップスピンがかかったボールは、空気抵抗によって落ちやすくなるため、強く打っても台に入りやすくなります。",
    relatedTerms: ["spin", "drive", "backspin"],
    examples: [
      "ドライブで強いトップスピンをかける",
      "トップスピンのボールを返す",
      "トップスピンの感覚を掴む",
    ],
  },

  {
    id: "backspin",
    term: "バックスピン（下回転）",
    category: "technique",
    furigana: "ばっくすぴん",
    definition: "ボールの下側に回転をかけること。守備技術の基本。",
    detailedExplanation: "バックスピンとは、ボールに下方向の回転をかけることです。ツッツキやカットなどの守備技術で使われます。バックスピンがかかったボールは、相手が打ちにくくなります。また、バックスピンに対してドライブで返すと、強い攻撃になります。",
    relatedTerms: ["spin", "tsutsuki", "topspin"],
    examples: [
      "ツッツキで下回転を返す",
      "下回転に対してドライブで攻撃する",
      "下回転の感覚を掴む",
    ],
  },

  {
    id: "sidespin",
    term: "サイドスピン（横回転）",
    category: "technique",
    furigana: "さいどすぴん",
    definition: "ボールの横側に回転をかけること。サーブやチキータで使われる。",
    detailedExplanation: "サイドスピンとは、ボールに横方向の回転をかけることです。サーブやチキータなどで使われます。サイドスピンがかかったボールは、曲がった軌道を描くため、相手は予測しにくくなります。",
    relatedTerms: ["spin", "serve", "chiquita"],
    examples: [
      "サーブで横回転をかける",
      "チキータで横上回転をかける",
      "サイドスピンの軌道を読む",
    ],
  },

  {
    id: "rally",
    term: "ラリー",
    category: "technique",
    furigana: "らりー",
    definition: "相手とボールを打ち合うこと。ラリーが続く間、どちらかがミスするまで続く。",
    detailedExplanation: "ラリーとは、相手とボールを打ち合うことです。サーブから始まり、どちらかがミスするまで続きます。ラリーを続けることで、基本技術を習得したり、相手の動きに対応する力を養ったりできます。",
    relatedTerms: ["serve", "return"],
    examples: [
      "50球以上ラリーを続ける",
      "ラリーの中で相手の弱点を探す",
      "安定したラリーを心がける",
    ],
  },

  {
    id: "serve",
    term: "サーブ",
    category: "technique",
    furigana: "さーぶ",
    definition: "ラリーを始める打ち方。ボールを上に投げて打つ。",
    detailedExplanation: "サーブとは、ラリーを始める打ち方のことです。ボールを16cm以上の高さに投げて、バウンドする前に打ちます。サーブは自分のペースで打つことができるため、攻撃の起点になります。様々な回転やコースのサーブを習得することが重要です。",
    relatedTerms: ["return", "spin"],
    examples: [
      "様々なサーブを習得する",
      "サーブで相手を翻弄する",
      "サーブの精度を上げる",
    ],
  },

  {
    id: "return",
    term: "レシーブ",
    category: "technique",
    furigana: "れしーぶ",
    definition: "相手のサーブに対する返球。サーブの回転を読むことが重要。",
    detailedExplanation: "レシーブとは、相手のサーブに対する返球のことです。サーブの回転を読み、適切な技術で返すことが重要です。レシーブの質が高いと、攻撃的なラリーを展開できます。",
    relatedTerms: ["serve", "spin"],
    examples: [
      "サーブの回転を読んでレシーブする",
      "攻撃的なレシーブに挑戦する",
      "レシーブの精度を上げる",
    ],
  },

  // ルール関連
  {
    id: "deuce",
    term: "デュース",
    category: "rule",
    furigana: "でゅーす",
    definition: "10点以上で同点になった状態。2点差がつくまで続く。",
    detailedExplanation: "デュースとは、10点以上で同点になった状態のことです。例えば、10対10や11対11の場合、デュースになります。デュースになると、2点差がつくまでラリーが続きます。",
    relatedTerms: ["score", "match"],
    examples: [
      "10対10でデュースになった",
      "デュースから逆転する",
      "デュースでの心理戦が重要",
    ],
  },

  {
    id: "fault",
    term: "フォルト",
    category: "rule",
    furigana: "ふぉると",
    definition: "サーブの失敗。ネットに当たったり、コートに入らなかったりすること。",
    detailedExplanation: "フォルトとは、サーブの失敗のことです。ネットに当たったり、コートに入らなかったり、ボールを正しく投げなかったりした場合、フォルトになります。2回フォルトするとポイントを失います。",
    relatedTerms: ["serve", "point"],
    examples: [
      "サーブがフォルトになった",
      "2回フォルトしてポイントを失う",
      "フォルトを減らす",
    ],
  },

  {
    id: "point",
    term: "ポイント",
    category: "rule",
    furigana: "ぽいんと",
    definition: "卓球で得られる得点。1ラリーで1ポイント獲得される。",
    detailedExplanation: "ポイントとは、卓球で得られる得点のことです。1ラリーで1ポイント獲得されます。相手がミスしたり、自分がボールをコートに入れたりするとポイントを獲得します。11ポイント先取で1セット獲得です。",
    relatedTerms: ["game", "set", "match"],
    examples: [
      "ポイントを獲得する",
      "11ポイント先取で勝利",
      "ポイントを積み重ねる",
    ],
  },

  {
    id: "game",
    term: "ゲーム",
    category: "rule",
    furigana: "げーむ",
    definition: "11ポイント先取で1ゲーム獲得。複数ゲームで試合が構成される。",
    detailedExplanation: "ゲームとは、11ポイント先取で獲得される単位のことです。通常、3ゲーム先取で試合に勝利します。例えば、2対0でゲームを先取すると、試合に勝利します。",
    relatedTerms: ["point", "set", "match"],
    examples: [
      "1ゲーム目を獲得する",
      "3ゲーム先取で試合に勝つ",
      "各ゲームで全力を尽くす",
    ],
  },

  // その他
  {
    id: "footwork",
    term: "フットワーク",
    category: "other",
    furigana: "ふっとわーく",
    definition: "卓球での足の動き。正しいフットワークが基本。",
    detailedExplanation: "フットワークとは、卓球での足の動きのことです。正しいフットワークで打球位置に移動することが、安定した打球につながります。小刻みなステップで、常に打球位置に戻ることが重要です。",
    relatedTerms: ["stance", "positioning"],
    examples: [
      "フットワークを改善する",
      "小刻みなステップを意識する",
      "常に打球位置に戻る",
    ],
  },

  {
    id: "stance",
    term: "スタンス",
    category: "other",
    furigana: "すたんす",
    definition: "卓球での基本的な姿勢。足幅は肩幅程度、膝を軽く曲げる。",
    detailedExplanation: "スタンスとは、卓球での基本的な姿勢のことです。足幅は肩幅程度に開き、膝を軽く曲げた状態が基本です。正しいスタンスから、素早く動いて打球位置に移動できます。",
    relatedTerms: ["footwork", "positioning"],
    examples: [
      "基本的なスタンスを習得する",
      "スタンスから素早く動く",
      "常にスタンスを意識する",
    ],
  },

  {
    id: "timing",
    term: "タイミング",
    category: "other",
    furigana: "たいみんぐ",
    definition: "ボールを打つ最適な時間。早い打点で打つことが重要。",
    detailedExplanation: "タイミングとは、ボールを打つ最適な時間のことです。早い打点で打つことで、相手に時間を与えず、攻撃的なラリーを展開できます。タイミングを掴むことは、卓球上達の重要な要素です。",
    relatedTerms: ["footwork", "positioning"],
    examples: [
      "タイミングを掴む",
      "早い打点でボールを捉える",
      "タイミングを意識して打つ",
    ],
  },

  {
    id: "positioning",
    term: "ポジショニング",
    category: "other",
    furigana: "ぽじしょにんぐ",
    definition: "卓球での位置取り。相手の動きを予測して位置を決める。",
    detailedExplanation: "ポジショニングとは、卓球での位置取りのことです。相手の動きを予測して、次のボールに対応しやすい位置に移動することが重要です。良いポジショニングで、試合を有利に進めることができます。",
    relatedTerms: ["footwork", "stance"],
    examples: [
      "相手の動きを予測してポジショニングする",
      "常に次のボールに対応できる位置を保つ",
      "ポジショニングを改善する",
    ],
  },
];

export const GLOSSARY_CATEGORIES = [
  { id: "equipment", name: "道具・ラケット", color: "#FF6B35" },
  { id: "table", name: "卓球台", color: "#4ECDC4" },
  { id: "technique", name: "技術用語", color: "#45B7D1" },
  { id: "rule", name: "ルール", color: "#FFA07A" },
  { id: "other", name: "その他", color: "#95E1D3" },
];

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((term) => term.category === category);
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((term) => term.id === id);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.furigana.toLowerCase().includes(lowerQuery)
  );
}
