import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix } from '../utils';
import SectionActions from './SectionActions';

export default class HeroSection extends React.Component {
    renderBackgroundImage(background) {
        const backgroundImage = _.get(background, 'background_image');
        const backgroundOpacity = _.get(background, 'background_image_opacity', 100) * 0.01;
        const backgroundSize = _.get(background, 'background_image_size', 'cover');
        const backgroundRepeat = _.get(background, 'background_image_repeat', 'no-repeat');
        return (
            <div
                className="bg-image__image"
                style={{
                    backgroundImage: `url('${withPrefix(backgroundImage)}')`,
                    opacity: backgroundOpacity,
                    backgroundSize: backgroundSize,
                    backgroundRepeat: backgroundRepeat
                }}
            />
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const align = _.get(section, 'align', 'left');
        const image = _.get(section, 'image');
        const imageAlt = _.get(section, 'image_alt', '');
        const imagePosition = _.get(section, 'image_position', 'left');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const actions = _.get(section, 'actions');
        const hasBackground = _.get(section, 'has_background');
        const background = _.get(section, 'background');
        const backgroundColor = _.get(background, 'background_color', 'white');
        const backgroundImage = _.get(background, 'background_image');

        return (
            <section
                className={classNames('section', 'hero', {
                    'bg-image': hasBackground && backgroundImage,
                    'bg-gray': hasBackground && backgroundColor === 'gray',
                    'bg-blue': hasBackground && backgroundColor === 'blue',
                    inverse: hasBackground && backgroundColor === 'blue',
                    'section--padding': hasBackground && image
                })}
            >
                {hasBackground && backgroundImage && this.renderBackgroundImage(background)}
                <div className="container container--lg">
                    <div
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
                        <div className="cell section__body">
                            {title && <h1 className="section__title">{title}</h1>}
                            {subtitle && (
                                <div className="section__copy">
                                    <p>{subtitle}</p>
                                </div>
                            )}
                            {!_.isEmpty(actions) && (
                                <div className="section__actions btn-group">
                                    <SectionActions actions={actions} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
