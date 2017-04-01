const { describe, it } = global;
import { expect } from 'chai';
import { mapper } from '../left_panel';

describe('manager.ui.containers.left_panel', () => {
  describe('mapper', () => {
    it('should give correct data', () => {
      const stories = [{ kind: 'sk', stories: ['dd'] }];
      const selectedKind = 'sk';
      const selectedStory = 'dd';
      const uiOptions = {
        name: 'foo',
        url: 'bar'
      };

      const selectStory = () => 'selectStory';
      const toggleShortcutsHelp = () => 'toggleShortcutsHelp';
      const setStoryFilter = () => 'setStoryFilter';

      const props = {};
      const env = {
        actions: () => ({
          api: {
            selectStory
          },
          ui: {
            toggleShortcutsHelp,
            setStoryFilter
          }
        })
      };

      const state = {
        storyFilter: null,
        stories,
        selectedKind,
        selectedStory,
        uiOptions
      };

      const data = mapper(state, props, env);
      expect(data.stories).to.deep.equal(stories);
      expect(data.selectedKind).to.be.equal(selectedKind);
      expect(data.selectedStory).to.be.equal(selectedStory);
      expect(data.storyFilter).to.be.equal(null);

      expect(data.onSelectStory).to.be.equal(selectStory);
      expect(data.onStoryFilter).to.be.equal(setStoryFilter);
      expect(data.openShortcutsHelp).to.be.equal(toggleShortcutsHelp);
    });

    it('should filter stories according to the given filter', () => {
      const stories = [
        { kind: 'pk', stories: ['dd'] },
        { kind: 'ss', stories: ['dd'] },
        { kind: 'pkr', stories: ['dd'] }
      ];
      const selectedKind = 'pk';
      const selectedStory = 'dd';
      const uiOptions = {
        name: 'foo',
        url: 'bar'
      };

      const selectStory = () => 'selectStory';
      const toggleShortcutsHelp = () => 'toggleShortcutsHelp';
      const setStoryFilter = () => 'setStoryFilter';

      const props = {};
      const env = {
        actions: () => ({
          api: {
            selectStory
          },
          ui: {
            toggleShortcutsHelp,
            setStoryFilter
          }
        })
      };

      const state = {
        storyFilter: 'ss',
        stories,
        selectedKind,
        selectedStory,
        uiOptions
      };

      const data = mapper(state, props, env);
      expect(data.stories).to.deep.equal([
        stories[0], // selected kind is always there. That's why this is here.
        stories[1]
      ]);
    });

    it('should filter and sort stories according to the given filter', () => {
      const stories = [
        { kind: 'ss', stories: ['dd'] },
        { kind: 'pk', stories: ['dd'] },
        { kind: 'pkr', stories: ['dd'] }
      ];
      const selectedKind = 'pk';
      const selectedStory = 'dd';
      const uiOptions = {
        name: 'foo',
        url: 'bar',
        sortStoriesByKind: true
      };

      const selectStory = () => 'selectStory';
      const toggleShortcutsHelp = () => 'toggleShortcutsHelp';
      const setStoryFilter = () => 'setStoryFilter';

      const props = {};
      const env = {
        actions: () => ({
          api: {
            selectStory
          },
          ui: {
            toggleShortcutsHelp,
            setStoryFilter
          }
        })
      };

      const state = {
        storyFilter: 'ss',
        stories,
        selectedKind,
        selectedStory,
        uiOptions
      };

      const data = mapper(state, props, env);
      expect(data.stories).to.deep.equal([
        stories[1], // selected kind is always there. That's why this is here.
        stories[0]
      ]);
    });
  });
});
