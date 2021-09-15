// @flow
import * as React from 'react';

type I18nProviderState = {
  language: string,
};

type I18nProviderProps = {
  children: any,
  language: string,
};

export type I18nContextProps = {
  language: string,
  changeLanguage: (language: string) => void,
};

export const I18nContext = React.createContext();

class I18nProvider extends React.Component<I18nProviderProps, I18nProviderState> {
  state = {
    language: this.props.language,
  };
  render() {
    const value = {
      language: this.state.language,
      changeLanguage: language => this.setState({ language }),
    };
    return <I18nContext.Provider value={value}>{this.props.children}</I18nContext.Provider>;
  }
}

export default I18nProvider;
