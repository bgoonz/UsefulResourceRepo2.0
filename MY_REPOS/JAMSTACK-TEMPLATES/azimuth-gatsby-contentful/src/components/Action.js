import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Link, safePrefix } from '../utils';

export const query = graphql`
    fragment ActionFragment on ContentfulAction {
        label {
            label
        }
        url {
            url
        }
        primary
        new_window
    }
`;

export default class Action extends React.Component {
    render() {
        const { action, ...other } = this.props;
        const targetProps = _.get(action, 'new_window') ? { target: '_blank', rel: 'noopener' } : null;
        return (
            <Link to={safePrefix(_.get(action, 'url.url'))} {...targetProps} {...other}>
                {_.get(action, 'label.label')}
            </Link>
        );
    }
}
