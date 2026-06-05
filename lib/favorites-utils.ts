import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavoriteItem = {
  id: string;
  type: 'glossary' | 'technique' | 'player';
  title: string;
  timestamp: number;
  gender?: 'male' | 'female';
};

const FAVORITES_KEY = 'ping_pong_favorites';

/**
 * すべてのお気に入りを取得
 */
export async function getFavorites(): Promise<FavoriteItem[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

/**
 * お気に入りを追加
 */
export async function addFavorite(item: Omit<FavoriteItem, 'timestamp'>): Promise<void> {
  try {
    const favorites = await getFavorites();
    
    // 既に存在するかチェック
    const exists = favorites.some(
      (fav) => fav.id === item.id && fav.type === item.type
    );
    
    if (!exists) {
      favorites.push({
        ...item,
        timestamp: Date.now(),
      });
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
}

/**
 * お気に入りを削除
 */
export async function removeFavorite(id: string, type: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(
      (fav) => !(fav.id === id && fav.type === type)
    );
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
}

/**
 * お気に入りかどうかをチェック
 */
export async function isFavorite(id: string, type: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.some(
      (fav) => fav.id === id && fav.type === type
    );
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
}

/**
 * タイプ別にお気に入りをフィルタリング
 */
export async function getFavoritesByType(
  type: 'glossary' | 'technique' | 'player'
): Promise<FavoriteItem[]> {
  try {
    const favorites = await getFavorites();
    return favorites.filter((fav) => fav.type === type);
  } catch (error) {
    console.error('Error filtering favorites:', error);
    return [];
  }
}

/**
 * すべてのお気に入りをクリア
 */
export async function clearFavorites(): Promise<void> {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
}
