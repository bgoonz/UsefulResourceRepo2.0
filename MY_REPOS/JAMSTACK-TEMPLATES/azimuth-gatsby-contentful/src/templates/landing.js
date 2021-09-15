import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import components, { Layout } from '../components/index';

export const query = graphql`
    query LandingQuery($contentfulId: String!) {
        contentfulConfig {
            ...LayoutFragment
        }
        contentfulLanding(contentful_id: { eq: $contentfulId }) {
            sys {
                contentType {
                    sys {
                        id
                    }
                }
            }
            title {
                title
            }
            slug
            sections {
                ... on ContentfulSectionContact {
                    ...SectionContactFragment
                }
                ... on ContentfulSectionContent {
                    ...SectionContentFragment
                }
                ... on ContentfulSectionCta {
                    ...SectionCtaFragment
                }
                ... on ContentfulSectionFaq {
                    ...SectionFaqFragment
                }
                ... on ContentfulSectionFeatures {
                    ...SectionFeaturesFragment
                }
                ... on ContentfulSectionHero {
                    ...SectionHeroFragment
                }
                ... on ContentfulSectionPosts {
                    ...SectionPostsFragment
                }
                ... on ContentfulSectionPricing {
                    ...SectionPricingFragment
                }
                ... on ContentfulSectionReviews {
                    ...SectionReviewsFragment
                }
            }
        }
    }
`;

export default class Landing extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulLanding');
        return (
            <Layout page={page} config={config} path={this.props.path}>
                {_.map(_.get(page, 'sections'), (section, section_idx) => {
                    let component = _.upperFirst(_.camelCase(_.get(section, 'sys.contentType.sys.id')));
                    let Component = components[component];
                    return <Component key={section_idx} {...this.props} section={section} />;
                })}
            </Layout>
        );
    }
}
