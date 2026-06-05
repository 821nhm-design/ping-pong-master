import { describe, it, expect, beforeEach, vi } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
  getFavoritesByType,
  clearFavorites,
  FavoriteItem,
} from './favorites-utils';

// AsyncStorageをモック
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe('favorites-utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get empty favorites initially', async () => {
    vi.mocked(AsyncStorage.getItem).mockResolvedValueOnce(null);
    const favorites = await getFavorites();
    expect(favorites).toEqual([]);
  });

  it('should add a favorite', async () => {
    const mockFavorites: FavoriteItem[] = [];
    vi.mocked(AsyncStorage.getItem).mockResolvedValueOnce(JSON.stringify(mockFavorites));
    vi.mocked(AsyncStorage.setItem).mockResolvedValueOnce(undefined);

    await addFavorite({
      id: 'test-1',
      type: 'glossary',
      title: 'テスト用語',
    });

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('should not add duplicate favorites', async () => {
    const mockFavorites: FavoriteItem[] = [
      {
        id: 'test-1',
        type: 'glossary',
        title: 'テスト用語',
        timestamp: Date.now(),
      },
    ];
    vi.mocked(AsyncStorage.getItem).mockResolvedValueOnce(JSON.stringify(mockFavorites));
    vi.mocked(AsyncStorage.setItem).mockResolvedValueOnce(undefined);

    await addFavorite({
      id: 'test-1',
      type: 'glossary',
      title: 'テスト用語',
    });

    // setItemが呼ばれないことを確認（重複を追加していない）
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('should remove a favorite', async () => {
    const mockFavorites: FavoriteItem[] = [
      {
        id: 'test-1',
        type: 'glossary',
        title: 'テスト用語',
        timestamp: Date.now(),
      },
    ];
    vi.mocked(AsyncStorage.getItem).mockResolvedValueOnce(JSON.stringify(mockFavorites));
    vi.mocked(AsyncStorage.setItem).mockResolvedValueOnce(undefined);

    await removeFavorite('test-1', 'glossary');

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('should check if item is favorite', async () => {
    const mockFavorites: FavoriteItem[] = [
      {
        id: 'test-1',
        type: 'glossary',
        title: 'テスト用語',
        timestamp: Date.now(),
      },
    ];
    vi.mocked(AsyncStorage.getItem).mockResolvedValueOnce(JSON.stringify(mockFavorites));

    const result = await isFavorite('test-1', 'glossary');
    expect(result).toBe(true);
  });

  it('should filter favorites by type', async () => {
    const mockFavorites: FavoriteItem[] = [
      {
        id: 'test-1',
        type: 'glossary',
        title: 'テスト用語',
        timestamp: Date.now(),
      },
      {
        id: 'test-2',
        type: 'technique',
        title: 'テスト技術',
        timestamp: Date.now(),
      },
    ];
    vi.mocked(AsyncStorage.getItem).mockResolvedValueOnce(JSON.stringify(mockFavorites));

    const glossaryFavorites = await getFavoritesByType('glossary');
    expect(glossaryFavorites).toHaveLength(1);
    expect(glossaryFavorites[0].type).toBe('glossary');
  });

  it('should clear all favorites', async () => {
    vi.mocked(AsyncStorage.removeItem).mockResolvedValueOnce(undefined);

    await clearFavorites();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('ping_pong_favorites');
  });
});
