ALTER TABLE [dbo].[Description] DROP CONSTRAINT FK_Description_Example
GO

ALTER TABLE [dbo].[Example_Keyword] DROP CONSTRAINT FK_Example_Keyword_Example
GO

ALTER TABLE [dbo].[Example_Keyword] DROP CONSTRAINT FK_Example_Keyword_Keyword
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Description]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Description]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Example]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Example]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Example_Keyword]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Example_Keyword]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Keyword]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Keyword]
GO

CREATE TABLE [dbo].[Description] (
	[Example_ID] [int] NOT NULL ,
	[Language] [varchar] (5) NOT NULL ,
	[Description_Text] [varchar] (300) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Example] (
	[Example_ID] [int] IDENTITY (1, 1) NOT NULL ,
	[Example_Description] [varchar] (500) NOT NULL ,
	[Example_Code] [varchar] (8000) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Example_Keyword] (
	[Example_ID] [int] NOT NULL ,
	[Word] [varchar] (50) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Keyword] (
	[Word] [varchar] (50) NOT NULL 
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Description] WITH NOCHECK ADD 
	CONSTRAINT [PK_Description] PRIMARY KEY  NONCLUSTERED 
	(
		[Example_ID],
		[Language]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Example] WITH NOCHECK ADD 
	CONSTRAINT [PK_Example] PRIMARY KEY  NONCLUSTERED 
	(
		[Example_ID]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Example_Keyword] WITH NOCHECK ADD 
	CONSTRAINT [PK_Example_Keyword] PRIMARY KEY  NONCLUSTERED 
	(
		[Example_ID],
		[Word]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Keyword] WITH NOCHECK ADD 
	CONSTRAINT [PK_Keyword] PRIMARY KEY  NONCLUSTERED 
	(
		[Word]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Description] ADD 
	CONSTRAINT [FK_Description_Example] FOREIGN KEY 
	(
		[Example_ID]
	) REFERENCES [dbo].[Example] (
		[Example_ID]
	)
GO

ALTER TABLE [dbo].[Example_Keyword] ADD 
	CONSTRAINT [FK_Example_Keyword_Example] FOREIGN KEY 
	(
		[Example_ID]
	) REFERENCES [dbo].[Example] (
		[Example_ID]
	),
	CONSTRAINT [FK_Example_Keyword_Keyword] FOREIGN KEY 
	(
		[Word]
	) REFERENCES [dbo].[Keyword] (
		[Word]
	)
GO

