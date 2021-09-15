import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { getPageUrl, Link, withPrefix } from '../utils';

export default class Portfolio extends React.Component {
    renderProject(project, index) {
        const title = _.get(project, 'title');
        const thumbImage = _.get(project, 'thumb_image');
        const thumbImageAlt = _.get(project, 'thumb_image_alt', '');
        const projectUrl = getPageUrl(project, { withPrefix: true });

        return (
            <article key={index} className="project">
                <Link href={projectUrl} className="project-link">
                    {thumbImage && (
                        <div className="project-thumbnail">
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </div>
                    )}
                    <header className="project-header">
                        <h2 className="project-title">{title}</h2>
                    </header>
                </Link>
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const layoutStyle = _.get(page, 'layout_style', 'mosaic');
        const projects = _.orderBy(_.get(this.props, 'projects', []), 'date', 'desc');

        return (
            <Layout page={page} config={config}>
                <div className="inner outer">
                    <header className="page-header inner-sm">
                        <h1 className="page-title line-top">{title}</h1>
                        {subtitle && <div className="page-subtitle">{subtitle}</div>}
                    </header>
                    <div className={`portfolio-feed layout-${layoutStyle}`}>{_.map(projects, (project, index) => this.renderProject(project, index))}</div>
                </div>
            </Layout>
        );
    }
}
