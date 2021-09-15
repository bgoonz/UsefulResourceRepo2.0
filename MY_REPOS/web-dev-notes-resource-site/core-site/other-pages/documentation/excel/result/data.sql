--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: _sitedata; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._sitedata (
    sourcename character varying(23) DEFAULT NULL::character varying,
    path_1 character varying(6) DEFAULT NULL::character varying,
    path_2 character varying(50) DEFAULT NULL::character varying,
    path_3 character varying(74) DEFAULT NULL::character varying,
    path_4 character varying(82) DEFAULT NULL::character varying,
    path_5 character varying(63) DEFAULT NULL::character varying,
    path_6 character varying(100) DEFAULT NULL::character varying,
    urls numeric(4,1) DEFAULT NULL::numeric,
    address character varying(100) DEFAULT NULL::character varying,
    indexability character varying(13) DEFAULT NULL::character varying,
    indexability_status character varying(21) DEFAULT NULL::character varying,
    relnext_1 character varying(56) DEFAULT NULL::character varying,
    relprev_1 character varying(4) DEFAULT NULL::character varying,
    http_relnext_1 character varying(51) DEFAULT NULL::character varying,
    http_relprev_1 character varying(5) DEFAULT NULL::character varying,
    canonical_link_element_1 character varying(9) DEFAULT NULL::character varying,
    http_canonical character varying(3) DEFAULT NULL::character varying,
    meta_robots_1 character varying(8) DEFAULT NULL::character varying,
    xrobotstag_1 character varying(10) DEFAULT NULL::character varying
);


ALTER TABLE public._sitedata OWNER TO rebasedata;

