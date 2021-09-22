/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React, {createContext, useCallback, useContext} from 'react';
import {Badge, Tooltip, Typography, Button} from 'antd';
import styled from '@emotion/styled';
import {keyframes} from '@emotion/css';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {SandyPluginContext} from '../plugin/PluginContext';
import {createState, useValue} from '../state/atom';
import {SandyDevicePluginInstance} from '../plugin/DevicePlugin';
import {Layout} from './Layout';
import {BulbTwoTone} from '@ant-design/icons';
import {createHash} from 'crypto';
import type {TooltipPlacement} from 'antd/lib/tooltip';
import {SandyPluginInstance} from '../plugin/Plugin';
import {theme} from './theme';
import {Tracked} from './Tracked';

const {Text} = Typography;

type NuxManager = ReturnType<typeof createNuxManager>;

const storageKey = `FLIPPER_NUX_STATE`;

export function getNuxKey(
  elem: React.ReactNode,
  currentPlugin?: SandyPluginInstance | SandyDevicePluginInstance,
) {
  return `${currentPlugin?.definition.id ?? 'flipper'}:${createHash('sha256')
    .update(reactElementToJSXString(elem))
    .digest('base64')}`;
}

export function createNuxManager() {
  const ticker = createState(0);

  let readMap: Record<string, boolean> = JSON.parse(
    window.localStorage.getItem(storageKey) || '{}',
  );

  function save() {
    // trigger all Nux Elements to re-compute state
    ticker.set(ticker.get() + 1);
    window.localStorage.setItem(storageKey, JSON.stringify(readMap, null, 2));
  }

  return {
    markRead(
      elem: React.ReactNode,
      currentPlugin?: SandyPluginInstance | SandyDevicePluginInstance,
    ): void {
      readMap[getNuxKey(elem, currentPlugin)] = true;
      save();
    },
    isRead(
      elem: React.ReactNode,
      currentPlugin?: SandyPluginInstance | SandyDevicePluginInstance,
    ): boolean {
      return !!readMap[getNuxKey(elem, currentPlugin)];
    },
    resetHints(): void {
      readMap = {};
      save();
    },
    ticker,
  };
}

const stubManager: NuxManager = {
  markRead() {},
  isRead() {
    return true;
  },
  resetHints() {},
  ticker: createState(0),
};

export const NuxManagerContext = createContext<NuxManager>(stubManager);

/**
 * Creates a New-User-eXperience element; a lightbulb that will show the user new features
 */
export function NUX({
  children,
  title,
  placement,
}: {
  children: React.ReactNode;
  title: string;
  placement?: TooltipPlacement;
}) {
  const manager = useContext(NuxManagerContext);
  const pluginInstance = useContext(SandyPluginContext);
  // changing the ticker will force `isRead` to be recomputed
  const _tick = useValue(manager.ticker);
  const isRead = manager.isRead(title, pluginInstance);
  const dismiss = useCallback(() => {
    manager.markRead(title, pluginInstance);
  }, [title, manager, pluginInstance]);

  return (
    <UnanimatedBadge
      count={
        isRead ? (
          0
        ) : (
          <Tooltip
            placement={placement}
            color={theme.backgroundWash}
            title={
              <Layout.Container
                center
                gap
                pad
                style={{color: theme.textColorPrimary}}>
                <BulbTwoTone style={{fontSize: 24}} />
                <Text>{title}</Text>
                <Tracked action={'nux:dismiss:' + title.substr(0, 50)}>
                  <Button size="small" type="default" onClick={dismiss}>
                    Dismiss
                  </Button>
                </Tracked>
              </Layout.Container>
            }>
            <Pulse />
          </Tooltip>
        )
      }>
      {children}
    </UnanimatedBadge>
  );
}

// We force visibility of the badge to invisible if count has dropped,
// otherwise ANT will await animation end, which looks really awkard, see D24918536
const UnanimatedBadge = styled(Badge)(({count}) => ({
  '.ant-scroll-number-custom-component': {
    visibility: count === 0 ? 'hidden' : undefined,
  },
}));

const pulse = keyframes({
  '0%': {
    opacity: 0.2,
  },
  '100%': {
    opacity: 1,
  },
});

const Pulse = styled.div({
  cursor: 'pointer',
  background: theme.warningColor,
  animation: `${pulse} 2s infinite alternate`,
  borderRadius: 20,
  height: 12,
  width: 12,
  ':hover': {
    opacity: `1 !important`,
    background: theme.errorColor,
    animationPlayState: 'paused',
  },
});
