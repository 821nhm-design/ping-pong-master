import { glossaryTerms } from './glossary-data-expanded';
import { TECHNIQUES } from './techniques-data';
import { proPlayersMega } from './pro-players-mega';
import { womenProPlayersMega } from './pro-players-women-mega';

export type SearchResult = {
  id: string;
  type: 'glossary' | 'technique' | 'player';
  title: string;
  subtitle?: string;
  description?: string;
  gender?: 'male' | 'female';
};

/**
 * グローバル検索を実行
 * @param query 検索クエリ
 * @returns 検索結果の配列
 */
export function globalSearch(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  // 用語辞典から検索
  const glossaryResults = glossaryTerms.filter(
    (term) =>
      term.name.toLowerCase().includes(lowerQuery) ||
      term.description.toLowerCase().includes(lowerQuery)
  );

  results.push(
    ...glossaryResults.map((term) => ({
      id: term.id,
      type: 'glossary' as const,
      title: term.name,
      subtitle: term.category,
      description: term.description.substring(0, 80),
    }))
  );

  // 技術から検索
  const techniqueResults = TECHNIQUES.filter(
    (tech: any) =>
      tech.name.toLowerCase().includes(lowerQuery) ||
      tech.description.toLowerCase().includes(lowerQuery)
  );

  results.push(
    ...techniqueResults.map((tech) => ({
      id: tech.id,
      type: 'technique' as const,
      title: tech.name,
      subtitle: `難易度: ${tech.difficulty}/5`,
      description: tech.description.substring(0, 80),
    }))
  );

  // プロ選手から検索（男子）
  const malePlayerResults = proPlayersMega.filter(
    (player: any) =>
      player.name.toLowerCase().includes(lowerQuery) ||
      player.nameEnglish.toLowerCase().includes(lowerQuery) ||
      player.country.toLowerCase().includes(lowerQuery)
  );

  results.push(
    ...malePlayerResults.map((player: any) => ({
      id: player.id,
      type: 'player' as const,
      title: player.name,
      subtitle: `${player.country} (男子 #${player.rank})`,
      description: player.description?.substring(0, 80),
      gender: 'male' as const,
    }))
  );

  // プロ選手から検索（女子）
  const femalePlayerResults = womenProPlayersMega.filter(
    (player: any) =>
      player.name.toLowerCase().includes(lowerQuery) ||
      player.nameEnglish.toLowerCase().includes(lowerQuery) ||
      player.country.toLowerCase().includes(lowerQuery)
  );

  results.push(
    ...femalePlayerResults.map((player: any) => ({
      id: player.id,
      type: 'player' as const,
      title: player.name,
      subtitle: `${player.country} (女子 #${player.rank})`,
      description: player.description?.substring(0, 80),
      gender: 'female' as const,
    }))
  );

  return results;
}

/**
 * 検索クエリをハイライトする
 * @param text テキスト
 * @param query 検索クエリ
 * @returns ハイライト済みテキスト
 */
export function highlightQuery(text: string, query: string): string {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '**$1**');
}
