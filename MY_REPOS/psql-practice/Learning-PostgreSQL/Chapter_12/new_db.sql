--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: car_portal_app; Type: SCHEMA; Schema: -; Owner: car_portal_app
--

CREATE SCHEMA car_portal_app;


ALTER SCHEMA car_portal_app OWNER TO car_portal_app;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = car_portal_app, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: a; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE a (
    a_int integer,
    a_text text
);


ALTER TABLE a OWNER TO car_portal_app;

--
-- Name: account; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE account (
    account_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    CONSTRAINT account_check CHECK (((first_name !~ '\s'::text) AND (last_name !~ '\s'::text))),
    CONSTRAINT account_email_check CHECK ((email ~* '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$'::text)),
    CONSTRAINT account_password_check CHECK ((char_length(password) >= 8))
);


ALTER TABLE account OWNER TO car_portal_app;

--
-- Name: account_account_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE account_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_account_id_seq OWNER TO car_portal_app;

--
-- Name: account_account_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE account_account_id_seq OWNED BY account.account_id;


--
-- Name: account_history; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE account_history (
    accounnt_history_id bigint NOT NULL,
    account_id integer NOT NULL,
    search_key text NOT NULL,
    search_date date NOT NULL
);


ALTER TABLE account_history OWNER TO car_portal_app;

--
-- Name: account_history_accounnt_history_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE account_history_accounnt_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_history_accounnt_history_id_seq OWNER TO car_portal_app;

--
-- Name: account_history_accounnt_history_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE account_history_accounnt_history_id_seq OWNED BY account_history.accounnt_history_id;


--
-- Name: advertisement; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE advertisement (
    advertisement_id integer NOT NULL,
    advertisement_date timestamp with time zone NOT NULL,
    car_id integer NOT NULL,
    seller_account_id integer NOT NULL
);


ALTER TABLE advertisement OWNER TO car_portal_app;

--
-- Name: advertisement_advertisement_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE advertisement_advertisement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE advertisement_advertisement_id_seq OWNER TO car_portal_app;

--
-- Name: advertisement_advertisement_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE advertisement_advertisement_id_seq OWNED BY advertisement.advertisement_id;


--
-- Name: advertisement_picture; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE advertisement_picture (
    advertisement_picture_id integer NOT NULL,
    advertisement_id integer,
    picture_location text
);


ALTER TABLE advertisement_picture OWNER TO car_portal_app;

--
-- Name: advertisement_picture_advertisement_picture_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE advertisement_picture_advertisement_picture_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE advertisement_picture_advertisement_picture_id_seq OWNER TO car_portal_app;

--
-- Name: advertisement_picture_advertisement_picture_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE advertisement_picture_advertisement_picture_id_seq OWNED BY advertisement_picture.advertisement_picture_id;


--
-- Name: advertisement_rating; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE advertisement_rating (
    advertisement_rating_id integer NOT NULL,
    advertisement_id integer NOT NULL,
    account_id integer NOT NULL,
    advertisement_rating_date date NOT NULL,
    rank integer NOT NULL,
    review text NOT NULL,
    CONSTRAINT advertisement_rating_rank_check CHECK ((rank = ANY (ARRAY[1, 2, 3, 4, 5]))),
    CONSTRAINT advertisement_rating_review_check CHECK ((char_length(review) <= 200))
);


ALTER TABLE advertisement_rating OWNER TO car_portal_app;

--
-- Name: advertisement_rating_advertisement_rating_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE advertisement_rating_advertisement_rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE advertisement_rating_advertisement_rating_id_seq OWNER TO car_portal_app;

--
-- Name: advertisement_rating_advertisement_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE advertisement_rating_advertisement_rating_id_seq OWNED BY advertisement_rating.advertisement_rating_id;


--
-- Name: b; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE b (
    b_int integer,
    b_text text
);


ALTER TABLE b OWNER TO car_portal_app;

--
-- Name: car; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE car (
    car_id integer NOT NULL,
    number_of_owners integer NOT NULL,
    registration_number text NOT NULL,
    manufacture_year integer NOT NULL,
    number_of_doors integer DEFAULT 5 NOT NULL,
    car_model_id integer,
    mileage integer NOT NULL,
    insert_date timestamp with time zone DEFAULT now()
);


ALTER TABLE car OWNER TO car_portal_app;

--
-- Name: car_car_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE car_car_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_car_id_seq OWNER TO car_portal_app;

--
-- Name: car_car_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE car_car_id_seq OWNED BY car.car_id;


--
-- Name: car_model; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE car_model (
    car_model_id integer NOT NULL,
    marke text NOT NULL,
    model text NOT NULL
);


ALTER TABLE car_model OWNER TO car_portal_app;

--
-- Name: car_model_car_model_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE car_model_car_model_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_model_car_model_id_seq OWNER TO car_portal_app;

--
-- Name: car_model_car_model_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE car_model_car_model_id_seq OWNED BY car_model.car_model_id;


--
-- Name: seller_account; Type: TABLE; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

CREATE TABLE seller_account (
    seller_acount_id integer NOT NULL,
    account_id integer NOT NULL,
    total_rank double precision,
    number_of_advertiement integer,
    street_name text NOT NULL,
    street_number text NOT NULL,
    zip_code text NOT NULL,
    city text NOT NULL
);


