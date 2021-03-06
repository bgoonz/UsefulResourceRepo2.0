ALTER TABLE [dbo].[Description] DROP CONSTRAINT FK_Description_Example
GO

ALTER TABLE [dbo].[KeywordExample] DROP CONSTRAINT FK_KeywordExample_Example
GO

ALTER TABLE [dbo].[KeywordExample] DROP CONSTRAINT FK_KeywordExample_Keyword
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Browse]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[Browse]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[BrowseAll]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[BrowseAll]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[DeleteDescription]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[DeleteDescription]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[DeleteExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[DeleteExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[DeleteKeyword]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[DeleteKeyword]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[DeleteKeywordExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[DeleteKeywordExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[InsertDescription]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[InsertDescription]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[InsertExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[InsertExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[InsertKeyword]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[InsertKeyword]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[InsertKeywordExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[InsertKeywordExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectDescription]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectDescription]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectDescriptionByCulture]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectDescriptionByCulture]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectDescriptionByID]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectDescriptionByID]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectExampleAndDescription]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectExampleAndDescription]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectExampleByID]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectExampleByID]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectKeyword]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectKeyword]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectKeywordExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectKeywordExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectKeywordExampleByID]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectKeywordExampleByID]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectKeywordsForExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectKeywordsForExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectNewExamples]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectNewExamples]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[UpdateDescription]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[UpdateDescription]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[UpdateExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[UpdateExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[UpdateKeyword]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[UpdateKeyword]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[UpdateKeywordExample]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[UpdateKeywordExample]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Description]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Description]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Example]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Example]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Keyword]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Keyword]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[KeywordExample]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[KeywordExample]
GO

