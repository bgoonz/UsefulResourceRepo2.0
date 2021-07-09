import React from 'react';
import './Cards.scss';
import './Buttons';

export const LandingCard = ({
  title, description, link, icon, cta,
}) => (
  <div className="landing-card h-100">
    <div className="landing-card__top">
      <div className="landing-card__image">
        <img src={icon} alt="landing-card icon" />
      </div>
    </div>
    <div className="landing-card__content">
      <h3 className="landing-card__content-title">{title}</h3>
      <p className="landing-card__content-description">{description}</p>
      <a href={link} className="btn btn__primary">{cta}</a>
    </div>
  </div>
);

export const SmallCard = ({
  title, text, link, href,
}) => (
  <div className="row small-card justify-content-center">
    <div className="col-md-3 col-xs-12 col-lg-2 small-card__title">
      {title}
    </div>
    <div className="col-md-4 col-xs-12 small-card__text">
      {text}
      <a className="link-style" href={href}>{link}</a>
    </div>
  </div>
);

export const IconCard = ({
  items,
  title,
  description,
  icon,
  heading1,
  heading2,
  heading3,
  href1,
  href2,
  href3,
  link1,
  link2,
  link3,
}) => (
  <div className="row icon-card justify-content-center">

    <div className="col-xs-9 col-sm-5 col-md-4 col-lg-4 icon-card__left">
      {/* left image column */}
      <div className="row">
        <div className="col-3 col-sm-4 col-md-5 col-lg-3">
          <div className="icon-card__icon">
            <img src={icon} alt="icon" />
          </div>
        </div>
        {/* left text column */}
        <div className="col-9 col-sm-6 col-md-7 col-lg-9 icon-card__left-text">
          <div><p icon-card__item>{items}</p></div>
          <div><h4>{title}</h4></div>
          <div><p>{description}</p></div>
        </div>
      </div>

    </div>

    <div className="col-sm-5 col-md-3 icon-card__right">
      <div className="row">
        <div className="col-md-12 right-padding">
          <div className="row">
            <h6>{heading1}</h6>
          </div>
          <div className="row">
            <p><a className="link-style" href={href1}>{link1}</a></p>
          </div>
          <div className="row">
            <h6>{heading2}</h6>
          </div>
          <div className="row">
            <p><a className="link-style" href={href2}>{link2}</a></p>
          </div>
          <div className="row">
            <h6>{heading3}</h6>
          </div>
          <div className="row">
            <p><a className="link-style" href={href3}>{link3}</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const LabeledCard = ({
  link, label, title, description,
}) => (
  <a href={link} className="no-deco">
    <div className="labeled-card try-it-yourself-card">
      <div className="labeled-card-content">
        <label htmlFor="LabeledCard" className="labeled-card-content-label">{label}</label>
        <h3 className="labeled-card-content-title">{title}</h3>
        <p className="labeled-card-content-description">{description}</p>
      </div>
    </div>
  </a>
);

export const SecondaryCard = ({
  title,
  description,
  ctaLink,
  cta,
}) => (
  <div className="secondary-card secondary-card-content text-center h-100">
    <h4 className="secondary-card-content-title">{title}</h4>
    <p className="secondary-card-content-description">{description}</p>
    <a className="btn btn__secondary-light mb-0" href={ctaLink}>{cta}</a>
  </div>
);

export const TransparentCard = ({ icon, title, text }) => (
  <div className="transparent-card">
    <img src={icon} alt="icon" />
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

// this card has been removed from page, keeping code for future reference
export const QaCard = ({ title, content, cta }) => (
  <div className="qa-card">
    <a href={cta}>
      <h2>{title}</h2>
      <p>{content}</p>
    </a>
  </div>
);