ALTER TABLE seller_account OWNER TO car_portal_app;

--
-- Name: seller_account_seller_acount_id_seq; Type: SEQUENCE; Schema: car_portal_app; Owner: car_portal_app
--

CREATE SEQUENCE seller_account_seller_acount_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seller_account_seller_acount_id_seq OWNER TO car_portal_app;

--
-- Name: seller_account_seller_acount_id_seq; Type: SEQUENCE OWNED BY; Schema: car_portal_app; Owner: car_portal_app
--

ALTER SEQUENCE seller_account_seller_acount_id_seq OWNED BY seller_account.seller_acount_id;


--
-- Name: account_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY account ALTER COLUMN account_id SET DEFAULT nextval('account_account_id_seq'::regclass);


--
-- Name: accounnt_history_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY account_history ALTER COLUMN accounnt_history_id SET DEFAULT nextval('account_history_accounnt_history_id_seq'::regclass);


--
-- Name: advertisement_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement ALTER COLUMN advertisement_id SET DEFAULT nextval('advertisement_advertisement_id_seq'::regclass);


--
-- Name: advertisement_picture_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement_picture ALTER COLUMN advertisement_picture_id SET DEFAULT nextval('advertisement_picture_advertisement_picture_id_seq'::regclass);


--
-- Name: advertisement_rating_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement_rating ALTER COLUMN advertisement_rating_id SET DEFAULT nextval('advertisement_rating_advertisement_rating_id_seq'::regclass);


--
-- Name: car_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY car ALTER COLUMN car_id SET DEFAULT nextval('car_car_id_seq'::regclass);


--
-- Name: car_model_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY car_model ALTER COLUMN car_model_id SET DEFAULT nextval('car_model_car_model_id_seq'::regclass);


--
-- Name: seller_acount_id; Type: DEFAULT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY seller_account ALTER COLUMN seller_acount_id SET DEFAULT nextval('seller_account_seller_acount_id_seq'::regclass);


--
-- Name: account_history_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY account_history
    ADD CONSTRAINT account_history_pkey PRIMARY KEY (accounnt_history_id);


--
-- Name: account_history_search_date_search_key_key; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY account_history
    ADD CONSTRAINT account_history_search_date_search_key_key UNIQUE (search_date, search_key);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- Name: advertisement_picture_picture_location_key; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY advertisement_picture
    ADD CONSTRAINT advertisement_picture_picture_location_key UNIQUE (picture_location);


--
-- Name: advertisement_picture_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY advertisement_picture
    ADD CONSTRAINT advertisement_picture_pkey PRIMARY KEY (advertisement_picture_id);


--
-- Name: advertisement_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY advertisement
    ADD CONSTRAINT advertisement_pkey PRIMARY KEY (advertisement_id);


--
-- Name: advertisement_rating_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY advertisement_rating
    ADD CONSTRAINT advertisement_rating_pkey PRIMARY KEY (advertisement_rating_id);


--
-- Name: car_model_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY car_model
    ADD CONSTRAINT car_model_pkey PRIMARY KEY (car_model_id);


--
-- Name: car_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY car
    ADD CONSTRAINT car_pkey PRIMARY KEY (car_id);


--
-- Name: car_registration_number_key; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY car
    ADD CONSTRAINT car_registration_number_key UNIQUE (registration_number);


--
-- Name: seller_account_pkey; Type: CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app; Tablespace: 
--

ALTER TABLE ONLY seller_account
    ADD CONSTRAINT seller_account_pkey PRIMARY KEY (seller_acount_id);


--
-- Name: account_history_account_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY account_history
    ADD CONSTRAINT account_history_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- Name: advertisement_car_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement
    ADD CONSTRAINT advertisement_car_id_fkey FOREIGN KEY (car_id) REFERENCES car(car_id);


--
-- Name: advertisement_picture_advertisement_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement_picture
    ADD CONSTRAINT advertisement_picture_advertisement_id_fkey FOREIGN KEY (advertisement_id) REFERENCES advertisement(advertisement_id);


--
-- Name: advertisement_rating_account_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement_rating
    ADD CONSTRAINT advertisement_rating_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- Name: advertisement_rating_advertisement_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement_rating
    ADD CONSTRAINT advertisement_rating_advertisement_id_fkey FOREIGN KEY (advertisement_id) REFERENCES advertisement(advertisement_id);


--
-- Name: advertisement_seller_account_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY advertisement
    ADD CONSTRAINT advertisement_seller_account_id_fkey FOREIGN KEY (seller_account_id) REFERENCES seller_account(seller_acount_id);


--
-- Name: car_car_model_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY car
    ADD CONSTRAINT car_car_model_id_fkey FOREIGN KEY (car_model_id) REFERENCES car_model(car_model_id);


--
-- Name: seller_account_account_id_fkey; Type: FK CONSTRAINT; Schema: car_portal_app; Owner: car_portal_app
--

ALTER TABLE ONLY seller_account
    ADD CONSTRAINT seller_account_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