CREATE TABLE [dbo].[Description] (
	[ID] [int] NOT NULL ,
	[Culture] [varchar] (5) NOT NULL ,
	[Text] [varchar] (500) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Example] (
	[ID] [int] IDENTITY (1, 1) NOT NULL ,
	[WhenAdded] [datetime] NULL ,
	[Code] [varchar] (8000) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Keyword] (
	[Word] [varchar] (50) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[KeywordExample] (
	[Word] [varchar] (50) NOT NULL ,
	[ID] [int] NOT NULL 
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Description] WITH NOCHECK ADD 
	CONSTRAINT [PK_Description] PRIMARY KEY  NONCLUSTERED 
	(
		[ID],
		[Culture]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Example] WITH NOCHECK ADD 
	CONSTRAINT [PK_Example] PRIMARY KEY  NONCLUSTERED 
	(
		[ID]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Keyword] WITH NOCHECK ADD 
	CONSTRAINT [PK_Keyword] PRIMARY KEY  NONCLUSTERED 
	(
		[Word]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[KeywordExample] WITH NOCHECK ADD 
	CONSTRAINT [PK_KeywordExample] PRIMARY KEY  NONCLUSTERED 
	(
		[Word],
		[ID]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Description] ADD 
	CONSTRAINT [FK_Description_Example] FOREIGN KEY 
	(
		[ID]
	) REFERENCES [dbo].[Example] (
		[ID]
	)
GO

ALTER TABLE [dbo].[KeywordExample] ADD 
	CONSTRAINT [FK_KeywordExample_Example] FOREIGN KEY 
	(
		[ID]
	) REFERENCES [dbo].[Example] (
		[ID]
	),
	CONSTRAINT [FK_KeywordExample_Keyword] FOREIGN KEY 
	(
		[Word]
	) REFERENCES [dbo].[Keyword] (
		[Word]
	)
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.[Browse]
(
	@Keyword varchar(50),
	@Culture varchar(5)
)
AS
	SET NOCOUNT ON;
SELECT KeywordExample.Word, KeywordExample.ID, Example.WhenAdded, Description.Text, Description.Culture, Description.ID AS Expr1, Example.ID AS Expr2 FROM KeywordExample INNER JOIN Example ON KeywordExample.ID = Example.ID INNER JOIN Description ON Example.ID = Description.ID WHERE (KeywordExample.Word = @Keyword) AND (Description.Culture = @Culture) ORDER BY KeywordExample.ID DESC
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.BrowseAll
(
	@Culture varchar(5)
)
AS
	SET NOCOUNT ON;
SELECT Keyword.Word, KeywordExample.ID, Example.WhenAdded, Description.Text, Description.Culture, Description.ID AS Expr1, Example.ID AS Expr2, KeywordExample.Word AS Expr3 FROM KeywordExample INNER JOIN Keyword ON KeywordExample.Word = Keyword.Word INNER JOIN Example ON KeywordExample.ID = Example.ID INNER JOIN Description ON Example.ID = Description.ID WHERE (Description.Culture = @Culture) ORDER BY Keyword.Word, KeywordExample.ID DESC
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.DeleteDescription
(
	@Original_Culture varchar(5),
	@Original_ID int,
	@Original_Text varchar(500)
)
AS
	SET NOCOUNT OFF;
DELETE FROM Description WHERE (Culture = @Original_Culture) AND (ID = @Original_ID) AND (Text = @Original_Text)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.DeleteExample
(
	@Original_ID int,
	@Original_Code varchar(8000),
	@Original_WhenAdded datetime
)
AS
	SET NOCOUNT OFF;
DELETE FROM Example WHERE (ID = @Original_ID) AND (Code = @Original_Code) AND (WhenAdded = @Original_WhenAdded OR @Original_WhenAdded IS NULL AND WhenAdded IS NULL)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.DeleteKeyword
(
	@Original_Word varchar(50)
)
AS
	SET NOCOUNT OFF;
DELETE FROM Keyword WHERE (Word = @Original_Word)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.DeleteKeywordExample
(
	@Original_ID int,
	@Original_Word varchar(50)
)
AS
	SET NOCOUNT OFF;
DELETE FROM KeywordExample WHERE (ID = @Original_ID) AND (Word = @Original_Word)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.InsertDescription
(
	@ID int,
	@Culture varchar(5),
	@Text varchar(500)
)
AS
	SET NOCOUNT OFF;
INSERT INTO Description(ID, Culture, Text) VALUES (@ID, @Culture, @Text);
	SELECT ID, Culture, Text FROM Description WHERE (Culture = @Culture) AND (ID = @ID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.InsertExample
(
	@WhenAdded datetime,
	@Code varchar(8000)
)
AS
	SET NOCOUNT OFF;
INSERT INTO Example(WhenAdded, Code) VALUES (@WhenAdded, @Code);
	SELECT ID, WhenAdded, Code FROM Example WHERE (ID = @@IDENTITY)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.InsertKeyword
(
	@Word varchar(50)
)
AS
	SET NOCOUNT OFF;
INSERT INTO Keyword(Word) VALUES (@Word);
	SELECT Word FROM Keyword WHERE (Word = @Word)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.InsertKeywordExample
(
	@Word varchar(50),
	@ID int
)
AS
	SET NOCOUNT OFF;
INSERT INTO KeywordExample(Word, ID) VALUES (@Word, @ID);
	SELECT Word, ID FROM KeywordExample WHERE (ID = @ID) AND (Word = @Word)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectDescription
AS
	SET NOCOUNT ON;
SELECT ID, Culture, Text FROM Description
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectDescriptionByCulture
(
	@Culture varchar(5)
)
AS
	SET NOCOUNT ON;
SELECT ID, Culture, Text FROM Description WHERE (Culture = @Culture)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectDescriptionByID
(
	@ID int
)
AS
	SET NOCOUNT ON;
SELECT ID, Culture, Text FROM Description WHERE (ID = @ID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectExample
AS
	SET NOCOUNT ON;
SELECT ID, WhenAdded, Code FROM Example
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectExampleAndDescription
(
	@ID int,
	@Culture varchar(5)
)
AS
	SET NOCOUNT ON;
SELECT Description.Text, Example.WhenAdded, Example.Code, Description.Culture, Description.ID, Example.ID AS Expr1 FROM Description INNER JOIN Example ON Description.ID = Example.ID WHERE (Description.ID = @ID) AND (Description.Culture = @Culture)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectExampleByID
(
	@ID int
)
AS
	SET NOCOUNT ON;
SELECT ID, WhenAdded, Code FROM Example WHERE (ID = @ID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectKeyword
AS
	SET NOCOUNT ON;
SELECT Word FROM Keyword
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectKeywordExample
AS
	SET NOCOUNT ON;
SELECT Word, ID FROM KeywordExample
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectKeywordExampleByID
(
	@ID int
)
AS
	SET NOCOUNT ON;
SELECT Word, ID FROM KeywordExample WHERE (ID = @ID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectKeywordsForExample
(
	@ID int
)
AS
	SET NOCOUNT ON;
SELECT Word, ID FROM KeywordExample WHERE (ID = @ID) ORDER BY Word
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectNewExamples
(
	@StartDate datetime,
	@Culture varchar(5)
)
AS
	SET NOCOUNT ON;
SELECT Description.ID, Description.Text, Example.WhenAdded, Description.Culture, Example.ID AS Expr1 FROM Description INNER JOIN Example ON Description.ID = Example.ID WHERE (Example.WhenAdded >= @StartDate) AND (Description.Culture = @Culture) ORDER BY Example.WhenAdded DESC, Description.ID DESC
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.UpdateDescription
(
	@ID int,
	@Culture varchar(5),
	@Text varchar(500),
	@Original_Culture varchar(5),
	@Original_ID int,
	@Original_Text varchar(500)
)
AS
	SET NOCOUNT OFF;
UPDATE Description SET ID = @ID, Culture = @Culture, Text = @Text WHERE (Culture = @Original_Culture) AND (ID = @Original_ID) AND (Text = @Original_Text);
	SELECT ID, Culture, Text FROM Description WHERE (Culture = @Culture) AND (ID = @ID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.UpdateExample
(
	@WhenAdded datetime,
	@Code varchar(8000),
	@Original_ID int,
	@Original_Code varchar(8000),
	@Original_WhenAdded datetime,
	@ID int
)
AS
	SET NOCOUNT OFF;
UPDATE Example SET WhenAdded = @WhenAdded, Code = @Code WHERE (ID = @Original_ID) AND (Code = @Original_Code) AND (WhenAdded = @Original_WhenAdded OR @Original_WhenAdded IS NULL AND WhenAdded IS NULL);
	SELECT ID, WhenAdded, Code FROM Example WHERE (ID = @ID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.UpdateKeyword
(
	@Word varchar(50),
	@Original_Word varchar(50)
)
AS
	SET NOCOUNT OFF;
UPDATE Keyword SET Word = @Word WHERE (Word = @Original_Word);
	SELECT Word FROM Keyword WHERE (Word = @Word)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.UpdateKeywordExample
(
	@Word varchar(50),
	@ID int,
	@Original_ID int,
	@Original_Word varchar(50)
)
AS
	SET NOCOUNT OFF;
UPDATE KeywordExample SET Word = @Word, ID = @ID WHERE (ID = @Original_ID) AND (Word = @Original_Word);
	SELECT Word, ID FROM KeywordExample WHERE (ID = @ID) AND (Word = @Word)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

