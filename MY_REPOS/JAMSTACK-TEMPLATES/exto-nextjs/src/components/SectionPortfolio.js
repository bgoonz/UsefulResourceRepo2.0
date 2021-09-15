import React from 'react';
import _ from 'lodash';

import { getPageUrl, htmlToReact, Link, withPrefix } from '../utils';

export default class SectionPortfolio extends React.Component {
    renderProject(project, index, projectCount, viewAllLabel, viewAllUrl) {
        const title = _.get(project, 'title');
        const thumbImage = _.get(project, 'thumb_image');
        const thumbImageAlt = _.get(project, 'thumb_image_alt', '');
        const projectUrl = getPageUrl(project, { withPrefix: true });

        if (index === projectCount - 1 && viewAllLabel && viewAllUrl) {
            return (
                <article key={index} className="project">
                    <Link href={withPrefix(viewAllUrl)} className="project-link view-all-link">
                        {thumbImage && (
                            <div className="project-thumbnail">
                                <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                            </div>
                        )}
                        <span className="view-all-button">{viewAllLabel}</span>
                    </Link>
                </article>
            );
        } else {
            return (
                <article key={index} className="project">
                    <Link href={projectUrl} className="project-link">
                        {thumbImage && (
                            <div className="project-thumbnail">
                                <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                            </div>
                        )}
                        <header className="project-header">
                            <h3 className="project-title">{title}</h3>
                        </header>
                    </Link>
                </article>
            );
        }
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const layoutStyle = _.get(section, 'layout_style', 'mosaic');
        const viewAllLabel = _.get(section, 'view_all_label');
        const viewAllUrl = _.get(section, 'view_all_url');
        const projects = _.orderBy(_.get(this.props, 'projects', []), 'date', 'desc');
        const projectsNumber = _.get(section, 'projects_number', 6);
        const recentProjects = projects.slice(0, projectsNumber);
        const projectCount = _.size(recentProjects);

        return (
            <section id={sectionId} className="block-portfolio block outer">
                <div className="inner">
                    {(title || subtitle) && (
                        <div className="block-header inner-sm">
                            {title && <h2 className="block-title line-top">{title}</h2>}
                            {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                        </div>
                    )}
                    <div className="block-content">
                        <div className={`portfolio-feed layout-${layoutStyle}`}>
                            {_.map(recentProjects, (project, index) => this.renderProject(project, index, projectCount, viewAllLabel, viewAllUrl))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
