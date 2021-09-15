/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

interface Props {
    text: string;
    count: number;
    className: string;
    onClick: () => void;
}

const MenuItem: React.FC<Props> = (props) => (
    <li className={props.className} onClick={props.onClick}>
        <a>
            {props.text} &nbsp;
            <span className="tag is-dark is-rounded is-small">
                {props.count}
            </span>
        </a>
    </li>
);

export default MenuItem;
