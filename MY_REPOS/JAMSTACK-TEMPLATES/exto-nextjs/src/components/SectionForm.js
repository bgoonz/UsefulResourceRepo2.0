import React from 'react';
import _ from 'lodash';

import { htmlToReact, markdownify } from '../utils';
import FormField from './FormField';

export default class SectionForm extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const content = _.get(section, 'content');
        const formId = _.get(section, 'form_id');
        const formAction = _.get(section, 'form_action');
        const formFields = _.get(section, 'form_fields');
        const submitLabel = _.get(section, 'submit_label');
        const formHoneypotInputId = formId + '-honeypot';
        const formHoneypotLabelId = formId + '-honeypot-label';
        const formHoneypotName = formId + '-bot-field';

        return (
            <section id={sectionId} className="block block-form outer">
                <div className="inner">
                    {(title || subtitle) && (
                        <div className="block-header inner-sm">
                            {title && <h2 className="block-title line-top">{title}</h2>}
                            {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                        </div>
                    )}
                    <div className="block-content inner-sm">
                        {content && markdownify(content)}
                        <form
                            name={formId}
                            id={formId}
                            {...(formAction ? { action: formAction } : null)}
                            method="POST"
                            data-netlify="true"
                            data-netlify-honeypot={formHoneypotName}
                        >
                            <div className="screen-reader-text">
                                <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>
                                    Don't fill this out if you're human:
                                    <input aria-labelledby={formHoneypotLabelId} id={formHoneypotInputId} name={formHoneypotName} />
                                </label>
                            </div>
                            <input type="hidden" name="form-name" value={formId} />
                            {_.map(formFields, (field, index) => (
                                <FormField key={index} {...this.props} field={field} />
                            ))}
                            <div className="form-submit">
                                <button type="submit" className="button">
                                    {submitLabel}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}
