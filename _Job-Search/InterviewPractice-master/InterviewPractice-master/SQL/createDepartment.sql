CREATE TABLE DEPARTMENT
(
    DEPT_ID int,
    NAME char(255),
    LOCATION char(255),
    PRIMARY KEY(DEPT_ID)
);

INSERT INTO DEPARTMENT (
    DEPT_ID,
    NAME,
    LOCATION
)
VALUES (
    3,
    'Resources',
    'Cape Town'
);

INSERT INTO DEPARTMENT (
    DEPT_ID,
    NAME,
    LOCATION
)
VALUES (
    4,
    'Technical',
    'Texas'
);

INSERT INTO DEPARTMENT (
    DEPT_ID,
    NAME,
    LOCATION
)
VALUES (
    5,
    'Management',
    'Paris'
);

INSERT INTO DEPARTMENT (
    DEPT_ID,
    NAME,
    LOCATION
)
VALUES (
    2,
    'Production',
    'Sydney'
);

INSERT INTO DEPARTMENT (
    DEPT_ID,
    NAME,
    LOCATION
)
VALUES (
    1,
    'Executive',
    'Sydney'
);