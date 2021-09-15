import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export const query = graphql`
    fragment SectionPricingFragment on ContentfulSectionPricing {
        sys {
            contentType {
                sys {
                    id
                }
            }
        }
        section_id {
            section_id
        }
        title {
            title
        }
        subtitle {
            subtitle
        }
        bg
        pricingplans {
            title {
                title
            }
            price {
                price
            }
            details {
                details
            }
            highlight
            actions {
                ...ActionFragment
            }
        }
    }
`;

export default class SectionPricing extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        return (
            <section
                id={_.get(section, 'section_id.section_id')}
                className={'block pricing-block bg-' + _.get(section, 'bg') + ' outer'}
            >
                <div className="block-header inner-small">
                    {_.get(section, 'title.title') && <h2 className="block-title">{_.get(section, 'title.title')}</h2>}
                    {_.get(section, 'subtitle.subtitle') && (
                        <p className="block-subtitle">{_.get(section, 'subtitle.subtitle')}</p>
                    )}
                </div>
                {_.get(section, 'pricingplans') && (
                    <div className="inner">
                        <div className="grid">
                            {_.map(_.get(section, 'pricingplans'), (pricingPlan, pricingPlanIdx) => (
                                <div
                                    key={pricingPlanIdx}
                                    className={'cell plan' + (_.get(pricingPlan, 'highlight') ? ' highlight' : '')}
                                >
                                    <div className="plan-inside">
                                        <h3 className="plan-name">{_.get(pricingPlan, 'title.title')}</h3>
                                        {_.get(pricingPlan, 'price') && (
                                            <div className="plan-price">{_.get(pricingPlan, 'price.price')}</div>
                                        )}
                                        <div className="plan-details">
                                            {markdownify(_.get(pricingPlan, 'details.details'))}
                                        </div>
                                        <CtaButtons actions={_.get(pricingPlan, 'actions')} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        );
    }
}
