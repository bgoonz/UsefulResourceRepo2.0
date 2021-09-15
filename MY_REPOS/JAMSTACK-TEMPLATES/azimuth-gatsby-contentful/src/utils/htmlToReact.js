import React from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import ScriptTag from 'react-script-tag';
import _ from 'lodash';

export default function htmlToReact(html) {
    if (!html) {
        return null;
    }
    return ReactHtmlParser(html, {
        transform: (node, index) => {
            if (node.type === 'script') {
                if (!_.isEmpty(node.children)) {
                    return (
                        <ScriptTag key={index} {...node.attribs}>
                            {_.map(node.children, (childNode) => convertNodeToElement(childNode, index, _.noop()))}
                        </ScriptTag>
                    );
                } else {
                    return <ScriptTag key={index} {...node.attribs} />;
                }
            }
        }
    });
}
