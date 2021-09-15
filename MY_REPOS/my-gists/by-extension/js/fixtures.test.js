// Actions.
import { createAppActions } from '../reducers/actions';

// State.
import { getDefaultAppState } from '../reducers/state';

// Fixtures.
import { getMockAppActions, getMockAppState } from './';

describe('fixtures/index.js', () => {
  // ==========================
  // Recursive helper function.
  // ==========================

  const compareMockToReal = (mock = {}, real = {}) => {
    const mockKeys = Object.keys(mock).sort();
    const realKeys = Object.keys(real).sort();

    // Test count.
    expect(mockKeys).toEqual(realKeys);

    // Loop through.
    mockKeys.forEach((key = '') => {
      const mockItem = mock[key];
      const realItem = real[key];

      const mockType = typeof mockItem;
      const realType = typeof realItem;

      const mockItemIsArray = Array.isArray(mockItem);
      const realItemIsArray = Array.isArray(realItem);

      // Test types.
      expect(mockType).toBe(realType);
      expect(mockItemIsArray).toBe(realItemIsArray);

      // Drill into objects?
      if (mockType && mockType === 'object' && !mockItemIsArray) {
        compareMockToReal(mockItem, realItem);
      }
    });
  };

  // =================
  // Test for actions.
  // =================

  test('mocks complete app actions', () => {
    const mock = getMockAppActions();
    const real = createAppActions();

    compareMockToReal(mock, real);
  });

  // ===============
  // Test for state.
  // ===============

  test('mocks complete app state', () => {
    const mock = getMockAppState();
    const real = getDefaultAppState();

    compareMockToReal(mock, real);
  });
});
