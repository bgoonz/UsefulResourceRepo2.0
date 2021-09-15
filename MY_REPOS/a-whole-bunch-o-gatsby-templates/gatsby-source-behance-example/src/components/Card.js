import React from 'react';
import { FaThumbsUp, FaEye, FaComment } from 'react-icons/fa';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import css from './Card.module.css';

const Card = props => (
  <div className="col card">
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className={css.wrapper}
      style={{ backgroundImage: `url(${props.cover})` }}
    >
      <div className={css.header}>
        <div className={css.date}>
          <Date date={props.date} />
        </div>
        <div className={css.stats}>
          <div className={css.views}>
            <FaEye />
            <span>{props.views}</span>
          </div>
          <div className={css.appreciations}>
            <FaThumbsUp />
            <span>{props.appreciations}</span>
          </div>
          <div className={css.comments}>
            <FaComment />
            <span>{props.comments}</span>
          </div>
        </div>
      </div>
      <div className={css.data}>
        <div className={css.content}>
          <span className={css.areas}>
            {props.areas.map(area => (
              <span key={area} className={css.areasItem}>
                {area}
              </span>
            ))}
          </span>
          <h2>{props.name}</h2>
        </div>
      </div>
    </a>
  </div>
);

export default Card;

const Date = ({ date }) => {
  const parsed = parse(date * 1000).toString();
  const formatted = format(parsed, 'DD.MM.YYYY');

  return <span>{formatted}</span>;
};
