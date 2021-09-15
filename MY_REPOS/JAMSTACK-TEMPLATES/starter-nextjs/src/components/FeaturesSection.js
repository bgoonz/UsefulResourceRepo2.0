import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix, markdownify } from '../utils';
import SectionActions from './SectionActions';

export default class FeaturesSection extends React.Component {
    renderFeature(feature, index, sectionTitle) {
        const align = _.get(feature, 'align', 'left');
        const image = _.get(feature, 'image');
        const imageAlt = _.get(feature, 'image_alt', '');
        const imagePosition = _.get(feature, 'image_position', 'left');
        const title = _.get(feature, 'title');
        const content = _.get(feature, 'content');
        const actions = _.get(feature, 'actions');

        return (
            <div
                key={index}
                className={classNames('flex', 'flex--middle', 'flex--center', 'flex--col-2', {
                    'align-center': align === 'center',
                    'align-right': align === 'right'
                })}
            >
                {image && (
                    <div
                        className={classNames('cell', 'section__media', {
                            'section__media--right': imagePosition === 'right'
                        })}
                    >
                        <img src={withPrefix(image)} alt={imageAlt} />
                    </div>
                )}
                <div className="section__body cell">
                    {title && (sectionTitle ? <h3 className="section__title">{title}</h3> : <h2 className="section__title">{title}</h2>)}
                    {content && <div className="section__copy">{markdownify(content)}</div>}
                    {!_.isEmpty(actions) && (
                        <div className="section__actions btn-group">
                            <SectionActions actions={actions} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        const features = _.get(section, 'features');

        return (
            <section className="section section--features">
                {title && (
                    <div className="container container--md align-center">
                        <h2 className="section__title">{title}</h2>
                    </div>
                )}
                {!_.isEmpty(features) && (
                    <div className="container container--lg">{_.map(features, (feature, index) => this.renderFeature(feature, index, title))}</div>
                )}
            </section>
        );
    }
}