--
-- Data for Name: _sitedata; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._sitedata (sourcename, path_1, path_2, path_3, path_4, path_5, path_6, urls, address, indexability, indexability_status, relnext_1, relprev_1, http_relnext_1, http_relprev_1, canonical_link_element_1, http_canonical, meta_robots_1, xrobotstag_1) FROM stdin;
analytics_all.xlsx	https/						83.0											
analytics_all.xlsx		bryan-lrlhj.ondigitalocean.app/					83.0											
analytics_all.xlsx			PUBLIC/				78.0											
analytics_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
analytics_all.xlsx				other-pages/			74.0											
analytics_all.xlsx					weeks/		62.0											
analytics_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
analytics_all.xlsx						week-24.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-15.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-23.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-16.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
analytics_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
analytics_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
analytics_all.xlsx						week-18.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-21.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-13.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-20.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-19.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
analytics_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
analytics_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
analytics_all.xlsx						week-17.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
analytics_all.xlsx						solution/	1.0											
analytics_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
analytics_all.xlsx						week-9/	21.0											
analytics_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
analytics_all.xlsx						week-22.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html	Non-Indexable	Client Error								
analytics_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
analytics_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
analytics_all.xlsx						week-14.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html	Non-Indexable	Client Error								
analytics_all.xlsx						images/	5.0											
analytics_all.xlsx						0-quiz/	5.0											
analytics_all.xlsx						week-10/	2.0											
analytics_all.xlsx						ajax.svg	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/ajax.svg	Non-Indexable	Client Error								
analytics_all.xlsx						week-8/	1.0											
analytics_all.xlsx						week-5connect-4index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html	Non-Indexable	Client Error								
analytics_all.xlsx						index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html	Non-Indexable	Client Error								
analytics_all.xlsx					blog-posts/		12.0											
analytics_all.xlsx						best-prac-extension-guide/	2.0											
analytics_all.xlsx						9-thigs-you-should-know-about/	2.0											
analytics_all.xlsx						blog/	7.0											
analytics_all.xlsx						0-projects/	1.0											
analytics_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
analytics_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
analytics_all.xlsx				upload/			1.0											
analytics_all.xlsx					course_01.pgj		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj	Non-Indexable	Client Error								
analytics_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
analytics_all.xlsx			other-pages/				1.0											
analytics_all.xlsx				blog-post			0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post	Non-Indexable	Client Error								
analytics_all.xlsx			Overflow/				1.0											
analytics_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
analytics_all.xlsx			drawio-master/				1.0											
analytics_all.xlsx				src/			1.0											
analytics_all.xlsx					main/		1.0											
analytics_all.xlsx						webapp/	1.0											
analytics_all.xlsx			cdn-cgi/				1.0											
analytics_all.xlsx				l/			1.0											
analytics_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
canonicals_all.xlsx	https/						57.0											
canonicals_all.xlsx		bryan-lrlhj.ondigitalocean.app/					57.0											
canonicals_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
canonicals_all.xlsx			PUBLIC/				53.0											
canonicals_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
canonicals_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
canonicals_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
canonicals_all.xlsx				other-pages/			50.0											
canonicals_all.xlsx					weeks/		41.0											
canonicals_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
canonicals_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
canonicals_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
canonicals_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
canonicals_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
canonicals_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
canonicals_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
canonicals_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
canonicals_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
canonicals_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
canonicals_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
canonicals_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
canonicals_all.xlsx						week-9/	21.0											
canonicals_all.xlsx							17.0											
canonicals_all.xlsx							1.0											
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/aa-times/index.ht	Indexable									
canonicals_all.xlsx							15.0											
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra	Indexable									
canonicals_all.xlsx							1.0											
canonicals_all.xlsx							3.0											
canonicals_all.xlsx							1.0											
canonicals_all.xlsx						0-quiz/	5.0											
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk11-quiz.html	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk6-quiz.html	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk7-quiz.html	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk10-quiz.html	Indexable									
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk5-quiz.html	Indexable									
canonicals_all.xlsx						week-10/	2.0											
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10/Database+Primer.html	Indexable									
canonicals_all.xlsx							1.0											
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10/cheat-sheet/official-sequeli	Indexable									
canonicals_all.xlsx						week-8/	1.0											
canonicals_all.xlsx					blog-posts/		9.0											
canonicals_all.xlsx						best-prac-extension-guide/	2.0											
canonicals_all.xlsx						9-thigs-you-should-know-about/	1.0											
external_all.xlsx						JavaScript/	1.0											
canonicals_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/9-thigs-you-should-know-about/W	Indexable									
canonicals_all.xlsx						blog/	5.0											
canonicals_all.xlsx						0-projects/	1.0											
canonicals_all.xlsx			Overflow/				1.0											
canonicals_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
canonicals_all.xlsx			drawio-master/				1.0											
canonicals_all.xlsx				src/			1.0											
canonicals_all.xlsx					main/		1.0											
canonicals_all.xlsx						webapp/	1.0											
canonicals_all.xlsx			cdn-cgi/				1.0											
canonicals_all.xlsx				l/			1.0											
canonicals_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex							"noindex	 nofollow"
external_all.xlsx	https/						286.0											
external_all.xlsx		www.pinterest.com/					1.0											
external_all.xlsx			bryanguner				0.0	https://www.pinterest.com/bryanguner										
external_all.xlsx		fonts.googleapis.com/					2.0											
external_all.xlsx			"css?family=Roboto:300	400	400i	500	700.0	900"				0	"https://fonts.googleapis.com/css?family=Roboto:300	400	400i	500	700	900"
external_all.xlsx			"css?family=Droid+Serif:400	400i	700	700i"	0.0			0	"https://fonts.googleapis.com/css?family=Droid+Serif:400	400i	700	700i"				
external_all.xlsx		www.linkedin.com/					1.0											
external_all.xlsx			in/				1.0											
external_all.xlsx				bryan-guner-046199128/			1.0	https://www.linkedin.com/in/bryan-guner-046199128/										
external_all.xlsx		ajax.googleapis.com/					1.0											
external_all.xlsx			ajax/				1.0											
external_all.xlsx				libs/			1.0											
external_all.xlsx					jquery/		1.0											
external_all.xlsx						1.11.2/	1.0											
external_all.xlsx		www.dropbox.com/					1.0											
external_all.xlsx			static/				1.0											
external_all.xlsx				api/			1.0											
external_all.xlsx					2/		1.0											
external_all.xlsx						dropins.js	0.0	https://www.dropbox.com/static/api/2/dropins.js										
external_all.xlsx		drive.google.com/					1.0											
external_all.xlsx			embeddedfolderview?id=1EfCng5gOQnftOM-4VESCBLbY4JgT2RVm				0.0	https://drive.google.com/embeddedfolderview?id=1EfCng5gOQnftOM-4VESCBLbY4JgT2RVm										
external_all.xlsx		mail.google.com/					1.0											
external_all.xlsx			mail/				1.0											
external_all.xlsx				u/			1.0											
external_all.xlsx					0/		1.0											
external_all.xlsx						h/	1.0	https://mail.google.com/mail/u/0/h/										
external_all.xlsx		www.youtube-nocookie.com/					1.0											
external_all.xlsx			embed/				1.0											
external_all.xlsx				LiouJsnYytI			0.0	https://www.youtube-nocookie.com/embed/LiouJsnYytI										
external_all.xlsx		node-postgres.com/					1.0											
external_all.xlsx			features/				1.0											
external_all.xlsx				queries			0.0	https://node-postgres.com/features/queries										
external_all.xlsx		quizlet.com/					9.0											
external_all.xlsx			535158481/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/535158481/match/embed?x=1jj1										
external_all.xlsx			519020363/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/519020363/match/embed?x=1jj1										
external_all.xlsx			523948576/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/523948576/match/embed?x=1jj1										
external_all.xlsx			529967382/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/529967382/match/embed?x=1jj1										
external_all.xlsx			526773066/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/526773066/match/embed?x=1jj1										
external_all.xlsx			519738486/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/519738486/match/embed?x=1jj1										
external_all.xlsx			532646422/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/532646422/match/embed?x=1jj1										
external_all.xlsx			521578337/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/521578337/match/embed?x=1jj1										
external_all.xlsx			522292469/				1.0											
external_all.xlsx				match/			1.0											
external_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/522292469/match/embed?x=1jj1										
external_all.xlsx		danielmiessler.com/					1.0											
external_all.xlsx			images/				1.0											
external_all.xlsx				big-o-chart-tutorial-bazar-aymptotic-notations-1.png			0.0	https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png										
external_all.xlsx		developer.mozilla.org/					8.0											
external_all.xlsx			en-US/				8.0											
external_all.xlsx				docs/			8.0											
external_all.xlsx					Web/		8.0											
external_all.xlsx						CSS/	4.0											
external_all.xlsx						CSS	0.0	https://developer.mozilla.org/en-US/docs/Web/CSS										
external_all.xlsx						HTML/	2.0											
external_all.xlsx		github.com/					7.0											
external_all.xlsx			bgoonz				0.0	https://github.com/bgoonz										
external_all.xlsx			appacademy-starters/				4.0											
external_all.xlsx				sql-orm-recipe-box			0.0	https://github.com/appacademy-starters/sql-orm-recipe-box										
external_all.xlsx				sql-database-management-starter			0.0	https://github.com/appacademy-starters/sql-database-management-starter										
external_all.xlsx				sql-select-exercises-starter			0.0	https://github.com/appacademy-starters/sql-select-exercises-starter										
external_all.xlsx				sql-recipe-box			0.0	https://github.com/appacademy-starters/sql-recipe-box										
external_all.xlsx			Paxa/				2.0											
external_all.xlsx				postbird/			2.0											
external_all.xlsx					releases		0.0	https://github.com/Paxa/postbird/releases										
external_all.xlsx					issues/		1.0											
external_all.xlsx						16	0.0	https://github.com/Paxa/postbird/issues/16										
external_all.xlsx		use.fontawesome.com/					1.0											
external_all.xlsx			releases/				1.0											
external_all.xlsx				v5.0.12/			1.0											
external_all.xlsx					css/		1.0											
external_all.xlsx						all.css	0.0	https://use.fontawesome.com/releases/v5.0.12/css/all.css										
external_all.xlsx		www.postgresqltutorial.com/					36.0											
external_all.xlsx			postgresql-recursive-view/				1.0	https://www.postgresqltutorial.com/postgresql-recursive-view/										
external_all.xlsx			postgresql-insert/				1.0	https://www.postgresqltutorial.com/postgresql-insert/										
external_all.xlsx			postgresql-drop-database/				1.0	https://www.postgresqltutorial.com/postgresql-drop-database/										
external_all.xlsx			postgresql-show-tables/				1.0	https://www.postgresqltutorial.com/postgresql-show-tables/										
external_all.xlsx			postgresql-show-databases/				1.0	https://www.postgresqltutorial.com/postgresql-show-databases/										
external_all.xlsx			managing-postgresql-views/				1.0	https://www.postgresqltutorial.com/managing-postgresql-views/										
external_all.xlsx			postgresql-roles/				1.0	https://www.postgresqltutorial.com/postgresql-roles/										
external_all.xlsx			postgresql-create-database/				1.0	https://www.postgresqltutorial.com/postgresql-create-database/										
external_all.xlsx			postgresql-drop-table/				1.0	https://www.postgresqltutorial.com/postgresql-drop-table/										
external_all.xlsx			postgresql-in/				1.0	https://www.postgresqltutorial.com/postgresql-in/										
external_all.xlsx			postgresql-rename-table/				1.0	https://www.postgresqltutorial.com/postgresql-rename-table/										
external_all.xlsx			postgresql-limit/				1.0	https://www.postgresqltutorial.com/postgresql-limit/										
external_all.xlsx			postgresql-natural-join/				1.0	https://www.postgresqltutorial.com/postgresql-natural-join/										
external_all.xlsx			postgresql-full-outer-join/				1.0	https://www.postgresqltutorial.com/postgresql-full-outer-join/										
external_all.xlsx			postgresql-materialized-views/				1.0	https://www.postgresqltutorial.com/postgresql-materialized-views/										
external_all.xlsx			postgresql-rename-column/				1.0	https://www.postgresqltutorial.com/postgresql-rename-column/										
external_all.xlsx			postgresql-left-join/				1.0	https://www.postgresqltutorial.com/postgresql-left-join/										
external_all.xlsx			postgresql-tutorial/				1.0											
external_all.xlsx				postgresql-except/			1.0	https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-except/										
external_all.xlsx			postgresql-add-column/				1.0	https://www.postgresqltutorial.com/postgresql-add-column/										
external_all.xlsx			postgresql-delete/				1.0	https://www.postgresqltutorial.com/postgresql-delete/										
external_all.xlsx			postgresql-between/				1.0	https://www.postgresqltutorial.com/postgresql-between/										
external_all.xlsx			postgresql-create-table/				1.0	https://www.postgresqltutorial.com/postgresql-create-table/										
external_all.xlsx			postgresql-temporary-table/				1.0	https://www.postgresqltutorial.com/postgresql-temporary-table/										
external_all.xlsx			postgresql-drop-column/				1.0	https://www.postgresqltutorial.com/postgresql-drop-column/										
external_all.xlsx			postgresql-alias/				1.0	https://www.postgresqltutorial.com/postgresql-alias/										
external_all.xlsx			postgresql-like/				1.0	https://www.postgresqltutorial.com/postgresql-like/										
external_all.xlsx			postgresql-views/				1.0	https://www.postgresqltutorial.com/postgresql-views/										
external_all.xlsx			postgresql-cross-join/				1.0	https://www.postgresqltutorial.com/postgresql-cross-join/										
external_all.xlsx			postgresql-having/				1.0	https://www.postgresqltutorial.com/postgresql-having/										
external_all.xlsx			postgresql-inner-join/				1.0	https://www.postgresqltutorial.com/postgresql-inner-join/										
external_all.xlsx			postgresql-update/				1.0	https://www.postgresqltutorial.com/postgresql-update/										
external_all.xlsx			postgresql-group-by/				1.0	https://www.postgresqltutorial.com/postgresql-group-by/										
external_all.xlsx			postgresql-round/				1.0	https://www.postgresqltutorial.com/postgresql-round/										
external_all.xlsx			postgresql-stored-procedures/				1.0	https://www.postgresqltutorial.com/postgresql-stored-procedures/										
external_all.xlsx			postgresql-primary-key/				1.0	https://www.postgresqltutorial.com/postgresql-primary-key/										
external_all.xlsx			postgresql-union/				1.0	https://www.postgresqltutorial.com/postgresql-union/										
external_all.xlsx		www.npmjs.com/					2.0											
external_all.xlsx			package/				2.0											
external_all.xlsx				sequelize-cli			0.0	https://www.npmjs.com/package/sequelize-cli										
external_all.xlsx				sequelize			0.0	https://www.npmjs.com/package/sequelize										
external_all.xlsx		gist.github.com/					1.0											
external_all.xlsx			Kartones/				1.0											
external_all.xlsx				dd3ff5ec5ea238d4c546			0.0	https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546										
external_all.xlsx		repl.it/					2.0											
external_all.xlsx			@bgoonz/				2.0											
external_all.xlsx				week-10-take-2?lite=true			0.0	https://repl.it/@bgoonz/week-10-take-2?lite=true										
external_all.xlsx				a-A-Student-Resources-Website-Prototype?lite=true			0.0	https://repl.it/@bgoonz/a-A-Student-Resources-Website-Prototype?lite=true										
external_all.xlsx		www.postgresql.org/					5.0	https://www.postgresql.org/										
external_all.xlsx			docs/				4.0											
external_all.xlsx				9.6/			2.0											
external_all.xlsx					sql-select.html		0.0	https://www.postgresql.org/docs/9.6/sql-select.html										
external_all.xlsx					datatype-numeric.html		0.0	https://www.postgresql.org/docs/9.6/datatype-numeric.html										
external_all.xlsx				current/			2.0											
external_all.xlsx					datatype.html		0.0	https://www.postgresql.org/docs/current/datatype.html										
external_all.xlsx					sql-createuser.html		0.0	https://www.postgresql.org/docs/current/sql-createuser.html										
external_all.xlsx		cdn.jsdelivr.net/					2.0											
external_all.xlsx			gh/				2.0											
external_all.xlsx				highlightjs/			2.0											
external_all.xlsx					cdn-release@10.4.0/		2.0											
external_all.xlsx						build/	2.0											
external_all.xlsx		sequelize.org/					10.0											
external_all.xlsx			master/				4.0											
external_all.xlsx				class/			2.0											
external_all.xlsx					lib/		2.0											
external_all.xlsx						query-interface.js~QueryInterface.html	0.0	https://sequelize.org/master/class/lib/query-interface.js~QueryInterface.html										
external_all.xlsx						model.js~Model.html	0.0	https://sequelize.org/master/class/lib/model.js~Model.html										
external_all.xlsx				manual/			2.0											
external_all.xlsx					hooks.html		0.0	https://sequelize.org/master/manual/hooks.html										
external_all.xlsx					validations-and-constraints.html		0.0	https://sequelize.org/master/manual/validations-and-constraints.html										
external_all.xlsx			v5/				6.0	https://sequelize.org/v5/										
external_all.xlsx				manual/			3.0											
external_all.xlsx					querying.html		0.0	https://sequelize.org/v5/manual/querying.html										
external_all.xlsx					models-definition.html		0.0	https://sequelize.org/v5/manual/models-definition.html										
external_all.xlsx					data-types.html		0.0	https://sequelize.org/v5/manual/data-types.html										
external_all.xlsx				class/			2.0											
external_all.xlsx					lib/		2.0											
external_all.xlsx						errors/	2.0											
external_all.xlsx		www.abeautifulsite.net/					1.0											
external_all.xlsx			what-are-favicons				0.0	https://www.abeautifulsite.net/what-are-favicons										
external_all.xlsx		sqlzoo.net/					1.0											
external_all.xlsx			wiki/				1.0											
external_all.xlsx				SELECT_Reference			0.0	https://sqlzoo.net/wiki/SELECT_Reference										
external_all.xlsx		brentmarquez.com/					1.0											
external_all.xlsx			wp-content/				1.0											
external_all.xlsx				uploads/			1.0											
external_all.xlsx					2018/		1.0											
external_all.xlsx						03/	1.0											
external_all.xlsx		www.producthunt.com/					1.0	https://www.producthunt.com/										
external_all.xlsx		miro.medium.com/					2.0											
external_all.xlsx			max/				2.0											
external_all.xlsx				1350/			1.0											
external_all.xlsx					1*EB8wVXdkvp7vlnd0iTWNZg.jpeg		0.0	https://miro.medium.com/max/1350/1*EB8wVXdkvp7vlnd0iTWNZg.jpeg										
external_all.xlsx				365/			1.0											
external_all.xlsx					1*Jr3NFSKTfQWRUyjblBSKeg.png		0.0	https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png										
external_all.xlsx		goo.gl/					1.0											
external_all.xlsx			maps/				1.0											
external_all.xlsx				SQ7cyCbGAQn5vxiH6			0.0	https://goo.gl/maps/SQ7cyCbGAQn5vxiH6										
external_all.xlsx		www.w3.org/					1.0											
external_all.xlsx			TR/				1.0											
external_all.xlsx				2007/			1.0											
external_all.xlsx					WD-html-design-principles-20071126/		1.0	https://www.w3.org/TR/2007/WD-html-design-principles-20071126/										
external_all.xlsx		en.wikipedia.org/					1.0											
external_all.xlsx			wiki/				1.0											
external_all.xlsx				Three-valued_logic			0.0	https://en.wikipedia.org/wiki/Three-valued_logic										
external_all.xlsx		fonts.google.com/					1.0	https://fonts.google.com/										
external_all.xlsx		www.essentialsql.com/					2.0											
external_all.xlsx			get-ready-to-learn-sql-server-20-using-subqueries-in-the-select-statement/				1.0	https://www.essentialsql.com/get-ready-to-learn-sql-server-20-using-subqueries-in-the-select-stateme										
external_all.xlsx			what-is-the-difference-between-a-join-and-subquery/				1.0	https://www.essentialsql.com/what-is-the-difference-between-a-join-and-subquery/										
external_all.xlsx		www.enterprisedb.com/					1.0											
external_all.xlsx			downloads/				1.0											
external_all.xlsx				postgres-postgresql-downloads			0.0	https://www.enterprisedb.com/downloads/postgres-postgresql-downloads										
external_all.xlsx		player.vimeo.com/					1.0											
external_all.xlsx			video/				1.0											
external_all.xlsx				380193367			0.0	https://player.vimeo.com/video/380193367										
external_all.xlsx		www.toptal.com/					1.0											
external_all.xlsx			designers/				1.0											
external_all.xlsx				web/			1.0											
external_all.xlsx					interview-questions		0.0	https://www.toptal.com/designers/web/interview-questions										
external_all.xlsx		appacademy-open-assets.s3-us-west-1.amazonaws.com/					1.0											
external_all.xlsx			Module-SQL/				1.0											
external_all.xlsx				assets/			1.0											
external_all.xlsx					spreadsheet-puppies-with-primary-key.png		0.0	https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-SQL/assets/spreadsheet-puppies-with										
external_all.xlsx		blog.designcrowd.com/					1.0											
external_all.xlsx			article/				1.0											
external_all.xlsx				867/			1.0											
external_all.xlsx					understanding-the-hierarchy-of-text		0.0	https://blog.designcrowd.com/article/867/understanding-the-hierarchy-of-text										
external_all.xlsx		mycdn.com/					1.0											
external_all.xlsx			prism@v1.x/				1.0											
external_all.xlsx				themes/			1.0											
external_all.xlsx					prism.css		0.0	https://mycdn.com/prism@v1.x/themes/prism.css										
external_all.xlsx		webaim.org/					1.0											
external_all.xlsx			resources/				1.0											
external_all.xlsx				contrastchecker/			1.0	https://webaim.org/resources/contrastchecker/										
external_all.xlsx		maps.googleapis.com/					1.0											
external_all.xlsx			maps/				1.0											
external_all.xlsx				api/			1.0											
external_all.xlsx					js?libraries=places&key=AIzaSyAkADq7R0xf6ami9YirAM1N-yl7hdnYBhM		0.0	https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAkADq7R0xf6ami9YirAM1N-yl7hdnYBhM										
external_all.xlsx		pugjs.org/					1.0	https://pugjs.org/										
external_all.xlsx		www.node-postgres.com/					1.0	https://www.node-postgres.com/										
external_all.xlsx		99designs.com/					1.0											
external_all.xlsx			blog/				1.0											
external_all.xlsx				tips/			1.0											
external_all.xlsx					the-7-step-guide-to-understanding-color-theory/		1.0	https://99designs.com/blog/tips/the-7-step-guide-to-understanding-color-theory/										
external_all.xlsx		www.expressjs.com/					1.0	https://www.expressjs.com/										
external_all.xlsx		emmet.io/					1.0											
external_all.xlsx			i/				1.0											
external_all.xlsx				logo-large.png			0.0	https://emmet.io/i/logo-large.png										
external_all.xlsx		res.cloudinary.com/					1.0											
external_all.xlsx			ddlt2cjne/				1.0											
external_all.xlsx				image/			1.0											
external_all.xlsx					upload/		1.0											
external_all.xlsx						v1514361209/	1.0											
external_all.xlsx		austin.craigslist.org/					94.0											
external_all.xlsx			d/				94.0											
external_all.xlsx				politics/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						pol	0.0	https://austin.craigslist.org/d/politics/search/pol										
external_all.xlsx				antiques/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ata	0.0	https://austin.craigslist.org/d/antiques/search/ata										
external_all.xlsx				events-classes/			26.0											
external_all.xlsx					search/		26.0											
external_all.xlsx						eee?sale_date=2019-11-12	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-12										
external_all.xlsx						eee?sale_date=2019-11-13	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-13										
external_all.xlsx						eee?sale_date=2019-11-14	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-14										
external_all.xlsx						eee?sale_date=2019-11-15	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-15										
external_all.xlsx						eee?sale_date=2019-11-16	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-16										
external_all.xlsx						eee?sale_date=2019-11-17	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-17										
external_all.xlsx						eee?sale_date=2019-11-01	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-01										
external_all.xlsx						eee?sale_date=2019-11-02	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-02										
external_all.xlsx						eee?sale_date=2019-11-03	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-03										
external_all.xlsx						eee?sale_date=2019-11-05	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-05										
external_all.xlsx						eee?sale_date=2019-11-04	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-04										
external_all.xlsx						eee?sale_date=2019-11-06	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-06										
external_all.xlsx						eee?sale_date=2019-11-07	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-07										
external_all.xlsx						eee?sale_date=2019-11-08	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-08										
external_all.xlsx						eee?sale_date=2019-11-09	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-09										
external_all.xlsx						eee	0.0	https://austin.craigslist.org/d/events-classes/search/eee										
external_all.xlsx						eee?sale_date=2019-11-10	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-10										
external_all.xlsx						eee?sale_date=2019-11-11	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-11										
external_all.xlsx						eee?sale_date=2019-10-31	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-31										
external_all.xlsx						eee?sale_date=2019-10-30	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-30										
external_all.xlsx						eee?sale_date=2019-10-28	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-28										
external_all.xlsx						eee?sale_date=2019-10-29	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-29										
external_all.xlsx						eee?sale_date=2019-10-27	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-27										
external_all.xlsx						eee?sale_date=2019-10-25	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-25										
external_all.xlsx						eee?sale_date=2019-10-26	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-26										
external_all.xlsx						eee?sale_date=2019-10-24	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-24										
external_all.xlsx				all-housing-wanted/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						hsw	0.0	https://austin.craigslist.org/d/all-housing-wanted/search/hsw										
external_all.xlsx				childcare/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						kid	0.0	https://austin.craigslist.org/d/childcare/search/kid										
external_all.xlsx				appliances/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ppa	0.0	https://austin.craigslist.org/d/appliances/search/ppa										
external_all.xlsx				events/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						eve	0.0	https://austin.craigslist.org/d/events/search/eve										
external_all.xlsx				barter/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bar	0.0	https://austin.craigslist.org/d/barter/search/bar										
external_all.xlsx				wanted%3A-room-share/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						sha	0.0	https://austin.craigslist.org/d/wanted%3A-room-share/search/sha										
external_all.xlsx				cell-phones/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						moa	0.0	https://austin.craigslist.org/d/cell-phones/search/moa										
external_all.xlsx				health-and-beauty/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						haa	0.0	https://austin.craigslist.org/d/health-and-beauty/search/haa										
external_all.xlsx				musicians/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						muc	0.0	https://austin.craigslist.org/d/musicians/search/muc										
external_all.xlsx				atvs%2C-utvs%2C-snowmobiles/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						sna	0.0	https://austin.craigslist.org/d/atvs%2C-utvs%2C-snowmobiles/search/sna										
external_all.xlsx				marine-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						mas	0.0	https://austin.craigslist.org/d/marine-services/search/mas										
external_all.xlsx				sublets-temporary/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						sub	0.0	https://austin.craigslist.org/d/sublets-temporary/search/sub										
external_all.xlsx				household-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						hss	0.0	https://austin.craigslist.org/d/household-services/search/hss										
external_all.xlsx				event-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						evs	0.0	https://austin.craigslist.org/d/event-services/search/evs										
external_all.xlsx				cycle-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						cys	0.0	https://austin.craigslist.org/d/cycle-services/search/cys										
external_all.xlsx				real-estate-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						rts	0.0	https://austin.craigslist.org/d/real-estate-services/search/rts										
external_all.xlsx				farm-garden-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						fgs	0.0	https://austin.craigslist.org/d/farm-garden-services/search/fgs										
external_all.xlsx				rants-raves/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						rnr	0.0	https://austin.craigslist.org/d/rants-raves/search/rnr										
external_all.xlsx				rooms-shares/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						roo	0.0	https://austin.craigslist.org/d/rooms-shares/search/roo										
external_all.xlsx				pet-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						pas	0.0	https://austin.craigslist.org/d/pet-services/search/pas										
external_all.xlsx				computer-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						cps	0.0	https://austin.craigslist.org/d/computer-services/search/cps										
external_all.xlsx				business/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bfa	0.0	https://austin.craigslist.org/d/business/search/bfa										
external_all.xlsx				bicycle-parts/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bip	0.0	https://austin.craigslist.org/d/bicycle-parts/search/bip										
external_all.xlsx				skilled-trade-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						sks	0.0	https://austin.craigslist.org/d/skilled-trade-services/search/sks										
external_all.xlsx				lessons-tutoring/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						lss	0.0	https://austin.craigslist.org/d/lessons-tutoring/search/lss										
external_all.xlsx				travel-vacation-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						trv	0.0	https://austin.craigslist.org/d/travel-vacation-services/search/trv										
external_all.xlsx				labor-hauling-moving/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						lbs	0.0	https://austin.craigslist.org/d/labor-hauling-moving/search/lbs										
external_all.xlsx				activity-partners/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						act	0.0	https://austin.craigslist.org/d/activity-partners/search/act										
external_all.xlsx				arts-crafts/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ara	0.0	https://austin.craigslist.org/d/arts-crafts/search/ara										
external_all.xlsx				artists/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ats	0.0	https://austin.craigslist.org/d/artists/search/ats										
external_all.xlsx				aviation/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ava	0.0	https://austin.craigslist.org/d/aviation/search/ava										
external_all.xlsx				parking-storage/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						prk	0.0	https://austin.craigslist.org/d/parking-storage/search/prk										
external_all.xlsx				for-sale/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						sss	0.0	https://austin.craigslist.org/d/for-sale/search/sss										
external_all.xlsx				classes/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						cls	0.0	https://austin.craigslist.org/d/classes/search/cls										
external_all.xlsx				volunteers/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						vol	0.0	https://austin.craigslist.org/d/volunteers/search/vol										
external_all.xlsx				creative-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						crs	0.0	https://austin.craigslist.org/d/creative-services/search/crs										
external_all.xlsx				groups/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						grp	0.0	https://austin.craigslist.org/d/groups/search/grp										
external_all.xlsx				cell-phone-mobile-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						cms	0.0	https://austin.craigslist.org/d/cell-phone-mobile-services/search/cms										
external_all.xlsx				auto-parts/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						pta	0.0	https://austin.craigslist.org/d/auto-parts/search/pta										
external_all.xlsx				boat-parts-accessories/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bpa	0.0	https://austin.craigslist.org/d/boat-parts-accessories/search/bpa										
external_all.xlsx				missed-connections/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						mis	0.0	https://austin.craigslist.org/d/missed-connections/search/mis										
external_all.xlsx				vacation-rentals/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						vac	0.0	https://austin.craigslist.org/d/vacation-rentals/search/vac										
external_all.xlsx				apts-housing-for-rent/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						apa	0.0	https://austin.craigslist.org/d/apts-housing-for-rent/search/apa										
external_all.xlsx				office-commercial/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						off	0.0	https://austin.craigslist.org/d/office-commercial/search/off										
external_all.xlsx				writing-editing-translation/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						wet	0.0	https://austin.craigslist.org/d/writing-editing-translation/search/wet										
external_all.xlsx				pets/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						pet	0.0	https://austin.craigslist.org/d/pets/search/pet										
external_all.xlsx				cars-trucks/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						cta	0.0	https://austin.craigslist.org/d/cars-trucks/search/cta										
external_all.xlsx				beauty-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bts	0.0	https://austin.craigslist.org/d/beauty-services/search/bts										
external_all.xlsx				local-news-and-views/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						vnn	0.0	https://austin.craigslist.org/d/local-news-and-views/search/vnn										
external_all.xlsx				community/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ccc	0.0	https://austin.craigslist.org/d/community/search/ccc										
external_all.xlsx				boats/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						boo	0.0	https://austin.craigslist.org/d/boats/search/boo										
external_all.xlsx				housing/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						hhh	0.0	https://austin.craigslist.org/d/housing/search/hhh										
external_all.xlsx				bicycles/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bia	0.0	https://austin.craigslist.org/d/bicycles/search/bia										
external_all.xlsx				automotive-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						aos	0.0	https://austin.craigslist.org/d/automotive-services/search/aos										
external_all.xlsx				books-magazines/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bka	0.0	https://austin.craigslist.org/d/books-magazines/search/bka										
external_all.xlsx				general-community/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						com	0.0	https://austin.craigslist.org/d/general-community/search/com										
external_all.xlsx				small-biz-ads/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						biz	0.0	https://austin.craigslist.org/d/small-biz-ads/search/biz										
external_all.xlsx				real-estate/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						rea	0.0	https://austin.craigslist.org/d/real-estate/search/rea										
external_all.xlsx				financial-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						fns	0.0	https://austin.craigslist.org/d/financial-services/search/fns										
external_all.xlsx				rideshare/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						rid	0.0	https://austin.craigslist.org/d/rideshare/search/rid										
external_all.xlsx				cds-dvds-vhs/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						ema	0.0	https://austin.craigslist.org/d/cds-dvds-vhs/search/ema										
external_all.xlsx				services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						bbb	0.0	https://austin.craigslist.org/d/services/search/bbb										
external_all.xlsx				legal-services/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						lgs	0.0	https://austin.craigslist.org/d/legal-services/search/lgs										
external_all.xlsx				lost-found/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						laf	0.0	https://austin.craigslist.org/d/lost-found/search/laf										
external_all.xlsx				housing-swap/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						swp	0.0	https://austin.craigslist.org/d/housing-swap/search/swp										
external_all.xlsx				baby-kid-stuff/			1.0											
external_all.xlsx					search/		1.0											
external_all.xlsx						baa	0.0	https://austin.craigslist.org/d/baby-kid-stuff/search/baa										
external_all.xlsx		codewithhugo.com/					1.0											
external_all.xlsx			using-es6-classes-for-sequelize-4-models/				1.0	https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/										
external_all.xlsx		forums.craigslist.org/					55.0											
external_all.xlsx			?areaID=15&forumID=575				0.0	https://forums.craigslist.org/?areaID=15&forumID=575										
external_all.xlsx			?areaID=15&forumID=2012				0.0	https://forums.craigslist.org/?areaID=15&forumID=2012										
external_all.xlsx			?areaID=15&forumID=3232				0.0	https://forums.craigslist.org/?areaID=15&forumID=3232										
external_all.xlsx			?areaID=15&forumID=5500				0.0	https://forums.craigslist.org/?areaID=15&forumID=5500										
external_all.xlsx			?areaID=15&forumID=1040				0.0	https://forums.craigslist.org/?areaID=15&forumID=1040										
external_all.xlsx			?areaID=15&forumID=2007				0.0	https://forums.craigslist.org/?areaID=15&forumID=2007										
external_all.xlsx			?areaID=15&forumID=130				0.0	https://forums.craigslist.org/?areaID=15&forumID=130										
external_all.xlsx			?areaID=15&forumID=122				0.0	https://forums.craigslist.org/?areaID=15&forumID=122										
external_all.xlsx			?areaID=15&forumID=99				0.0	https://forums.craigslist.org/?areaID=15&forumID=99										
external_all.xlsx			?areaID=15&forumID=98				0.0	https://forums.craigslist.org/?areaID=15&forumID=98										
external_all.xlsx			?areaID=15				0.0	https://forums.craigslist.org/?areaID=15										
external_all.xlsx			?areaID=15&forumID=1991				0.0	https://forums.craigslist.org/?areaID=15&forumID=1991										
external_all.xlsx			?areaID=15&forumID=64				0.0	https://forums.craigslist.org/?areaID=15&forumID=64										
external_all.xlsx			?areaID=15&forumID=73				0.0	https://forums.craigslist.org/?areaID=15&forumID=73										
external_all.xlsx			?areaID=15&forumID=1564				0.0	https://forums.craigslist.org/?areaID=15&forumID=1564										
external_all.xlsx			?areaID=15&forumID=71				0.0	https://forums.craigslist.org/?areaID=15&forumID=71										
external_all.xlsx			?areaID=15&forumID=59				0.0	https://forums.craigslist.org/?areaID=15&forumID=59										
external_all.xlsx			?areaID=15&forumID=53				0.0	https://forums.craigslist.org/?areaID=15&forumID=53										
external_all.xlsx			?areaID=15&forumID=54				0.0	https://forums.craigslist.org/?areaID=15&forumID=54										
external_all.xlsx			?areaID=15&forumID=88				0.0	https://forums.craigslist.org/?areaID=15&forumID=88										
external_all.xlsx			?areaID=15&forumID=95				0.0	https://forums.craigslist.org/?areaID=15&forumID=95										
external_all.xlsx			?areaID=15&forumID=96				0.0	https://forums.craigslist.org/?areaID=15&forumID=96										
external_all.xlsx			?areaID=15&forumID=93				0.0	https://forums.craigslist.org/?areaID=15&forumID=93										
external_all.xlsx			?areaID=15&forumID=79				0.0	https://forums.craigslist.org/?areaID=15&forumID=79										
external_all.xlsx			?areaID=15&forumID=78				0.0	https://forums.craigslist.org/?areaID=15&forumID=78										
external_all.xlsx			?areaID=15&forumID=76				0.0	https://forums.craigslist.org/?areaID=15&forumID=76										
external_all.xlsx			?areaID=15&forumID=85				0.0	https://forums.craigslist.org/?areaID=15&forumID=85										
external_all.xlsx			?areaID=15&forumID=2400				0.0	https://forums.craigslist.org/?areaID=15&forumID=2400										
external_all.xlsx			?areaID=15&forumID=81				0.0	https://forums.craigslist.org/?areaID=15&forumID=81										
external_all.xlsx			?areaID=15&forumID=28				0.0	https://forums.craigslist.org/?areaID=15&forumID=28										
Site-Crawl.xlsx							0.0											
external_all.xlsx			?areaID=15&forumID=29				0.0	https://forums.craigslist.org/?areaID=15&forumID=29										
external_all.xlsx			?areaID=15&forumID=5178				0.0	https://forums.craigslist.org/?areaID=15&forumID=5178										
external_all.xlsx			?areaID=15&forumID=26				0.0	https://forums.craigslist.org/?areaID=15&forumID=26										
external_all.xlsx			?areaID=15&forumID=27				0.0	https://forums.craigslist.org/?areaID=15&forumID=27										
external_all.xlsx			?areaID=15&forumID=24				0.0	https://forums.craigslist.org/?areaID=15&forumID=24										
external_all.xlsx			?areaID=15&forumID=22				0.0	https://forums.craigslist.org/?areaID=15&forumID=22										
external_all.xlsx			?areaID=15&forumID=20				0.0	https://forums.craigslist.org/?areaID=15&forumID=20										
external_all.xlsx			?areaID=15&forumID=1926				0.0	https://forums.craigslist.org/?areaID=15&forumID=1926										
external_all.xlsx			?areaID=15&forumID=7000				0.0	https://forums.craigslist.org/?areaID=15&forumID=7000										
external_all.xlsx			?areaID=15&forumID=5				0.0	https://forums.craigslist.org/?areaID=15&forumID=5										
external_all.xlsx			?areaID=15&forumID=4				0.0	https://forums.craigslist.org/?areaID=15&forumID=4										
external_all.xlsx			?areaID=15&forumID=16				0.0	https://forums.craigslist.org/?areaID=15&forumID=16										
external_all.xlsx			?areaID=15&forumID=9				0.0	https://forums.craigslist.org/?areaID=15&forumID=9										
external_all.xlsx			?areaID=15&forumID=8				0.0	https://forums.craigslist.org/?areaID=15&forumID=8										
external_all.xlsx			?areaID=15&forumID=12				0.0	https://forums.craigslist.org/?areaID=15&forumID=12										
external_all.xlsx			?areaID=15&forumID=7				0.0	https://forums.craigslist.org/?areaID=15&forumID=7										
external_all.xlsx			?areaID=15&forumID=6				0.0	https://forums.craigslist.org/?areaID=15&forumID=6										
external_all.xlsx			?areaID=15&forumID=1257				0.0	https://forums.craigslist.org/?areaID=15&forumID=1257										
external_all.xlsx			?areaID=15&forumID=49				0.0	https://forums.craigslist.org/?areaID=15&forumID=49										
external_all.xlsx			?areaID=15&forumID=47				0.0	https://forums.craigslist.org/?areaID=15&forumID=47										
external_all.xlsx			?areaID=15&forumID=42				0.0	https://forums.craigslist.org/?areaID=15&forumID=42										
external_all.xlsx			?areaID=15&forumID=39				0.0	https://forums.craigslist.org/?areaID=15&forumID=39										
external_all.xlsx			?areaID=15&forumID=34				0.0	https://forums.craigslist.org/?areaID=15&forumID=34										
external_all.xlsx			?areaID=15&forumID=32				0.0	https://forums.craigslist.org/?areaID=15&forumID=32										
external_all.xlsx			?areaID=15&forumID=41				0.0	https://forums.craigslist.org/?areaID=15&forumID=41										
external_all.xlsx		www.craigslist.org/					12.0											
external_all.xlsx			about/				12.0	https://www.craigslist.org/about/										
external_all.xlsx				terms.of.use.en-us			0.0	https://www.craigslist.org/about/terms.of.use.en-us										
external_all.xlsx				safety			0.0	https://www.craigslist.org/about/safety										
external_all.xlsx				privacy.policy			0.0	https://www.craigslist.org/about/privacy.policy										
external_all.xlsx				help/			2.0	https://www.craigslist.org/about/help/										
external_all.xlsx					system-status		0.0	https://www.craigslist.org/about/help/system-status										
external_all.xlsx				scams			0.0	https://www.craigslist.org/about/scams										
external_all.xlsx				cl_app_beta			0.0	https://www.craigslist.org/about/cl_app_beta										
external_all.xlsx				craigslist_is_hiring			0.0	https://www.craigslist.org/about/craigslist_is_hiring										
external_all.xlsx				open_source			0.0	https://www.craigslist.org/about/open_source										
external_all.xlsx				sites			0.0	https://www.craigslist.org/about/sites										
external_all.xlsx				best/			1.0											
external_all.xlsx					all/		1.0	https://www.craigslist.org/about/best/all/										
external_all.xlsx		code.jquery.com/					1.0											
external_all.xlsx			jquery-2.2.4.min.js				0.0	https://code.jquery.com/jquery-2.2.4.min.js										
external_all.xlsx		post.craigslist.org/					1.0											
external_all.xlsx			c/				1.0											
external_all.xlsx				aus			0.0	https://post.craigslist.org/c/aus										
external_all.xlsx		www.youtube.com/					1.0											
external_all.xlsx			user/				1.0											
external_all.xlsx				craigslist			0.0	https://www.youtube.com/user/craigslist										
external_all.xlsx		accounts.craigslist.org/					1.0											
external_all.xlsx			login/				1.0											
external_all.xlsx				home			0.0	https://accounts.craigslist.org/login/home										
external_all.xlsx	http/						49.0											
external_all.xlsx		www.amazon.com/					26.0											
external_all.xlsx			gp/				26.0											
external_all.xlsx				product/			26.0											
external_all.xlsx					1118008189/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1118008189&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/1118008189/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
external_all.xlsx					0131411551/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=013141	0.0	http://www.amazon.com/gp/product/0131411551/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0521675995/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=052167	0.0	http://www.amazon.com/gp/product/0521675995/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0672329468/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=067232	0.0	http://www.amazon.com/gp/product/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					1491949856/		1.0											
external_all.xlsx						book.html	0.0	http://mitpress.mit.edu/sicp/full-text/book/book.html										
external_all.xlsx						ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1491949856&linkCode=as2&tag=ucmbread-20&	0.0	http://www.amazon.com/gp/product/1491949856/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeA										
external_all.xlsx					0262631814/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=026263	0.0	http://www.amazon.com/gp/product/0262631814/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0262033844/		2.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=026203	0.0	http://www.amazon.com/gp/product/0262033844/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0262033844&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0262033844/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
external_all.xlsx					4871878309/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=487187	0.0	http://www.amazon.com/gp/product/4871878309/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0596514980/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=059651	0.0	http://www.amazon.com/gp/product/0596514980/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0961392142/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=096139	0.0	http://www.amazon.com/gp/product/0961392142/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0321751043/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=032175	0.0	http://www.amazon.com/gp/product/0321751043/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0201530821/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=020153	0.0	http://www.amazon.com/gp/product/0201530821/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0123744938/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=012374	0.0	http://www.amazon.com/gp/product/0123744938/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0981531644/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=098153	0.0	http://www.amazon.com/gp/product/0981531644/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0521545668/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=052154	0.0	http://www.amazon.com/gp/product/0521545668/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0201734842/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=020173	0.0	http://www.amazon.com/gp/product/0201734842/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					159327288X/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=159327	0.0	http://www.amazon.com/gp/product/159327288X/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					032157351X/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=032157351X&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/032157351X/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
external_all.xlsx					0596805527/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0596805527&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0596805527/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
external_all.xlsx					052156543X/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=052156	0.0	http://www.amazon.com/gp/product/052156543X/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0534950973/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=aboutmatthewm-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=0	0.0	http://www.amazon.com/gp/product/0534950973/ref=as_li_ss_tl?ie=UTF8&tag=aboutmatthewm-20&linkCode=as										
external_all.xlsx					0201657880/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0201657880&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0201657880/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
external_all.xlsx					0470474246/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=047047	0.0	http://www.amazon.com/gp/product/0470474246/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0201700735/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=020170	0.0	http://www.amazon.com/gp/product/0201700735/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
external_all.xlsx					0470068523/		1.0											
external_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0470068523&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0470068523/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
external_all.xlsx		www.twitter.com/					1.0											
external_all.xlsx			mattmight				0.0	http://www.twitter.com/mattmight										
external_all.xlsx		mitpress.mit.edu/					1.0											
external_all.xlsx			sicp/				1.0											
external_all.xlsx				full-text/			1.0											
external_all.xlsx					book/		1.0											
h1_all.xlsx				l/			1.0											
external_all.xlsx		www.postgresqltutorial.com/					3.0											
external_all.xlsx			postgresql-data-types/				1.0	http://www.postgresqltutorial.com/postgresql-data-types/										
external_all.xlsx			postgresql-boolean/				1.0	http://www.postgresqltutorial.com/postgresql-boolean/										
external_all.xlsx			postgresql-explain/				1.0	http://www.postgresqltutorial.com/postgresql-explain/										
external_all.xlsx		minikanren.org/					1.0	http://minikanren.org/										
external_all.xlsx		matt.might.net/					3.0											
external_all.xlsx			articles/				3.0											
external_all.xlsx				how-to-make-your-own-cat-5-ethernet-cable/			1.0	http://matt.might.net/articles/how-to-make-your-own-cat-5-ethernet-cable/										
external_all.xlsx				implementation-of-rsa-public-key-cryptography-algorithm-in-scheme-dialect-of-lisp/			1.0	http://matt.might.net/articles/implementation-of-rsa-public-key-cryptography-algorithm-in-scheme-dia										
external_all.xlsx				c++-template-meta-programming-with-lambda-calculus/			1.0	http://matt.might.net/articles/c++-template-meta-programming-with-lambda-calculus/										
external_all.xlsx		www.w3.org/					1.0											
external_all.xlsx			TR/				1.0											
external_all.xlsx				2007/			1.0											
external_all.xlsx					WD-html-design-principles-20071126/		1.0	http://www.w3.org/TR/2007/WD-html-design-principles-20071126/										
external_all.xlsx		placehold.it/					1.0											
external_all.xlsx			750x300				0.0	http://placehold.it/750x300										
external_all.xlsx		nand2tetris.org/					1.0	http://nand2tetris.org/										
external_all.xlsx		www.joelonsoftware.com/					1.0											
external_all.xlsx			articles/				1.0											
external_all.xlsx				Unicode.html			0.0	http://www.joelonsoftware.com/articles/Unicode.html										
external_all.xlsx		www.paulgraham.com/					1.0											
external_all.xlsx			web20.html				0.0	http://www.paulgraham.com/web20.html										
external_all.xlsx		www.wireshark.org/					1.0	http://www.wireshark.org/										
external_all.xlsx		lwn.net/					1.0											
external_all.xlsx			Articles/				1.0											
external_all.xlsx				250967/			1.0	http://lwn.net/Articles/250967/										
external_all.xlsx		www.learnprolognow.org/					1.0	http://www.learnprolognow.org/										
external_all.xlsx		www.ericsink.com/					1.0											
external_all.xlsx			vcbe/				1.0	http://www.ericsink.com/vcbe/										
external_all.xlsx		learnyouahaskell.com/					1.0	http://learnyouahaskell.com/										
external_all.xlsx		kti.ms.mff.cuni.cz/					1.0											
external_all.xlsx			~bartak/				1.0											
external_all.xlsx				prolog/			1.0											
external_all.xlsx					contents.html		0.0	http://kti.ms.mff.cuni.cz/~bartak/prolog/contents.html										
external_all.xlsx		www.craigslistjoe.com/					1.0	http://www.craigslistjoe.com/										
external_all.xlsx		craigconnects.org/					1.0	http://craigconnects.org/										
external_all.xlsx		blog.craigslist.org/					1.0	http://blog.craigslist.org/										
h1_all.xlsx	https/						52.0											
h1_all.xlsx		bryan-lrlhj.ondigitalocean.app/					52.0											
h1_all.xlsx			PUBLIC/				49.0											
h1_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
h1_all.xlsx				other-pages/			46.0											
h1_all.xlsx					weeks/		37.0											
h1_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
h1_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
h1_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
h1_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
h1_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
h1_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
h1_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
h1_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
h1_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
h1_all.xlsx						week-9/	18.0											
h1_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
h1_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
h1_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
h1_all.xlsx						0-quiz/	5.0											
h1_all.xlsx						week-10/	1.0											
h1_all.xlsx						week-8/	1.0											
h1_all.xlsx					blog-posts/		9.0											
h1_all.xlsx						best-prac-extension-guide/	2.0											
h1_all.xlsx						9-thigs-you-should-know-about/	1.0											
h1_all.xlsx						blog/	5.0											
h1_all.xlsx						0-projects/	1.0											
h1_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
h1_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
h1_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
h1_all.xlsx			drawio-master/				1.0											
h1_all.xlsx				src/			1.0											
h1_all.xlsx					main/		1.0											
h1_all.xlsx						webapp/	1.0											
h1_all.xlsx			cdn-cgi/				1.0											
h1_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
images_all.xlsx	https/						26.0											
images_all.xlsx		bryan-lrlhj.ondigitalocean.app/					19.0											
images_all.xlsx			PUBLIC/				19.0											
images_all.xlsx				other-pages/			14.0											
images_all.xlsx					blog-posts/		1.0											
images_all.xlsx						best-prac-extension-guide/	1.0											
images_all.xlsx					weeks/		13.0											
images_all.xlsx						Images/	8.0											
images_all.xlsx						week-9/	5.0											
images_all.xlsx				images/			3.0											
images_all.xlsx					loader.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/loader.gif	Indexable									
images_all.xlsx					fullstack.PNG		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/fullstack.PNG	Indexable									
images_all.xlsx					logo.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/logo.png	Indexable									
images_all.xlsx				upload/			2.0											
images_all.xlsx					best-prac-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/best-prac-250.gif	Indexable									
images_all.xlsx					matrix-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/matrix-250.gif	Indexable									
images_all.xlsx		danielmiessler.com/					1.0											
images_all.xlsx			images/				1.0											
images_all.xlsx				big-o-chart-tutorial-bazar-aymptotic-notations-1.png			0.0	https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png	Indexable									
images_all.xlsx		brentmarquez.com/					1.0											
images_all.xlsx			wp-content/				1.0											
images_all.xlsx				uploads/			1.0											
images_all.xlsx					2018/		1.0											
images_all.xlsx						03/	1.0											
images_all.xlsx		miro.medium.com/					2.0											
images_all.xlsx			max/				2.0											
images_all.xlsx				1350/			1.0											
images_all.xlsx					1*EB8wVXdkvp7vlnd0iTWNZg.jpeg		0.0	https://miro.medium.com/max/1350/1*EB8wVXdkvp7vlnd0iTWNZg.jpeg	Indexable									
images_all.xlsx				365/			1.0											
images_all.xlsx					1*Jr3NFSKTfQWRUyjblBSKeg.png		0.0	https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png	Indexable									
images_all.xlsx		appacademy-open-assets.s3-us-west-1.amazonaws.com/					1.0											
images_all.xlsx			Module-SQL/				1.0											
images_all.xlsx				assets/			1.0											
images_all.xlsx					spreadsheet-puppies-with-primary-key.png		0.0	https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-SQL/assets/spreadsheet-puppies-with	Indexable									
images_all.xlsx		emmet.io/					1.0											
images_all.xlsx			i/				1.0											
images_all.xlsx				logo-large.png			0.0	https://emmet.io/i/logo-large.png	Indexable									
images_all.xlsx		res.cloudinary.com/					1.0											
images_all.xlsx			ddlt2cjne/				1.0											
images_all.xlsx				image/			1.0											
images_all.xlsx					upload/		1.0											
images_all.xlsx						v1514361209/	1.0											
images_all.xlsx	http/						1.0											
images_all.xlsx		placehold.it/					1.0											
images_all.xlsx			750x300				0.0	http://placehold.it/750x300	Indexable									
internal_all.xlsx	https/						165.0											
internal_all.xlsx		bryan-lrlhj.ondigitalocean.app/					165.0											
internal_all.xlsx			PUBLIC/				159.0											
internal_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
internal_all.xlsx				css/			5.0											
internal_all.xlsx					bootstrap.min.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/bootstrap.min.css	Indexable									
internal_all.xlsx					font-awesome.min.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/font-awesome.min.css	Indexable									
internal_all.xlsx					carousel.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/carousel.css	Indexable									
internal_all.xlsx					animate.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/animate.css	Indexable									
internal_all.xlsx					bootstrap.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/bootstrap.css	Indexable									
internal_all.xlsx				other-pages/			133.0											
internal_all.xlsx					weeks/		102.0											
internal_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
internal_all.xlsx						week-24.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html	Non-Indexable	Client Error								
internal_all.xlsx						week-15.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html	Non-Indexable	Client Error								
internal_all.xlsx						week-23.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html	Non-Indexable	Client Error								
internal_all.xlsx						week-16.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html	Non-Indexable	Client Error								
internal_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
internal_all.xlsx						solution/	2.0											
internal_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
internal_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
internal_all.xlsx						week-18.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html	Non-Indexable	Client Error								
internal_all.xlsx						week-21.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html	Non-Indexable	Client Error								
internal_all.xlsx						week-13.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html	Non-Indexable	Client Error								
internal_all.xlsx						week-20.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html	Non-Indexable	Client Error								
internal_all.xlsx						week-19.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html	Non-Indexable	Client Error								
internal_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
internal_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
internal_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
internal_all.xlsx						week-17.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html	Non-Indexable	Client Error								
internal_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
internal_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
internal_all.xlsx						week-9/	29.0											
internal_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
internal_all.xlsx						week-22.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html	Non-Indexable	Client Error								
internal_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
internal_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
internal_all.xlsx						Images/	8.0											
internal_all.xlsx						week-14.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html	Non-Indexable	Client Error								
internal_all.xlsx						images/	19.0											
internal_all.xlsx						pseudo-elements.png	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/pseudo-elements.png	Non-Indexable	Client Error								
internal_all.xlsx						0-quiz/	11.0											
internal_all.xlsx						prism.js	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/prism.js	Indexable									
internal_all.xlsx						week-10/	2.0											
internal_all.xlsx						ajax.svg	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/ajax.svg	Non-Indexable	Client Error								
internal_all.xlsx						style.css	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/style.css	Indexable									
internal_all.xlsx						week-8/	1.0											
internal_all.xlsx						week-5connect-4index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html	Non-Indexable	Client Error								
internal_all.xlsx						index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html	Non-Indexable	Client Error								
internal_all.xlsx					blog-posts/		31.0											
internal_all.xlsx						best-prac-extension-guide/	7.0											
internal_all.xlsx						9-thigs-you-should-know-about/	4.0											
internal_all.xlsx						blog/	19.0											
internal_all.xlsx						0-projects/	1.0											
internal_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
internal_all.xlsx				js/			7.0											
internal_all.xlsx					bootstrap.min.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/bootstrap.min.js	Indexable									
internal_all.xlsx					jquery.min.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/jquery.min.js	Indexable									
internal_all.xlsx					carousel.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/carousel.js	Indexable									
internal_all.xlsx					custom.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/custom.js	Indexable									
internal_all.xlsx					videobg.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/videobg.js	Indexable									
internal_all.xlsx					animate.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/animate.js	Indexable									
internal_all.xlsx					map.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/map.js	Indexable									
internal_all.xlsx				images/			4.0											
internal_all.xlsx					loader.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/loader.gif	Indexable									
internal_all.xlsx					fullstack.PNG		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/fullstack.PNG	Indexable									
internal_all.xlsx					logo.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/logo.png	Indexable									
internal_all.xlsx					apple-touch-icon.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/apple-touch-icon.png	Non-Indexable	Client Error								
internal_all.xlsx				upload/			5.0											
internal_all.xlsx					course_01.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.jpg	Non-Indexable	Client Error								
internal_all.xlsx					course_04.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_04.jpg	Non-Indexable	Client Error								
internal_all.xlsx					best-prac-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/best-prac-250.gif	Indexable									
internal_all.xlsx					course_01.pgj		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj	Non-Indexable	Client Error								
internal_all.xlsx					matrix-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/matrix-250.gif	Indexable									
internal_all.xlsx				youtube.js			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/youtube.js	Indexable									
internal_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
internal_all.xlsx				style.css			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/style.css	Indexable									
internal_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
internal_all.xlsx			cdn-cgi/				2.0											
internal_all.xlsx				scripts/			1.0											
internal_all.xlsx					5c5dd728/		1.0											
internal_all.xlsx						cloudflare-static/	1.0											
internal_all.xlsx				l/			1.0											
page_titles_all.xlsx						week-10/	1.0											
internal_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex							"noindex	 nofollow"
internal_all.xlsx			other-pages/				1.0											
internal_all.xlsx				blog-post			0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post	Non-Indexable	Client Error								
internal_all.xlsx			Overflow/				1.0											
internal_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
internal_all.xlsx			drawio-master/				1.0											
internal_all.xlsx				src/			1.0											
internal_all.xlsx					main/		1.0											
internal_all.xlsx						webapp/	1.0											
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/index.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/best-prac-extension-guide/Desig										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/solution/directory-browsed/Directory										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/9-thigs-you-should-know-about/W										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/aa-times/index.ht										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/drawio-master/src/main/webapp/sandbox.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/rege										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk11-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/cheat-sheets/grid-cheatsheet.										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10/cheat-sheet/official-sequeli										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/big-										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk6-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/emme										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/data										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk7-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/best-prac-extension-guide/js-to										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/cheat-sheets/flexbox-cheatshe										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk10-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/quiz/wk9-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/9-thigs-you-should-know-about/W										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10/Database+Primer.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8/wk8-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/expr										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/pug.										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/0-quiz/wk5-quiz.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/0-projects/projects.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/cheat-sheets/CSS-Cheat-Sheet.										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/catstagram/public										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/9-thigs-you-should-know-about/W										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/catagories/Blog-Posts/										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/blog-posts/blog/vendor/bootstrap/css/boots										
link_metrics_all.xlsx							0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9/w9-projects/css-modernize-cra										
page_titles_all.xlsx	https/						52.0											
page_titles_all.xlsx		bryan-lrlhj.ondigitalocean.app/					52.0											
page_titles_all.xlsx			PUBLIC/				49.0											
page_titles_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
page_titles_all.xlsx				other-pages/			46.0											
page_titles_all.xlsx					weeks/		37.0											
page_titles_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
page_titles_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
page_titles_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
page_titles_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
page_titles_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
page_titles_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
page_titles_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
page_titles_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
page_titles_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
page_titles_all.xlsx						week-9/	18.0											
page_titles_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
page_titles_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
page_titles_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
page_titles_all.xlsx						0-quiz/	5.0											
page_titles_all.xlsx						week-8/	1.0											
page_titles_all.xlsx					blog-posts/		9.0											
page_titles_all.xlsx						best-prac-extension-guide/	2.0											
page_titles_all.xlsx						9-thigs-you-should-know-about/	1.0											
page_titles_all.xlsx						blog/	5.0											
page_titles_all.xlsx						0-projects/	1.0											
page_titles_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
page_titles_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
page_titles_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
page_titles_all.xlsx			drawio-master/				1.0											
page_titles_all.xlsx				src/			1.0											
page_titles_all.xlsx					main/		1.0											
page_titles_all.xlsx						webapp/	1.0											
page_titles_all.xlsx			cdn-cgi/				1.0											
page_titles_all.xlsx				l/			1.0											
page_titles_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
pagination_all.xlsx	https/						52.0											
pagination_all.xlsx		bryan-lrlhj.ondigitalocean.app/					52.0											
pagination_all.xlsx			PUBLIC/				49.0											
pagination_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
pagination_all.xlsx				other-pages/			46.0											
pagination_all.xlsx					weeks/		37.0											
pagination_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
pagination_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
pagination_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
pagination_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
pagination_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
pagination_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
pagination_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
pagination_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
pagination_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
pagination_all.xlsx						week-9/	18.0											
pagination_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
pagination_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
pagination_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
pagination_all.xlsx						0-quiz/	5.0											
pagination_all.xlsx						week-10/	1.0											
pagination_all.xlsx						week-8/	1.0											
pagination_all.xlsx					blog-posts/		9.0											
pagination_all.xlsx						best-prac-extension-guide/	2.0											
pagination_all.xlsx						9-thigs-you-should-know-about/	1.0											
pagination_all.xlsx						blog/	5.0											
pagination_all.xlsx						0-projects/	1.0											
pagination_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
pagination_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
pagination_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
pagination_all.xlsx			drawio-master/				1.0											
pagination_all.xlsx				src/			1.0											
pagination_all.xlsx					main/		1.0											
pagination_all.xlsx						webapp/	1.0											
pagination_all.xlsx			cdn-cgi/				1.0											
pagination_all.xlsx				l/			1.0											
pagination_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex							"noindex	 nofollow"
response_codes_all.xlsx	https/						451.0											
response_codes_all.xlsx		bryan-lrlhj.ondigitalocean.app/					165.0											
response_codes_all.xlsx			PUBLIC/				159.0											
response_codes_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
response_codes_all.xlsx				css/			5.0											
response_codes_all.xlsx					bootstrap.min.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/bootstrap.min.css	Indexable									
response_codes_all.xlsx					font-awesome.min.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/font-awesome.min.css	Indexable									
response_codes_all.xlsx					carousel.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/carousel.css	Indexable									
response_codes_all.xlsx					animate.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/animate.css	Indexable									
response_codes_all.xlsx					bootstrap.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/bootstrap.css	Indexable									
response_codes_all.xlsx				other-pages/			133.0											
response_codes_all.xlsx					weeks/		102.0											
response_codes_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
response_codes_all.xlsx						week-24.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-15.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-23.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-16.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
response_codes_all.xlsx						solution/	2.0											
response_codes_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
response_codes_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
response_codes_all.xlsx						week-18.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-21.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-13.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-20.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-19.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
response_codes_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
response_codes_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
response_codes_all.xlsx						week-17.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
response_codes_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
response_codes_all.xlsx						week-9/	29.0											
response_codes_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
response_codes_all.xlsx						week-22.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html	Non-Indexable	Client Error								
response_codes_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
response_codes_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
response_codes_all.xlsx						Images/	8.0											
response_codes_all.xlsx						week-14.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html	Non-Indexable	Client Error								
response_codes_all.xlsx						images/	19.0											
response_codes_all.xlsx						pseudo-elements.png	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/pseudo-elements.png	Non-Indexable	Client Error								
response_codes_all.xlsx						0-quiz/	11.0											
response_codes_all.xlsx						prism.js	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/prism.js	Indexable									
response_codes_all.xlsx						week-10/	2.0											
response_codes_all.xlsx						ajax.svg	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/ajax.svg	Non-Indexable	Client Error								
response_codes_all.xlsx						style.css	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/style.css	Indexable									
response_codes_all.xlsx						week-8/	1.0											
response_codes_all.xlsx						week-5connect-4index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html	Non-Indexable	Client Error								
response_codes_all.xlsx						index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html	Non-Indexable	Client Error								
response_codes_all.xlsx					blog-posts/		31.0											
response_codes_all.xlsx						best-prac-extension-guide/	7.0											
response_codes_all.xlsx						9-thigs-you-should-know-about/	4.0											
response_codes_all.xlsx						blog/	19.0											
response_codes_all.xlsx						0-projects/	1.0											
response_codes_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
response_codes_all.xlsx				js/			7.0											
response_codes_all.xlsx					bootstrap.min.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/bootstrap.min.js	Indexable									
response_codes_all.xlsx					jquery.min.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/jquery.min.js	Indexable									
response_codes_all.xlsx					carousel.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/carousel.js	Indexable									
response_codes_all.xlsx					custom.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/custom.js	Indexable									
response_codes_all.xlsx					videobg.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/videobg.js	Indexable									
response_codes_all.xlsx					animate.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/animate.js	Indexable									
response_codes_all.xlsx					map.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/map.js	Indexable									
response_codes_all.xlsx				images/			4.0											
response_codes_all.xlsx					loader.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/loader.gif	Indexable									
response_codes_all.xlsx					fullstack.PNG		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/fullstack.PNG	Indexable									
response_codes_all.xlsx					logo.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/logo.png	Indexable									
response_codes_all.xlsx					apple-touch-icon.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/apple-touch-icon.png	Non-Indexable	Client Error								
response_codes_all.xlsx				upload/			5.0											
response_codes_all.xlsx					course_01.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.jpg	Non-Indexable	Client Error								
response_codes_all.xlsx					course_04.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_04.jpg	Non-Indexable	Client Error								
response_codes_all.xlsx					best-prac-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/best-prac-250.gif	Indexable									
response_codes_all.xlsx					course_01.pgj		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj	Non-Indexable	Client Error								
response_codes_all.xlsx					matrix-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/matrix-250.gif	Indexable									
response_codes_all.xlsx				youtube.js			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/youtube.js	Indexable									
response_codes_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
response_codes_all.xlsx				style.css			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/style.css	Indexable									
response_codes_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
response_codes_all.xlsx			cdn-cgi/				2.0											
response_codes_all.xlsx				scripts/			1.0											
response_codes_all.xlsx					5c5dd728/		1.0											
response_codes_all.xlsx						cloudflare-static/	1.0											
response_codes_all.xlsx				l/			1.0											
response_codes_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
response_codes_all.xlsx			other-pages/				1.0											
response_codes_all.xlsx				blog-post			0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post	Non-Indexable	Client Error								
response_codes_all.xlsx			Overflow/				1.0											
response_codes_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
response_codes_all.xlsx			drawio-master/				1.0											
response_codes_all.xlsx				src/			1.0											
response_codes_all.xlsx					main/		1.0											
response_codes_all.xlsx						webapp/	1.0											
response_codes_all.xlsx		www.pinterest.com/					1.0											
response_codes_all.xlsx			bryanguner				0.0	https://www.pinterest.com/bryanguner	Non-Indexable	Redirected								
response_codes_all.xlsx		fonts.googleapis.com/					2.0											
response_codes_all.xlsx			"css?family=Roboto:300	400	400i	500	700.0	900"				0	"https://fonts.googleapis.com/css?family=Roboto:300	400	400i	500	700	900"
response_codes_all.xlsx			"css?family=Droid+Serif:400	400i	700	700i"	0.0			0	"https://fonts.googleapis.com/css?family=Droid+Serif:400	400i	700	700i"	Indexable			
response_codes_all.xlsx		www.linkedin.com/					1.0											
response_codes_all.xlsx			in/				1.0											
response_codes_all.xlsx				bryan-guner-046199128/			1.0	https://www.linkedin.com/in/bryan-guner-046199128/	Non-Indexable	Redirected								
response_codes_all.xlsx		ajax.googleapis.com/					1.0											
response_codes_all.xlsx			ajax/				1.0											
response_codes_all.xlsx				libs/			1.0											
response_codes_all.xlsx					jquery/		1.0											
response_codes_all.xlsx						1.11.2/	1.0											
response_codes_all.xlsx		www.dropbox.com/					1.0											
response_codes_all.xlsx			static/				1.0											
response_codes_all.xlsx				api/			1.0											
response_codes_all.xlsx					2/		1.0											
response_codes_all.xlsx						dropins.js	0.0	https://www.dropbox.com/static/api/2/dropins.js	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx		drive.google.com/					1.0											
response_codes_all.xlsx			embeddedfolderview?id=1EfCng5gOQnftOM-4VESCBLbY4JgT2RVm				0.0	https://drive.google.com/embeddedfolderview?id=1EfCng5gOQnftOM-4VESCBLbY4JgT2RVm	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx		mail.google.com/					1.0											
response_codes_all.xlsx			mail/				1.0											
response_codes_all.xlsx				u/			1.0											
response_codes_all.xlsx					0/		1.0											
response_codes_all.xlsx						h/	1.0	https://mail.google.com/mail/u/0/h/	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx		www.youtube-nocookie.com/					1.0											
response_codes_all.xlsx			embed/				1.0											
response_codes_all.xlsx				LiouJsnYytI			0.0	https://www.youtube-nocookie.com/embed/LiouJsnYytI	Indexable									
response_codes_all.xlsx		node-postgres.com/					1.0											
response_codes_all.xlsx			features/				1.0											
response_codes_all.xlsx				queries			0.0	https://node-postgres.com/features/queries	Non-Indexable	Redirected								
response_codes_all.xlsx		quizlet.com/					9.0											
response_codes_all.xlsx			535158481/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/535158481/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			519020363/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/519020363/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			523948576/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/523948576/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			529967382/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/529967382/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			526773066/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/526773066/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			519738486/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/519738486/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			532646422/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/532646422/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			521578337/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/521578337/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx			522292469/				1.0											
response_codes_all.xlsx				match/			1.0											
response_codes_all.xlsx					embed?x=1jj1		0.0	https://quizlet.com/522292469/match/embed?x=1jj1	Non-Indexable	Client Error								
response_codes_all.xlsx		danielmiessler.com/					1.0											
response_codes_all.xlsx			images/				1.0											
response_codes_all.xlsx				big-o-chart-tutorial-bazar-aymptotic-notations-1.png			0.0	https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png	Indexable									
response_codes_all.xlsx		developer.mozilla.org/					8.0											
response_codes_all.xlsx			en-US/				8.0											
response_codes_all.xlsx				docs/			8.0											
response_codes_all.xlsx					Web/		8.0											
response_codes_all.xlsx						CSS/	4.0											
response_codes_all.xlsx						CSS	0.0	https://developer.mozilla.org/en-US/docs/Web/CSS	Indexable									
response_codes_all.xlsx						HTML/	2.0											
response_codes_all.xlsx						JavaScript/	1.0											
response_codes_all.xlsx		github.com/					7.0											
response_codes_all.xlsx			bgoonz				0.0	https://github.com/bgoonz	Indexable									
response_codes_all.xlsx			appacademy-starters/				4.0											
response_codes_all.xlsx				sql-orm-recipe-box			0.0	https://github.com/appacademy-starters/sql-orm-recipe-box	Indexable									
response_codes_all.xlsx				sql-database-management-starter			0.0	https://github.com/appacademy-starters/sql-database-management-starter	Indexable									
response_codes_all.xlsx				sql-select-exercises-starter			0.0	https://github.com/appacademy-starters/sql-select-exercises-starter	Indexable									
response_codes_all.xlsx				sql-recipe-box			0.0	https://github.com/appacademy-starters/sql-recipe-box	Indexable									
response_codes_all.xlsx			Paxa/				2.0											
response_codes_all.xlsx				postbird/			2.0											
response_codes_all.xlsx					releases		0.0	https://github.com/Paxa/postbird/releases	Indexable									
response_codes_all.xlsx					issues/		1.0											
response_codes_all.xlsx						16	0.0	https://github.com/Paxa/postbird/issues/16	Indexable									
response_codes_all.xlsx		use.fontawesome.com/					1.0											
response_codes_all.xlsx			releases/				1.0											
response_codes_all.xlsx				v5.0.12/			1.0											
response_codes_all.xlsx					css/		1.0											
response_codes_all.xlsx						all.css	0.0	https://use.fontawesome.com/releases/v5.0.12/css/all.css	Indexable									
response_codes_all.xlsx		www.postgresqltutorial.com/					36.0											
response_codes_all.xlsx			postgresql-recursive-view/				1.0	https://www.postgresqltutorial.com/postgresql-recursive-view/	Indexable									
response_codes_all.xlsx			postgresql-insert/				1.0	https://www.postgresqltutorial.com/postgresql-insert/	Indexable									
response_codes_all.xlsx			postgresql-drop-database/				1.0	https://www.postgresqltutorial.com/postgresql-drop-database/	Indexable									
response_codes_all.xlsx			postgresql-show-tables/				1.0	https://www.postgresqltutorial.com/postgresql-show-tables/	Indexable									
response_codes_all.xlsx			postgresql-show-databases/				1.0	https://www.postgresqltutorial.com/postgresql-show-databases/	Indexable									
response_codes_all.xlsx			managing-postgresql-views/				1.0	https://www.postgresqltutorial.com/managing-postgresql-views/	Indexable									
response_codes_all.xlsx			postgresql-roles/				1.0	https://www.postgresqltutorial.com/postgresql-roles/	Indexable									
response_codes_all.xlsx			postgresql-create-database/				1.0	https://www.postgresqltutorial.com/postgresql-create-database/	Indexable									
response_codes_all.xlsx			postgresql-drop-table/				1.0	https://www.postgresqltutorial.com/postgresql-drop-table/	Indexable									
response_codes_all.xlsx			postgresql-in/				1.0	https://www.postgresqltutorial.com/postgresql-in/	Indexable									
response_codes_all.xlsx			postgresql-rename-table/				1.0	https://www.postgresqltutorial.com/postgresql-rename-table/	Indexable									
response_codes_all.xlsx			postgresql-limit/				1.0	https://www.postgresqltutorial.com/postgresql-limit/	Indexable									
response_codes_all.xlsx			postgresql-natural-join/				1.0	https://www.postgresqltutorial.com/postgresql-natural-join/	Indexable									
response_codes_all.xlsx			postgresql-full-outer-join/				1.0	https://www.postgresqltutorial.com/postgresql-full-outer-join/	Indexable									
response_codes_all.xlsx			postgresql-materialized-views/				1.0	https://www.postgresqltutorial.com/postgresql-materialized-views/	Indexable									
response_codes_all.xlsx			postgresql-rename-column/				1.0	https://www.postgresqltutorial.com/postgresql-rename-column/	Indexable									
response_codes_all.xlsx			postgresql-left-join/				1.0	https://www.postgresqltutorial.com/postgresql-left-join/	Indexable									
response_codes_all.xlsx			postgresql-tutorial/				1.0											
response_codes_all.xlsx				postgresql-except/			1.0	https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-except/	Non-Indexable	Redirected								
response_codes_all.xlsx			postgresql-add-column/				1.0	https://www.postgresqltutorial.com/postgresql-add-column/	Indexable									
response_codes_all.xlsx			postgresql-delete/				1.0	https://www.postgresqltutorial.com/postgresql-delete/	Indexable									
response_codes_all.xlsx				uploads/			1.0											
response_codes_all.xlsx			postgresql-between/				1.0	https://www.postgresqltutorial.com/postgresql-between/	Indexable									
response_codes_all.xlsx			postgresql-create-table/				1.0	https://www.postgresqltutorial.com/postgresql-create-table/	Indexable									
response_codes_all.xlsx			postgresql-temporary-table/				1.0	https://www.postgresqltutorial.com/postgresql-temporary-table/	Indexable									
response_codes_all.xlsx			postgresql-drop-column/				1.0	https://www.postgresqltutorial.com/postgresql-drop-column/	Indexable									
response_codes_all.xlsx			postgresql-alias/				1.0	https://www.postgresqltutorial.com/postgresql-alias/	Indexable									
response_codes_all.xlsx			postgresql-like/				1.0	https://www.postgresqltutorial.com/postgresql-like/	Indexable									
response_codes_all.xlsx			postgresql-views/				1.0	https://www.postgresqltutorial.com/postgresql-views/	Indexable									
response_codes_all.xlsx			postgresql-cross-join/				1.0	https://www.postgresqltutorial.com/postgresql-cross-join/	Indexable									
response_codes_all.xlsx			postgresql-having/				1.0	https://www.postgresqltutorial.com/postgresql-having/	Indexable									
response_codes_all.xlsx			postgresql-inner-join/				1.0	https://www.postgresqltutorial.com/postgresql-inner-join/	Indexable									
response_codes_all.xlsx			postgresql-update/				1.0	https://www.postgresqltutorial.com/postgresql-update/	Indexable									
response_codes_all.xlsx			postgresql-group-by/				1.0	https://www.postgresqltutorial.com/postgresql-group-by/	Indexable									
response_codes_all.xlsx			postgresql-round/				1.0	https://www.postgresqltutorial.com/postgresql-round/	Indexable									
response_codes_all.xlsx			postgresql-stored-procedures/				1.0	https://www.postgresqltutorial.com/postgresql-stored-procedures/	Non-Indexable	Redirected								
response_codes_all.xlsx			postgresql-primary-key/				1.0	https://www.postgresqltutorial.com/postgresql-primary-key/	Indexable									
response_codes_all.xlsx			postgresql-union/				1.0	https://www.postgresqltutorial.com/postgresql-union/	Indexable									
response_codes_all.xlsx		www.npmjs.com/					2.0											
response_codes_all.xlsx			package/				2.0											
response_codes_all.xlsx				sequelize-cli			0.0	https://www.npmjs.com/package/sequelize-cli	Indexable									
response_codes_all.xlsx				sequelize			0.0	https://www.npmjs.com/package/sequelize	Indexable									
response_codes_all.xlsx		gist.github.com/					1.0											
response_codes_all.xlsx			Kartones/				1.0											
response_codes_all.xlsx				dd3ff5ec5ea238d4c546			0.0	https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546	Indexable									
response_codes_all.xlsx		repl.it/					2.0											
response_codes_all.xlsx			@bgoonz/				2.0											
response_codes_all.xlsx				week-10-take-2?lite=true			0.0	https://repl.it/@bgoonz/week-10-take-2?lite=true	Indexable									
response_codes_all.xlsx				a-A-Student-Resources-Website-Prototype?lite=true			0.0	https://repl.it/@bgoonz/a-A-Student-Resources-Website-Prototype?lite=true	Indexable									
response_codes_all.xlsx		www.postgresql.org/					5.0	https://www.postgresql.org/	Indexable									
response_codes_all.xlsx			docs/				4.0											
response_codes_all.xlsx				9.6/			2.0											
response_codes_all.xlsx					sql-select.html		0.0	https://www.postgresql.org/docs/9.6/sql-select.html	Indexable									
response_codes_all.xlsx					datatype-numeric.html		0.0	https://www.postgresql.org/docs/9.6/datatype-numeric.html	Indexable									
response_codes_all.xlsx				current/			2.0											
response_codes_all.xlsx					datatype.html		0.0	https://www.postgresql.org/docs/current/datatype.html	Indexable									
response_codes_all.xlsx					sql-createuser.html		0.0	https://www.postgresql.org/docs/current/sql-createuser.html	Indexable									
response_codes_all.xlsx		cdn.jsdelivr.net/					2.0											
response_codes_all.xlsx			gh/				2.0											
response_codes_all.xlsx				highlightjs/			2.0											
response_codes_all.xlsx					cdn-release@10.4.0/		2.0											
response_codes_all.xlsx						build/	2.0											
response_codes_all.xlsx		sequelize.org/					10.0											
response_codes_all.xlsx			master/				4.0											
response_codes_all.xlsx				class/			2.0											
response_codes_all.xlsx					lib/		2.0											
response_codes_all.xlsx						query-interface.js~QueryInterface.html	0.0	https://sequelize.org/master/class/lib/query-interface.js~QueryInterface.html	Non-Indexable	Client Error								
response_codes_all.xlsx						model.js~Model.html	0.0	https://sequelize.org/master/class/lib/model.js~Model.html	Indexable									
response_codes_all.xlsx				manual/			2.0											
response_codes_all.xlsx					hooks.html		0.0	https://sequelize.org/master/manual/hooks.html	Indexable									
response_codes_all.xlsx					validations-and-constraints.html		0.0	https://sequelize.org/master/manual/validations-and-constraints.html	Indexable									
response_codes_all.xlsx			v5/				6.0	https://sequelize.org/v5/	Indexable									
response_codes_all.xlsx				manual/			3.0											
response_codes_all.xlsx					querying.html		0.0	https://sequelize.org/v5/manual/querying.html	Indexable									
response_codes_all.xlsx					models-definition.html		0.0	https://sequelize.org/v5/manual/models-definition.html	Indexable									
response_codes_all.xlsx					data-types.html		0.0	https://sequelize.org/v5/manual/data-types.html	Indexable									
response_codes_all.xlsx				class/			2.0											
response_codes_all.xlsx					lib/		2.0											
response_codes_all.xlsx						errors/	2.0											
response_codes_all.xlsx		www.abeautifulsite.net/					1.0											
response_codes_all.xlsx			what-are-favicons				0.0	https://www.abeautifulsite.net/what-are-favicons	Indexable									
response_codes_all.xlsx		sqlzoo.net/					1.0											
response_codes_all.xlsx			wiki/				1.0											
response_codes_all.xlsx				SELECT_Reference			0.0	https://sqlzoo.net/wiki/SELECT_Reference	Indexable									
response_codes_all.xlsx		brentmarquez.com/					1.0											
response_codes_all.xlsx			wp-content/				1.0											
response_codes_all.xlsx					2018/		1.0											
response_codes_all.xlsx						03/	1.0											
response_codes_all.xlsx		www.producthunt.com/					1.0	https://www.producthunt.com/	Indexable									
response_codes_all.xlsx		miro.medium.com/					2.0											
response_codes_all.xlsx			max/				2.0											
response_codes_all.xlsx				1350/			1.0											
response_codes_all.xlsx					1*EB8wVXdkvp7vlnd0iTWNZg.jpeg		0.0	https://miro.medium.com/max/1350/1*EB8wVXdkvp7vlnd0iTWNZg.jpeg	Indexable									
response_codes_all.xlsx				365/			1.0											
response_codes_all.xlsx					1*Jr3NFSKTfQWRUyjblBSKeg.png		0.0	https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png	Indexable									
response_codes_all.xlsx		goo.gl/					1.0											
response_codes_all.xlsx			maps/				1.0											
response_codes_all.xlsx				SQ7cyCbGAQn5vxiH6			0.0	https://goo.gl/maps/SQ7cyCbGAQn5vxiH6	Non-Indexable	Redirected								
response_codes_all.xlsx		www.w3.org/					1.0											
response_codes_all.xlsx			TR/				1.0											
response_codes_all.xlsx				2007/			1.0											
response_codes_all.xlsx					WD-html-design-principles-20071126/		1.0	https://www.w3.org/TR/2007/WD-html-design-principles-20071126/	Indexable									
response_codes_all.xlsx		en.wikipedia.org/					1.0											
response_codes_all.xlsx			wiki/				1.0											
response_codes_all.xlsx				Three-valued_logic			0.0	https://en.wikipedia.org/wiki/Three-valued_logic	Indexable									
response_codes_all.xlsx		fonts.google.com/					1.0	https://fonts.google.com/	Indexable									
response_codes_all.xlsx		www.essentialsql.com/					2.0											
response_codes_all.xlsx			get-ready-to-learn-sql-server-20-using-subqueries-in-the-select-statement/				1.0	https://www.essentialsql.com/get-ready-to-learn-sql-server-20-using-subqueries-in-the-select-stateme	Indexable									
response_codes_all.xlsx			what-is-the-difference-between-a-join-and-subquery/				1.0	https://www.essentialsql.com/what-is-the-difference-between-a-join-and-subquery/	Indexable									
response_codes_all.xlsx		www.enterprisedb.com/					1.0											
response_codes_all.xlsx			downloads/				1.0											
response_codes_all.xlsx				postgres-postgresql-downloads			0.0	https://www.enterprisedb.com/downloads/postgres-postgresql-downloads	Indexable									
response_codes_all.xlsx		player.vimeo.com/					1.0											
response_codes_all.xlsx			video/				1.0											
response_codes_all.xlsx				380193367			0.0	https://player.vimeo.com/video/380193367	Indexable									
response_codes_all.xlsx		www.toptal.com/					1.0											
response_codes_all.xlsx			designers/				1.0											
response_codes_all.xlsx				web/			1.0											
response_codes_all.xlsx					interview-questions		0.0	https://www.toptal.com/designers/web/interview-questions	Indexable									
response_codes_all.xlsx		appacademy-open-assets.s3-us-west-1.amazonaws.com/					1.0											
response_codes_all.xlsx			Module-SQL/				1.0											
response_codes_all.xlsx				assets/			1.0											
response_codes_all.xlsx					spreadsheet-puppies-with-primary-key.png		0.0	https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-SQL/assets/spreadsheet-puppies-with	Indexable									
response_codes_all.xlsx		blog.designcrowd.com/					1.0											
response_codes_all.xlsx			article/				1.0											
response_codes_all.xlsx				867/			1.0											
response_codes_all.xlsx					understanding-the-hierarchy-of-text		0.0	https://blog.designcrowd.com/article/867/understanding-the-hierarchy-of-text	Indexable									
response_codes_all.xlsx		mycdn.com/					1.0											
response_codes_all.xlsx			prism@v1.x/				1.0											
response_codes_all.xlsx				themes/			1.0											
response_codes_all.xlsx					prism.css		0.0	https://mycdn.com/prism@v1.x/themes/prism.css	Non-Indexable	Server Error								
response_codes_all.xlsx		webaim.org/					1.0											
response_codes_all.xlsx			resources/				1.0											
response_codes_all.xlsx				contrastchecker/			1.0	https://webaim.org/resources/contrastchecker/	Indexable									
response_codes_all.xlsx		maps.googleapis.com/					1.0											
response_codes_all.xlsx			maps/				1.0											
response_codes_all.xlsx				api/			1.0											
response_codes_all.xlsx					js?libraries=places&key=AIzaSyAkADq7R0xf6ami9YirAM1N-yl7hdnYBhM		0.0	https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAkADq7R0xf6ami9YirAM1N-yl7hdnYBhM	Indexable									
response_codes_all.xlsx		pugjs.org/					1.0	https://pugjs.org/	Indexable									
response_codes_all.xlsx		www.node-postgres.com/					1.0	https://www.node-postgres.com/	Non-Indexable	Redirected								
response_codes_all.xlsx		99designs.com/					1.0											
response_codes_all.xlsx			blog/				1.0											
response_codes_all.xlsx				tips/			1.0											
response_codes_all.xlsx					the-7-step-guide-to-understanding-color-theory/		1.0	https://99designs.com/blog/tips/the-7-step-guide-to-understanding-color-theory/	Indexable									
response_codes_all.xlsx		www.expressjs.com/					1.0	https://www.expressjs.com/	Non-Indexable	Redirected								
response_codes_all.xlsx		emmet.io/					1.0											
response_codes_all.xlsx			i/				1.0											
response_codes_all.xlsx				logo-large.png			0.0	https://emmet.io/i/logo-large.png	Indexable									
response_codes_all.xlsx		res.cloudinary.com/					1.0											
response_codes_all.xlsx			ddlt2cjne/				1.0											
response_codes_all.xlsx				image/			1.0											
response_codes_all.xlsx					upload/		1.0											
response_codes_all.xlsx						v1514361209/	1.0											
response_codes_all.xlsx		austin.craigslist.org/					94.0											
response_codes_all.xlsx			d/				94.0											
response_codes_all.xlsx				politics/			1.0											
response_codes_all.xlsx					search/		1.0											
Site-Crawl.xlsx							0.0											
response_codes_all.xlsx						pol	0.0	https://austin.craigslist.org/d/politics/search/pol	Indexable									
response_codes_all.xlsx				antiques/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ata	0.0	https://austin.craigslist.org/d/antiques/search/ata	Indexable									
response_codes_all.xlsx				events-classes/			26.0											
response_codes_all.xlsx					search/		26.0											
response_codes_all.xlsx						eee?sale_date=2019-11-12	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-12	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-13	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-13	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-14	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-14	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-15	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-15	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-16	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-16	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-17	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-17	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-01	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-01	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-02	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-02	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-03	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-03	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-05	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-05	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-04	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-04	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-06	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-06	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-07	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-07	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-08	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-08	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-09	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-09	Indexable									
response_codes_all.xlsx						eee	0.0	https://austin.craigslist.org/d/events-classes/search/eee	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-10	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-10	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-11-11	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-11	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-31	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-31	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-30	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-30	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-28	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-28	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-29	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-29	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-27	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-27	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-25	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-25	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-26	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-26	Indexable									
response_codes_all.xlsx						eee?sale_date=2019-10-24	0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-24	Indexable									
response_codes_all.xlsx				all-housing-wanted/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						hsw	0.0	https://austin.craigslist.org/d/all-housing-wanted/search/hsw	Indexable									
response_codes_all.xlsx				childcare/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						kid	0.0	https://austin.craigslist.org/d/childcare/search/kid	Indexable									
response_codes_all.xlsx				appliances/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ppa	0.0	https://austin.craigslist.org/d/appliances/search/ppa	Indexable									
response_codes_all.xlsx				events/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						eve	0.0	https://austin.craigslist.org/d/events/search/eve	Indexable									
response_codes_all.xlsx				barter/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bar	0.0	https://austin.craigslist.org/d/barter/search/bar	Indexable									
response_codes_all.xlsx				wanted%3A-room-share/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						sha	0.0	https://austin.craigslist.org/d/wanted%3A-room-share/search/sha	Indexable									
response_codes_all.xlsx				cell-phones/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						moa	0.0	https://austin.craigslist.org/d/cell-phones/search/moa	Indexable									
response_codes_all.xlsx				health-and-beauty/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						haa	0.0	https://austin.craigslist.org/d/health-and-beauty/search/haa	Indexable									
response_codes_all.xlsx				musicians/			1.0											
Site-Crawl.xlsx							0.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						muc	0.0	https://austin.craigslist.org/d/musicians/search/muc	Indexable									
response_codes_all.xlsx				atvs%2C-utvs%2C-snowmobiles/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						sna	0.0	https://austin.craigslist.org/d/atvs%2C-utvs%2C-snowmobiles/search/sna	Indexable									
response_codes_all.xlsx				marine-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						mas	0.0	https://austin.craigslist.org/d/marine-services/search/mas	Indexable									
response_codes_all.xlsx				sublets-temporary/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						sub	0.0	https://austin.craigslist.org/d/sublets-temporary/search/sub	Indexable									
response_codes_all.xlsx				household-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						hss	0.0	https://austin.craigslist.org/d/household-services/search/hss	Indexable									
response_codes_all.xlsx				event-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						evs	0.0	https://austin.craigslist.org/d/event-services/search/evs	Indexable									
response_codes_all.xlsx				cycle-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						cys	0.0	https://austin.craigslist.org/d/cycle-services/search/cys	Indexable									
response_codes_all.xlsx				real-estate-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						rts	0.0	https://austin.craigslist.org/d/real-estate-services/search/rts	Indexable									
response_codes_all.xlsx				farm-garden-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						fgs	0.0	https://austin.craigslist.org/d/farm-garden-services/search/fgs	Indexable									
response_codes_all.xlsx				rants-raves/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						rnr	0.0	https://austin.craigslist.org/d/rants-raves/search/rnr	Indexable									
response_codes_all.xlsx				rooms-shares/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						roo	0.0	https://austin.craigslist.org/d/rooms-shares/search/roo	Indexable									
response_codes_all.xlsx				pet-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						pas	0.0	https://austin.craigslist.org/d/pet-services/search/pas	Indexable									
response_codes_all.xlsx				computer-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						cps	0.0	https://austin.craigslist.org/d/computer-services/search/cps	Indexable									
response_codes_all.xlsx				business/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bfa	0.0	https://austin.craigslist.org/d/business/search/bfa	Indexable									
response_codes_all.xlsx				bicycle-parts/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bip	0.0	https://austin.craigslist.org/d/bicycle-parts/search/bip	Indexable									
response_codes_all.xlsx				skilled-trade-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						sks	0.0	https://austin.craigslist.org/d/skilled-trade-services/search/sks	Indexable									
response_codes_all.xlsx				lessons-tutoring/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						lss	0.0	https://austin.craigslist.org/d/lessons-tutoring/search/lss	Indexable									
response_codes_all.xlsx				travel-vacation-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						trv	0.0	https://austin.craigslist.org/d/travel-vacation-services/search/trv	Indexable									
response_codes_all.xlsx				labor-hauling-moving/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						lbs	0.0	https://austin.craigslist.org/d/labor-hauling-moving/search/lbs	Indexable									
response_codes_all.xlsx				activity-partners/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						act	0.0	https://austin.craigslist.org/d/activity-partners/search/act	Indexable									
response_codes_all.xlsx				arts-crafts/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ara	0.0	https://austin.craigslist.org/d/arts-crafts/search/ara	Indexable									
response_codes_all.xlsx				artists/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ats	0.0	https://austin.craigslist.org/d/artists/search/ats	Indexable									
response_codes_all.xlsx				aviation/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ava	0.0	https://austin.craigslist.org/d/aviation/search/ava	Indexable									
response_codes_all.xlsx				parking-storage/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						prk	0.0	https://austin.craigslist.org/d/parking-storage/search/prk	Indexable									
response_codes_all.xlsx				for-sale/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						sss	0.0	https://austin.craigslist.org/d/for-sale/search/sss	Indexable									
response_codes_all.xlsx				classes/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						cls	0.0	https://austin.craigslist.org/d/classes/search/cls	Indexable									
response_codes_all.xlsx				volunteers/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						vol	0.0	https://austin.craigslist.org/d/volunteers/search/vol	Indexable									
response_codes_all.xlsx				creative-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						crs	0.0	https://austin.craigslist.org/d/creative-services/search/crs	Indexable									
response_codes_all.xlsx				groups/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						grp	0.0	https://austin.craigslist.org/d/groups/search/grp	Indexable									
response_codes_all.xlsx				cell-phone-mobile-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						cms	0.0	https://austin.craigslist.org/d/cell-phone-mobile-services/search/cms	Indexable									
response_codes_all.xlsx				auto-parts/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						pta	0.0	https://austin.craigslist.org/d/auto-parts/search/pta	Indexable									
response_codes_all.xlsx				boat-parts-accessories/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bpa	0.0	https://austin.craigslist.org/d/boat-parts-accessories/search/bpa	Indexable									
response_codes_all.xlsx				missed-connections/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						mis	0.0	https://austin.craigslist.org/d/missed-connections/search/mis	Indexable									
response_codes_all.xlsx				vacation-rentals/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						vac	0.0	https://austin.craigslist.org/d/vacation-rentals/search/vac	Indexable									
response_codes_all.xlsx				apts-housing-for-rent/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						apa	0.0	https://austin.craigslist.org/d/apts-housing-for-rent/search/apa	Indexable									
response_codes_all.xlsx				office-commercial/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						off	0.0	https://austin.craigslist.org/d/office-commercial/search/off	Indexable									
response_codes_all.xlsx				writing-editing-translation/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						wet	0.0	https://austin.craigslist.org/d/writing-editing-translation/search/wet	Indexable									
response_codes_all.xlsx				pets/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						pet	0.0	https://austin.craigslist.org/d/pets/search/pet	Indexable									
response_codes_all.xlsx				cars-trucks/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						cta	0.0	https://austin.craigslist.org/d/cars-trucks/search/cta	Indexable									
response_codes_all.xlsx				beauty-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bts	0.0	https://austin.craigslist.org/d/beauty-services/search/bts	Indexable									
response_codes_all.xlsx				local-news-and-views/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						vnn	0.0	https://austin.craigslist.org/d/local-news-and-views/search/vnn	Indexable									
response_codes_all.xlsx				community/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ccc	0.0	https://austin.craigslist.org/d/community/search/ccc	Indexable									
response_codes_all.xlsx				boats/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						boo	0.0	https://austin.craigslist.org/d/boats/search/boo	Indexable									
response_codes_all.xlsx				housing/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						hhh	0.0	https://austin.craigslist.org/d/housing/search/hhh	Indexable									
response_codes_all.xlsx				bicycles/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bia	0.0	https://austin.craigslist.org/d/bicycles/search/bia	Indexable									
response_codes_all.xlsx				automotive-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						aos	0.0	https://austin.craigslist.org/d/automotive-services/search/aos	Indexable									
response_codes_all.xlsx				books-magazines/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bka	0.0	https://austin.craigslist.org/d/books-magazines/search/bka	Indexable									
response_codes_all.xlsx				general-community/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						com	0.0	https://austin.craigslist.org/d/general-community/search/com	Indexable									
response_codes_all.xlsx				small-biz-ads/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						biz	0.0	https://austin.craigslist.org/d/small-biz-ads/search/biz	Indexable									
response_codes_all.xlsx				real-estate/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						rea	0.0	https://austin.craigslist.org/d/real-estate/search/rea	Indexable									
response_codes_all.xlsx				financial-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx					1118008189/		1.0											
response_codes_all.xlsx						fns	0.0	https://austin.craigslist.org/d/financial-services/search/fns	Indexable									
response_codes_all.xlsx				rideshare/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						rid	0.0	https://austin.craigslist.org/d/rideshare/search/rid	Indexable									
response_codes_all.xlsx				cds-dvds-vhs/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						ema	0.0	https://austin.craigslist.org/d/cds-dvds-vhs/search/ema	Indexable									
response_codes_all.xlsx				services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						bbb	0.0	https://austin.craigslist.org/d/services/search/bbb	Indexable									
response_codes_all.xlsx				legal-services/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						lgs	0.0	https://austin.craigslist.org/d/legal-services/search/lgs	Indexable									
response_codes_all.xlsx				lost-found/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						laf	0.0	https://austin.craigslist.org/d/lost-found/search/laf	Indexable									
response_codes_all.xlsx				housing-swap/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						swp	0.0	https://austin.craigslist.org/d/housing-swap/search/swp	Indexable									
response_codes_all.xlsx				baby-kid-stuff/			1.0											
response_codes_all.xlsx					search/		1.0											
response_codes_all.xlsx						baa	0.0	https://austin.craigslist.org/d/baby-kid-stuff/search/baa	Indexable									
response_codes_all.xlsx		codewithhugo.com/					1.0											
response_codes_all.xlsx			using-es6-classes-for-sequelize-4-models/				1.0	https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/	Indexable									
response_codes_all.xlsx		forums.craigslist.org/					55.0											
response_codes_all.xlsx			?areaID=15&forumID=575				0.0	https://forums.craigslist.org/?areaID=15&forumID=575	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=2012				0.0	https://forums.craigslist.org/?areaID=15&forumID=2012	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=3232				0.0	https://forums.craigslist.org/?areaID=15&forumID=3232	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=5500				0.0	https://forums.craigslist.org/?areaID=15&forumID=5500	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=1040				0.0	https://forums.craigslist.org/?areaID=15&forumID=1040	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=2007				0.0	https://forums.craigslist.org/?areaID=15&forumID=2007	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=130				0.0	https://forums.craigslist.org/?areaID=15&forumID=130	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=122				0.0	https://forums.craigslist.org/?areaID=15&forumID=122	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=99				0.0	https://forums.craigslist.org/?areaID=15&forumID=99	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=98				0.0	https://forums.craigslist.org/?areaID=15&forumID=98	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15				0.0	https://forums.craigslist.org/?areaID=15	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=1991				0.0	https://forums.craigslist.org/?areaID=15&forumID=1991	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=64				0.0	https://forums.craigslist.org/?areaID=15&forumID=64	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=73				0.0	https://forums.craigslist.org/?areaID=15&forumID=73	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=1564				0.0	https://forums.craigslist.org/?areaID=15&forumID=1564	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=71				0.0	https://forums.craigslist.org/?areaID=15&forumID=71	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=59				0.0	https://forums.craigslist.org/?areaID=15&forumID=59	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=53				0.0	https://forums.craigslist.org/?areaID=15&forumID=53	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=54				0.0	https://forums.craigslist.org/?areaID=15&forumID=54	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=88				0.0	https://forums.craigslist.org/?areaID=15&forumID=88	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=95				0.0	https://forums.craigslist.org/?areaID=15&forumID=95	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=96				0.0	https://forums.craigslist.org/?areaID=15&forumID=96	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=93				0.0	https://forums.craigslist.org/?areaID=15&forumID=93	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=79				0.0	https://forums.craigslist.org/?areaID=15&forumID=79	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=78				0.0	https://forums.craigslist.org/?areaID=15&forumID=78	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=76				0.0	https://forums.craigslist.org/?areaID=15&forumID=76	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=85				0.0	https://forums.craigslist.org/?areaID=15&forumID=85	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=2400				0.0	https://forums.craigslist.org/?areaID=15&forumID=2400	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=81				0.0	https://forums.craigslist.org/?areaID=15&forumID=81	Non-Indexable	Blocked by robots.txt								
Site-Crawl.xlsx							0.0	https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js										
response_codes_all.xlsx			?areaID=15&forumID=28				0.0	https://forums.craigslist.org/?areaID=15&forumID=28	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=29				0.0	https://forums.craigslist.org/?areaID=15&forumID=29	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=5178				0.0	https://forums.craigslist.org/?areaID=15&forumID=5178	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=26				0.0	https://forums.craigslist.org/?areaID=15&forumID=26	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=27				0.0	https://forums.craigslist.org/?areaID=15&forumID=27	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=24				0.0	https://forums.craigslist.org/?areaID=15&forumID=24	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=22				0.0	https://forums.craigslist.org/?areaID=15&forumID=22	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=20				0.0	https://forums.craigslist.org/?areaID=15&forumID=20	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=1926				0.0	https://forums.craigslist.org/?areaID=15&forumID=1926	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=7000				0.0	https://forums.craigslist.org/?areaID=15&forumID=7000	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=5				0.0	https://forums.craigslist.org/?areaID=15&forumID=5	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=4				0.0	https://forums.craigslist.org/?areaID=15&forumID=4	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=16				0.0	https://forums.craigslist.org/?areaID=15&forumID=16	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=9				0.0	https://forums.craigslist.org/?areaID=15&forumID=9	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=8				0.0	https://forums.craigslist.org/?areaID=15&forumID=8	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=12				0.0	https://forums.craigslist.org/?areaID=15&forumID=12	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=7				0.0	https://forums.craigslist.org/?areaID=15&forumID=7	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=6				0.0	https://forums.craigslist.org/?areaID=15&forumID=6	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=1257				0.0	https://forums.craigslist.org/?areaID=15&forumID=1257	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=49				0.0	https://forums.craigslist.org/?areaID=15&forumID=49	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=47				0.0	https://forums.craigslist.org/?areaID=15&forumID=47	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=42				0.0	https://forums.craigslist.org/?areaID=15&forumID=42	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=39				0.0	https://forums.craigslist.org/?areaID=15&forumID=39	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=34				0.0	https://forums.craigslist.org/?areaID=15&forumID=34	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=32				0.0	https://forums.craigslist.org/?areaID=15&forumID=32	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx			?areaID=15&forumID=41				0.0	https://forums.craigslist.org/?areaID=15&forumID=41	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx		www.craigslist.org/					12.0											
response_codes_all.xlsx			about/				12.0	https://www.craigslist.org/about/	Indexable									
response_codes_all.xlsx				terms.of.use.en-us			0.0	https://www.craigslist.org/about/terms.of.use.en-us	Non-Indexable	Redirected								
response_codes_all.xlsx				safety			0.0	https://www.craigslist.org/about/safety	Indexable									
response_codes_all.xlsx				privacy.policy			0.0	https://www.craigslist.org/about/privacy.policy	Indexable									
response_codes_all.xlsx				help/			2.0	https://www.craigslist.org/about/help/	Indexable									
response_codes_all.xlsx					system-status		0.0	https://www.craigslist.org/about/help/system-status	Indexable									
response_codes_all.xlsx				scams			0.0	https://www.craigslist.org/about/scams	Indexable									
response_codes_all.xlsx				cl_app_beta			0.0	https://www.craigslist.org/about/cl_app_beta	Indexable									
response_codes_all.xlsx				craigslist_is_hiring			0.0	https://www.craigslist.org/about/craigslist_is_hiring	Indexable									
response_codes_all.xlsx				open_source			0.0	https://www.craigslist.org/about/open_source	Indexable									
response_codes_all.xlsx				sites			0.0	https://www.craigslist.org/about/sites	Indexable									
response_codes_all.xlsx				best/			1.0											
response_codes_all.xlsx					all/		1.0	https://www.craigslist.org/about/best/all/	Indexable									
response_codes_all.xlsx		code.jquery.com/					1.0											
response_codes_all.xlsx			jquery-2.2.4.min.js				0.0	https://code.jquery.com/jquery-2.2.4.min.js	Indexable									
response_codes_all.xlsx		post.craigslist.org/					1.0											
response_codes_all.xlsx			c/				1.0											
response_codes_all.xlsx				aus			0.0	https://post.craigslist.org/c/aus	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx		www.youtube.com/					1.0											
response_codes_all.xlsx			user/				1.0											
response_codes_all.xlsx				craigslist			0.0	https://www.youtube.com/user/craigslist	Indexable									
response_codes_all.xlsx		accounts.craigslist.org/					1.0											
response_codes_all.xlsx			login/				1.0											
response_codes_all.xlsx				home			0.0	https://accounts.craigslist.org/login/home	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx	http/						49.0											
response_codes_all.xlsx		www.amazon.com/					26.0											
response_codes_all.xlsx			gp/				26.0											
response_codes_all.xlsx				product/			26.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1118008189&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/1118008189/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati	Non-Indexable	Redirected								
response_codes_all.xlsx					0131411551/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=013141	0.0	http://www.amazon.com/gp/product/0131411551/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0521675995/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=052167	0.0	http://www.amazon.com/gp/product/0521675995/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0672329468/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=067232	0.0	http://www.amazon.com/gp/product/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					1491949856/		1.0											
response_codes_all.xlsx						ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1491949856&linkCode=as2&tag=ucmbread-20&	0.0	http://www.amazon.com/gp/product/1491949856/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeA	Non-Indexable	Redirected								
response_codes_all.xlsx					0262631814/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=026263	0.0	http://www.amazon.com/gp/product/0262631814/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0262033844/		2.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=026203	0.0	http://www.amazon.com/gp/product/0262033844/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0262033844&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0262033844/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati	Non-Indexable	Redirected								
response_codes_all.xlsx					4871878309/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=487187	0.0	http://www.amazon.com/gp/product/4871878309/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0596514980/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=059651	0.0	http://www.amazon.com/gp/product/0596514980/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0961392142/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=096139	0.0	http://www.amazon.com/gp/product/0961392142/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0321751043/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=032175	0.0	http://www.amazon.com/gp/product/0321751043/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0201530821/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=020153	0.0	http://www.amazon.com/gp/product/0201530821/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0123744938/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=012374	0.0	http://www.amazon.com/gp/product/0123744938/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0981531644/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=098153	0.0	http://www.amazon.com/gp/product/0981531644/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0521545668/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=052154	0.0	http://www.amazon.com/gp/product/0521545668/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0201734842/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=020173	0.0	http://www.amazon.com/gp/product/0201734842/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					159327288X/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=159327	0.0	http://www.amazon.com/gp/product/159327288X/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					032157351X/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=032157351X&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/032157351X/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati	Non-Indexable	Redirected								
response_codes_all.xlsx					0596805527/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0596805527&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0596805527/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati	Non-Indexable	Redirected								
response_codes_all.xlsx					052156543X/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=052156	0.0	http://www.amazon.com/gp/product/052156543X/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0534950973/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=aboutmatthewm-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=0	0.0	http://www.amazon.com/gp/product/0534950973/ref=as_li_ss_tl?ie=UTF8&tag=aboutmatthewm-20&linkCode=as	Non-Indexable	Redirected								
response_codes_all.xlsx					0201657880/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0201657880&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0201657880/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati	Non-Indexable	Redirected								
response_codes_all.xlsx					0470474246/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=047047	0.0	http://www.amazon.com/gp/product/0470474246/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0201700735/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=020170	0.0	http://www.amazon.com/gp/product/0201700735/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam	Non-Indexable	Redirected								
response_codes_all.xlsx					0470068523/		1.0											
response_codes_all.xlsx						ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0470068523&linkCode=as2&tag=ucmbread-	0.0	http://www.amazon.com/gp/product/0470068523/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati	Non-Indexable	Redirected								
response_codes_all.xlsx		www.twitter.com/					1.0											
response_codes_all.xlsx			mattmight				0.0	http://www.twitter.com/mattmight	Non-Indexable	Blocked by robots.txt								
response_codes_all.xlsx		mitpress.mit.edu/					1.0											
response_codes_all.xlsx			sicp/				1.0											
response_codes_all.xlsx				full-text/			1.0											
response_codes_all.xlsx					book/		1.0											
response_codes_all.xlsx						book.html	0.0	http://mitpress.mit.edu/sicp/full-text/book/book.html	Non-Indexable	Redirected								
response_codes_all.xlsx		www.postgresqltutorial.com/					3.0											
response_codes_all.xlsx			postgresql-data-types/				1.0	http://www.postgresqltutorial.com/postgresql-data-types/	Non-Indexable	Redirected								
response_codes_all.xlsx			postgresql-boolean/				1.0	http://www.postgresqltutorial.com/postgresql-boolean/	Non-Indexable	Redirected								
response_codes_all.xlsx			postgresql-explain/				1.0	http://www.postgresqltutorial.com/postgresql-explain/	Non-Indexable	Redirected								
response_codes_all.xlsx		minikanren.org/					1.0	http://minikanren.org/	Indexable									
response_codes_all.xlsx		matt.might.net/					3.0											
response_codes_all.xlsx			articles/				3.0											
response_codes_all.xlsx				how-to-make-your-own-cat-5-ethernet-cable/			1.0	http://matt.might.net/articles/how-to-make-your-own-cat-5-ethernet-cable/	Indexable									
response_codes_all.xlsx				implementation-of-rsa-public-key-cryptography-algorithm-in-scheme-dialect-of-lisp/			1.0	http://matt.might.net/articles/implementation-of-rsa-public-key-cryptography-algorithm-in-scheme-dia	Indexable									
response_codes_all.xlsx				c++-template-meta-programming-with-lambda-calculus/			1.0	http://matt.might.net/articles/c++-template-meta-programming-with-lambda-calculus/	Indexable									
response_codes_all.xlsx		www.w3.org/					1.0											
response_codes_all.xlsx			TR/				1.0											
response_codes_all.xlsx				2007/			1.0											
response_codes_all.xlsx					WD-html-design-principles-20071126/		1.0	http://www.w3.org/TR/2007/WD-html-design-principles-20071126/	Indexable									
response_codes_all.xlsx		placehold.it/					1.0											
response_codes_all.xlsx			750x300				0.0	http://placehold.it/750x300	Indexable									
response_codes_all.xlsx		nand2tetris.org/					1.0	http://nand2tetris.org/	Non-Indexable	Redirected								
response_codes_all.xlsx		www.joelonsoftware.com/					1.0											
response_codes_all.xlsx			articles/				1.0											
response_codes_all.xlsx				Unicode.html			0.0	http://www.joelonsoftware.com/articles/Unicode.html	Non-Indexable	Redirected								
response_codes_all.xlsx		www.paulgraham.com/					1.0											
response_codes_all.xlsx			web20.html				0.0	http://www.paulgraham.com/web20.html	Indexable									
response_codes_all.xlsx		www.wireshark.org/					1.0	http://www.wireshark.org/	Non-Indexable	Redirected								
response_codes_all.xlsx		lwn.net/					1.0											
response_codes_all.xlsx			Articles/				1.0											
response_codes_all.xlsx				250967/			1.0	http://lwn.net/Articles/250967/	Non-Indexable	Redirected								
response_codes_all.xlsx		www.learnprolognow.org/					1.0	http://www.learnprolognow.org/	Indexable									
response_codes_all.xlsx		www.ericsink.com/					1.0											
response_codes_all.xlsx			vcbe/				1.0	http://www.ericsink.com/vcbe/	Non-Indexable	Redirected								
response_codes_all.xlsx		learnyouahaskell.com/					1.0	http://learnyouahaskell.com/	Indexable									
response_codes_all.xlsx		kti.ms.mff.cuni.cz/					1.0											
response_codes_all.xlsx			~bartak/				1.0											
response_codes_all.xlsx				prolog/			1.0											
response_codes_all.xlsx					contents.html		0.0	http://kti.ms.mff.cuni.cz/~bartak/prolog/contents.html	Indexable									
response_codes_all.xlsx		www.craigslistjoe.com/					1.0	http://www.craigslistjoe.com/	Indexable									
response_codes_all.xlsx		craigconnects.org/					1.0	http://craigconnects.org/	Non-Indexable	Redirected								
response_codes_all.xlsx		blog.craigslist.org/					1.0	http://blog.craigslist.org/	Indexable									
search_console_all.xlsx	https/						83.0											
search_console_all.xlsx		bryan-lrlhj.ondigitalocean.app/					83.0											
search_console_all.xlsx			PUBLIC/				78.0											
search_console_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
search_console_all.xlsx				other-pages/			74.0											
search_console_all.xlsx					weeks/		62.0											
search_console_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
search_console_all.xlsx						week-24.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-15.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-23.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-16.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
search_console_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
search_console_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
search_console_all.xlsx						week-18.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-21.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-13.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-20.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-19.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
search_console_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
search_console_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
search_console_all.xlsx						week-17.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
search_console_all.xlsx						solution/	1.0											
search_console_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
search_console_all.xlsx						week-9/	21.0											
search_console_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
search_console_all.xlsx						week-22.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html	Non-Indexable	Client Error								
search_console_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
search_console_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
search_console_all.xlsx						week-14.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html	Non-Indexable	Client Error								
search_console_all.xlsx						images/	5.0											
search_console_all.xlsx						0-quiz/	5.0											
search_console_all.xlsx						week-10/	2.0											
search_console_all.xlsx						ajax.svg	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/ajax.svg	Non-Indexable	Client Error								
search_console_all.xlsx						week-8/	1.0											
search_console_all.xlsx						week-5connect-4index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html	Non-Indexable	Client Error								
search_console_all.xlsx						index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html	Non-Indexable	Client Error								
search_console_all.xlsx					blog-posts/		12.0											
search_console_all.xlsx						best-prac-extension-guide/	2.0											
search_console_all.xlsx						9-thigs-you-should-know-about/	2.0											
search_console_all.xlsx						blog/	7.0											
search_console_all.xlsx						0-projects/	1.0											
search_console_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
search_console_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
search_console_all.xlsx				upload/			1.0											
search_console_all.xlsx					course_01.pgj		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj	Non-Indexable	Client Error								
search_console_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
search_console_all.xlsx			other-pages/				1.0											
search_console_all.xlsx				blog-post			0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post	Non-Indexable	Client Error								
search_console_all.xlsx			Overflow/				1.0											
search_console_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
search_console_all.xlsx			drawio-master/				1.0											
search_console_all.xlsx				src/			1.0											
search_console_all.xlsx					main/		1.0											
search_console_all.xlsx						webapp/	1.0											
search_console_all.xlsx			cdn-cgi/				1.0											
search_console_all.xlsx				l/			1.0											
search_console_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
Site-Crawl.xlsx							0.0	https://www.pinterest.com/bryanguner										
Site-Crawl.xlsx							0.0	"https://fonts.googleapis.com/css?family=Roboto:300	400	400i	500	700	900"					
Site-Crawl.xlsx							0.0	"https://fonts.googleapis.com/css?family=Droid+Serif:400	400i	700	700i"							
Site-Crawl.xlsx							0.0	https://www.linkedin.com/in/bryan-guner-046199128/										
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0	https://www.dropbox.com/static/api/2/dropins.js										
Site-Crawl.xlsx							0.0	https://drive.google.com/embeddedfolderview?id=1EfCng5gOQnftOM-4VESCBLbY4JgT2RVm										
Site-Crawl.xlsx							0.0	https://mail.google.com/mail/u/0/h/										
Site-Crawl.xlsx							0.0	https://www.youtube-nocookie.com/embed/LiouJsnYytI										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/1118008189/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
Site-Crawl.xlsx							0.0	https://node-postgres.com/features/queries										
Site-Crawl.xlsx							0.0	https://quizlet.com/535158481/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://quizlet.com/519020363/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0131411551/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	http://www.twitter.com/mattmight										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0521675995/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units										
Site-Crawl.xlsx							0.0	https://github.com/bgoonz										
Site-Crawl.xlsx							0.0	http://mitpress.mit.edu/sicp/full-text/book/book.html										
Site-Crawl.xlsx							0.0	https://use.fontawesome.com/releases/v5.0.12/css/all.css										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/CSS										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-recursive-view/										
Site-Crawl.xlsx							0.0	https://www.npmjs.com/package/sequelize-cli										
Site-Crawl.xlsx							0.0	https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements										
Site-Crawl.xlsx							0.0	https://github.com/appacademy-starters/sql-orm-recipe-box										
Site-Crawl.xlsx							0.0	http://www.postgresqltutorial.com/postgresql-data-types/										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/1491949856/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeA										
Site-Crawl.xlsx							0.0	https://github.com/appacademy-starters/sql-database-management-starter										
Site-Crawl.xlsx							0.0	https://repl.it/@bgoonz/week-10-take-2?lite=true										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-insert/										
Site-Crawl.xlsx							0.0	https://www.postgresql.org/docs/9.6/sql-select.html										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0262631814/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.4.0/build/highlight.min.js										
Site-Crawl.xlsx							0.0	https://sequelize.org/master/class/lib/query-interface.js~QueryInterface.html										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0262033844/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	http://www.postgresqltutorial.com/postgresql-boolean/										
Site-Crawl.xlsx							0.0	https://www.postgresql.org/docs/current/datatype.html										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-drop-database/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-show-tables/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-show-databases/										
Site-Crawl.xlsx							0.0	http://minikanren.org/										
Site-Crawl.xlsx							0.0	https://www.postgresql.org/docs/current/sql-createuser.html										
Site-Crawl.xlsx							0.0	http://matt.might.net/articles/how-to-make-your-own-cat-5-ethernet-cable/										
Site-Crawl.xlsx							0.0	http://www.w3.org/TR/2007/WD-html-design-principles-20071126/										
Site-Crawl.xlsx							0.0	https://www.abeautifulsite.net/what-are-favicons										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/managing-postgresql-views/										
Site-Crawl.xlsx							0.0	https://sqlzoo.net/wiki/SELECT_Reference										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/4871878309/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://quizlet.com/523948576/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://brentmarquez.com/wp-content/uploads/2018/03/regularexpressions.png										
Site-Crawl.xlsx							0.0	https://www.postgresql.org/docs/9.6/datatype-numeric.html										
Site-Crawl.xlsx							0.0	https://quizlet.com/529967382/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-roles/										
Site-Crawl.xlsx							0.0	https://www.producthunt.com/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-create-database/										
Site-Crawl.xlsx							0.0	https://miro.medium.com/max/1350/1*EB8wVXdkvp7vlnd0iTWNZg.jpeg										
Site-Crawl.xlsx							0.0	http://placehold.it/750x300										
Site-Crawl.xlsx							0.0	https://goo.gl/maps/SQ7cyCbGAQn5vxiH6										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-drop-table/										
Site-Crawl.xlsx							0.0	https://sequelize.org/v5/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-in/										
Site-Crawl.xlsx							0.0	https://www.w3.org/TR/2007/WD-html-design-principles-20071126/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-rename-table/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0596514980/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0961392142/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0321751043/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0201530821/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	http://matt.might.net/articles/implementation-of-rsa-public-key-cryptography-algorithm-in-scheme-dia										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-limit/										
Site-Crawl.xlsx							0.0	https://sequelize.org/v5/manual/querying.html										
Site-Crawl.xlsx							0.0	https://quizlet.com/526773066/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-natural-join/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0123744938/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	http://nand2tetris.org/										
Site-Crawl.xlsx							0.0	https://en.wikipedia.org/wiki/Three-valued_logic										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-full-outer-join/										
Site-Crawl.xlsx							0.0	https://www.postgresql.org/										
Site-Crawl.xlsx							0.0	https://fonts.google.com/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-materialized-views/										
Site-Crawl.xlsx							0.0	https://quizlet.com/519738486/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0981531644/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify										
Site-Crawl.xlsx							0.0	https://sequelize.org/v5/manual/models-definition.html										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/CSS/background-size										
Site-Crawl.xlsx							0.0	https://www.essentialsql.com/get-ready-to-learn-sql-server-20-using-subqueries-in-the-select-stateme										
Site-Crawl.xlsx							0.0	https://github.com/Paxa/postbird/releases										
Site-Crawl.xlsx							0.0	http://www.joelonsoftware.com/articles/Unicode.html										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-rename-column/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0521545668/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-left-join/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0201734842/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.4.0/build/styles/default.min.css										
Site-Crawl.xlsx							0.0	https://github.com/Paxa/postbird/issues/16										
Site-Crawl.xlsx							0.0	https://www.enterprisedb.com/downloads/postgres-postgresql-downloads										
Site-Crawl.xlsx							0.0	https://sequelize.org/v5/class/lib/errors/validation-error.js~ValidationErrorItem.html										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-except/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/159327288X/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://sequelize.org/v5/class/lib/errors/validation-error.js~ValidationError.html										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/032157351X/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0596805527/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
Site-Crawl.xlsx							0.0	http://www.paulgraham.com/web20.html										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/052156543X/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://player.vimeo.com/video/380193367										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-add-column/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-delete/										
Site-Crawl.xlsx							0.0	https://sequelize.org/master/manual/hooks.html										
Site-Crawl.xlsx							0.0	http://www.wireshark.org/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0534950973/ref=as_li_ss_tl?ie=UTF8&tag=aboutmatthewm-20&linkCode=as										
Site-Crawl.xlsx							0.0	https://www.toptal.com/designers/web/interview-questions										
Site-Crawl.xlsx							0.0	https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-SQL/assets/spreadsheet-puppies-with										
Site-Crawl.xlsx							0.0	https://blog.designcrowd.com/article/867/understanding-the-hierarchy-of-text										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-between/										
Site-Crawl.xlsx							0.0	https://mycdn.com/prism@v1.x/themes/prism.css										
Site-Crawl.xlsx							0.0	https://webaim.org/resources/contrastchecker/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-create-table/										
Site-Crawl.xlsx							0.0	https://repl.it/@bgoonz/a-A-Student-Resources-Website-Prototype?lite=true										
Site-Crawl.xlsx							0.0	http://lwn.net/Articles/250967/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-temporary-table/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-drop-column/										
Site-Crawl.xlsx							0.0	http://matt.might.net/articles/c++-template-meta-programming-with-lambda-calculus/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0201657880/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0470474246/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://sequelize.org/v5/manual/data-types.html										
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0	https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAkADq7R0xf6ami9YirAM1N-yl7hdnYBhM										
Site-Crawl.xlsx							0.0	http://www.learnprolognow.org/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-alias/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-like/										
Site-Crawl.xlsx							0.0	https://quizlet.com/532646422/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-views/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-cross-join/										
Site-Crawl.xlsx							0.0	https://sequelize.org/master/manual/validations-and-constraints.html										
Site-Crawl.xlsx							0.0	https://pugjs.org/										
Site-Crawl.xlsx							0.0	http://www.ericsink.com/vcbe/										
Site-Crawl.xlsx							0.0	https://www.node-postgres.com/										
Site-Crawl.xlsx							0.0	https://www.essentialsql.com/what-is-the-difference-between-a-join-and-subquery/										
Site-Crawl.xlsx							0.0	https://www.npmjs.com/package/sequelize										
Site-Crawl.xlsx							0.0	http://learnyouahaskell.com/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-having/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-inner-join/										
Site-Crawl.xlsx							0.0	https://99designs.com/blog/tips/the-7-step-guide-to-understanding-color-theory/										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0201700735/ref=as_li_ss_tl?ie=UTF8&tag=ucmbread-20&linkCode=as2&cam										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-update/										
Site-Crawl.xlsx							0.0	http://kti.ms.mff.cuni.cz/~bartak/prolog/contents.html										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0470068523/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
Site-Crawl.xlsx							0.0	https://quizlet.com/521578337/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-group-by/										
Site-Crawl.xlsx							0.0	https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-round/										
Site-Crawl.xlsx							0.0	https://www.expressjs.com/										
Site-Crawl.xlsx							0.0	https://emmet.io/i/logo-large.png										
Site-Crawl.xlsx							0.0	http://www.amazon.com/gp/product/0262033844/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creati										
Site-Crawl.xlsx							0.0	http://www.postgresqltutorial.com/postgresql-explain/										
Site-Crawl.xlsx							0.0	https://github.com/appacademy-starters/sql-select-exercises-starter										
Site-Crawl.xlsx							0.0	https://quizlet.com/522292469/match/embed?x=1jj1										
Site-Crawl.xlsx							0.0	https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-stored-procedures/										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-primary-key/										
Site-Crawl.xlsx							0.0	https://sequelize.org/master/class/lib/model.js~Model.html										
Site-Crawl.xlsx							0.0	https://res.cloudinary.com/ddlt2cjne/image/upload/v1514361209/promotion-image_nwtphh.jpg										
Site-Crawl.xlsx							0.0	https://www.postgresqltutorial.com/postgresql-union/										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/politics/search/pol										
Site-Crawl.xlsx							0.0	https://github.com/appacademy-starters/sql-recipe-box										
Site-Crawl.xlsx							0.0	https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=575										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=2012										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/terms.of.use.en-us										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=3232										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/antiques/search/ata										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-12										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/all-housing-wanted/search/hsw										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-13										
Site-Crawl.xlsx							0.0	http://www.craigslistjoe.com/										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-14										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-15										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/childcare/search/kid										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-16										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-17										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=5500										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/appliances/search/ppa										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=1040										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=2007										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events/search/eve										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/barter/search/bar										
Site-Crawl.xlsx							0.0	https://code.jquery.com/jquery-2.2.4.min.js										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/wanted%3A-room-share/search/sha										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/cell-phones/search/moa										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/health-and-beauty/search/haa										
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/musicians/search/muc										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=130										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/atvs%2C-utvs%2C-snowmobiles/search/sna										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/marine-services/search/mas										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-01										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-02										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-03										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-05										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-04										
Site-Crawl.xlsx							0.0	https://post.craigslist.org/c/aus										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/sublets-temporary/search/sub										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-06										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-07										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-08										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=122										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=99										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-09										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/household-services/search/hss										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/event-services/search/evs										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=98										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/cycle-services/search/cys										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/real-estate-services/search/rts										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/safety										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/farm-garden-services/search/fgs										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/rants-raves/search/rnr										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-10										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/rooms-shares/search/roo										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-11-11										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/pet-services/search/pas										
Site-Crawl.xlsx							0.0	https://www.youtube.com/user/craigslist										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/computer-services/search/cps										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/business/search/bfa										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/bicycle-parts/search/bip										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-31										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-30										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/skilled-trade-services/search/sks										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/privacy.policy										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=1991										
Site-Crawl.xlsx							0.0	https://accounts.craigslist.org/login/home										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/lessons-tutoring/search/lss										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/travel-vacation-services/search/trv										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-28										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-29										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-27										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-25										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-26										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/events-classes/search/eee?sale_date=2019-10-24										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/help/										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/labor-hauling-moving/search/lbs										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=64										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=73										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=1564										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=71										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/activity-partners/search/act										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=59										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/arts-crafts/search/ara										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=53										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=54										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/artists/search/ats										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/scams										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/aviation/search/ava										
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/parking-storage/search/prk										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/cl_app_beta										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=88										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=95										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=96										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=93										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/craigslist_is_hiring										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/open_source										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/for-sale/search/sss										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=79										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=78										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=76										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=85										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/classes/search/cls										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=2400										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/volunteers/search/vol										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/creative-services/search/crs										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=81										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/groups/search/grp										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/cell-phone-mobile-services/search/cms										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/auto-parts/search/pta										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/boat-parts-accessories/search/bpa										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=28										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/missed-connections/search/mis										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=29										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/vacation-rentals/search/vac										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=5178										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=26										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/apts-housing-for-rent/search/apa										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=27										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=24										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=22										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=20										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/office-commercial/search/off										
Site-Crawl.xlsx							0.0	http://craigconnects.org/										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/writing-editing-translation/search/wet										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=1926										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/pets/search/pet										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/cars-trucks/search/cta										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/beauty-services/search/bts										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/local-news-and-views/search/vnn										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=7000										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/sites										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/community/search/ccc										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=5										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=4										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=16										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/boats/search/boo										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/housing/search/hhh										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=9										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=8										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=12										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=7										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=6										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=1257										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/bicycles/search/bia										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/automotive-services/search/aos										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/books-magazines/search/bka										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/general-community/search/com										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/small-biz-ads/search/biz										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/real-estate/search/rea										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=49										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/financial-services/search/fns										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/rideshare/search/rid										
Site-Crawl.xlsx							0.0	http://blog.craigslist.org/										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=47										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=42										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/help/system-status										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/cds-dvds-vhs/search/ema										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=39										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/services/search/bbb										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=34										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=32										
Site-Crawl.xlsx							0.0	https://forums.craigslist.org/?areaID=15&forumID=41										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/legal-services/search/lgs										
Site-Crawl.xlsx							0.0	https://www.craigslist.org/about/best/all/										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/lost-found/search/laf										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/housing-swap/search/swp										
Site-Crawl.xlsx							0.0	https://austin.craigslist.org/d/baby-kid-stuff/search/baa										
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
Site-Crawl.xlsx							0.0											
sitemaps_all.xlsx	https/						108.0											
url_all.xlsx				js/			7.0											
sitemaps_all.xlsx		bryan-lrlhj.ondigitalocean.app/					108.0											
sitemaps_all.xlsx			PUBLIC/				103.0											
sitemaps_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
sitemaps_all.xlsx				other-pages/			96.0											
sitemaps_all.xlsx					weeks/		78.0											
sitemaps_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
sitemaps_all.xlsx						week-24.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-15.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-23.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-16.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
sitemaps_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
sitemaps_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
sitemaps_all.xlsx						week-18.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-21.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-13.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-20.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-19.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
sitemaps_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
sitemaps_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
sitemaps_all.xlsx						week-17.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
sitemaps_all.xlsx						solution/	1.0											
sitemaps_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
sitemaps_all.xlsx						week-9/	21.0											
sitemaps_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
sitemaps_all.xlsx						week-22.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
sitemaps_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
sitemaps_all.xlsx						week-14.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						images/	19.0											
sitemaps_all.xlsx						pseudo-elements.png	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/pseudo-elements.png	Non-Indexable	Client Error								
sitemaps_all.xlsx						0-quiz/	6.0											
sitemaps_all.xlsx						week-10/	2.0											
sitemaps_all.xlsx						ajax.svg	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/ajax.svg	Non-Indexable	Client Error								
sitemaps_all.xlsx						week-8/	1.0											
sitemaps_all.xlsx						week-5connect-4index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html	Non-Indexable	Client Error								
sitemaps_all.xlsx						index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html	Non-Indexable	Client Error								
sitemaps_all.xlsx					blog-posts/		18.0											
sitemaps_all.xlsx						best-prac-extension-guide/	3.0											
sitemaps_all.xlsx						9-thigs-you-should-know-about/	3.0											
sitemaps_all.xlsx						blog/	11.0											
sitemaps_all.xlsx						0-projects/	1.0											
sitemaps_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
sitemaps_all.xlsx				upload/			3.0											
sitemaps_all.xlsx					course_01.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.jpg	Non-Indexable	Client Error								
sitemaps_all.xlsx					course_04.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_04.jpg	Non-Indexable	Client Error								
sitemaps_all.xlsx					course_01.pgj		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj	Non-Indexable	Client Error								
sitemaps_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
sitemaps_all.xlsx				images/			1.0											
sitemaps_all.xlsx					apple-touch-icon.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/apple-touch-icon.png	Non-Indexable	Client Error								
sitemaps_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
sitemaps_all.xlsx			other-pages/				1.0											
sitemaps_all.xlsx				blog-post			0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post	Non-Indexable	Client Error								
sitemaps_all.xlsx			Overflow/				1.0											
sitemaps_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
sitemaps_all.xlsx			drawio-master/				1.0											
sitemaps_all.xlsx				src/			1.0											
sitemaps_all.xlsx					main/		1.0											
sitemaps_all.xlsx						webapp/	1.0											
sitemaps_all.xlsx			cdn-cgi/				1.0											
sitemaps_all.xlsx				l/			1.0											
sitemaps_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
url_all.xlsx	https/						165.0											
url_all.xlsx		bryan-lrlhj.ondigitalocean.app/					165.0											
url_all.xlsx			PUBLIC/				159.0											
url_all.xlsx				index.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/index.html	Indexable									
url_all.xlsx				css/			5.0											
url_all.xlsx					bootstrap.min.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/bootstrap.min.css	Indexable									
url_all.xlsx					font-awesome.min.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/font-awesome.min.css	Indexable									
url_all.xlsx					carousel.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/carousel.css	Indexable									
url_all.xlsx					animate.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/animate.css	Indexable									
url_all.xlsx					bootstrap.css		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/css/bootstrap.css	Indexable									
url_all.xlsx				other-pages/			133.0											
url_all.xlsx					weeks/		102.0											
url_all.xlsx						week-4.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-4.html	Indexable									
url_all.xlsx						week-24.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-24.html	Non-Indexable	Client Error								
url_all.xlsx						week-15.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-15.html	Non-Indexable	Client Error								
url_all.xlsx						week-23.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-23.html	Non-Indexable	Client Error								
url_all.xlsx						week-16.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-16.html	Non-Indexable	Client Error								
url_all.xlsx						week-5.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5.html	Indexable									
url_all.xlsx						solution/	2.0											
url_all.xlsx						week-2.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-2.html	Indexable									
url_all.xlsx						week-7.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-7.html	Indexable									
url_all.xlsx						week-18.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-18.html	Non-Indexable	Client Error								
url_all.xlsx						week-21.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-21.html	Non-Indexable	Client Error								
url_all.xlsx						week-13.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-13.html	Non-Indexable	Client Error								
url_all.xlsx						week-20.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-20.html	Non-Indexable	Client Error								
url_all.xlsx						week-19.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-19.html	Non-Indexable	Client Error								
url_all.xlsx						week-12.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-12.html	Indexable									
url_all.xlsx						week-8.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-8.html	Indexable									
url_all.xlsx						week-1.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-1.html	Indexable									
url_all.xlsx						week-17.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-17.html	Non-Indexable	Client Error								
url_all.xlsx						week-11.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-11.html	Indexable									
url_all.xlsx						week-10.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-10.html	Indexable									
url_all.xlsx						week-9/	29.0											
url_all.xlsx						week-9.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-9.html	Indexable									
url_all.xlsx						week-22.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-22.html	Non-Indexable	Client Error								
url_all.xlsx						week-3.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-3.html	Indexable									
url_all.xlsx						week-6.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-6.html	Indexable									
url_all.xlsx						Images/	8.0											
url_all.xlsx						week-14.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-14.html	Non-Indexable	Client Error								
url_all.xlsx						images/	19.0											
url_all.xlsx						pseudo-elements.png	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/pseudo-elements.png	Non-Indexable	Client Error								
url_all.xlsx						0-quiz/	11.0											
url_all.xlsx						prism.js	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/prism.js	Indexable									
url_all.xlsx						week-10/	2.0											
url_all.xlsx						ajax.svg	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/ajax.svg	Non-Indexable	Client Error								
url_all.xlsx						style.css	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/style.css	Indexable									
url_all.xlsx						week-8/	1.0											
url_all.xlsx						week-5connect-4index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/week-5connect-4index.html	Non-Indexable	Client Error								
url_all.xlsx						index.html	0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/other-pages/weeks/index.html	Non-Indexable	Client Error								
url_all.xlsx					blog-posts/		31.0											
url_all.xlsx						best-prac-extension-guide/	7.0											
url_all.xlsx						9-thigs-you-should-know-about/	4.0											
url_all.xlsx						blog/	19.0											
url_all.xlsx						0-projects/	1.0											
url_all.xlsx				blog.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/blog.html	Indexable									
url_all.xlsx					bootstrap.min.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/bootstrap.min.js	Indexable									
url_all.xlsx					jquery.min.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/jquery.min.js	Indexable									
url_all.xlsx					carousel.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/carousel.js	Indexable									
url_all.xlsx					custom.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/custom.js	Indexable									
url_all.xlsx					videobg.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/videobg.js	Indexable									
url_all.xlsx					animate.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/animate.js	Indexable									
url_all.xlsx					map.js		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/js/map.js	Indexable									
url_all.xlsx				images/			4.0											
url_all.xlsx					loader.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/loader.gif	Indexable									
url_all.xlsx					fullstack.PNG		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/fullstack.PNG	Indexable									
url_all.xlsx					logo.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/logo.png	Indexable									
url_all.xlsx					apple-touch-icon.png		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/images/apple-touch-icon.png	Non-Indexable	Client Error								
url_all.xlsx				upload/			5.0											
url_all.xlsx					course_01.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.jpg	Non-Indexable	Client Error								
url_all.xlsx					course_04.jpg		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_04.jpg	Non-Indexable	Client Error								
url_all.xlsx					best-prac-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/best-prac-250.gif	Indexable									
url_all.xlsx					course_01.pgj		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/course_01.pgj	Non-Indexable	Client Error								
url_all.xlsx					matrix-250.gif		0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/upload/matrix-250.gif	Indexable									
url_all.xlsx				youtube.js			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/youtube.js	Indexable									
url_all.xlsx				page-contact.html			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/page-contact.html	Indexable									
url_all.xlsx				style.css			0.0	https://bryan-lrlhj.ondigitalocean.app/PUBLIC/style.css	Indexable									
url_all.xlsx			index.html				0.0	https://bryan-lrlhj.ondigitalocean.app/index.html	Indexable									
url_all.xlsx			cdn-cgi/				2.0											
url_all.xlsx				scripts/			1.0											
url_all.xlsx					5c5dd728/		1.0											
url_all.xlsx						cloudflare-static/	1.0											
url_all.xlsx				l/			1.0											
url_all.xlsx					email-protection		0.0	https://bryan-lrlhj.ondigitalocean.app/cdn-cgi/l/email-protection	Non-Indexable	noindex								
url_all.xlsx			other-pages/				1.0											
url_all.xlsx				blog-post			0.0	https://bryan-lrlhj.ondigitalocean.app/other-pages/blog-post	Non-Indexable	Client Error								
url_all.xlsx			Overflow/				1.0											
url_all.xlsx				overview.pdf			0.0	https://bryan-lrlhj.ondigitalocean.app/Overflow/overview.pdf	Indexable									
url_all.xlsx			drawio-master/				1.0											
url_all.xlsx				src/			1.0											
url_all.xlsx					main/		1.0											
url_all.xlsx						webapp/	1.0											
\.


--
-- PostgreSQL database dump complete
--

