if exists (select * from sysobjects where id = object_id(N'[dbo].[DeleteUser]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[DeleteUser]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[InsertUser]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[InsertUser]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectUserByEmail]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectUserByEmail]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[SelectUserByPrimaryKey]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[SelectUserByPrimaryKey]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[UpdateUser]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[UpdateUser]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[User]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[User]
GO

CREATE TABLE [dbo].[User] (
	[Username] [varchar] (50) NOT NULL ,
	[Password] [varchar] (50) NOT NULL ,
	[Email] [varchar] (50) NOT NULL ,
	[Eformat] [smallint] NOT NULL ,
	[Frequency] [smallint] NOT NULL ,
	[Keywords] [varchar] (500) NULL ,
	[WhenRegistered] [datetime] NOT NULL ,
	[LastVisit] [datetime] NULL 
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[User] WITH NOCHECK ADD 
	CONSTRAINT [PK_User] PRIMARY KEY  NONCLUSTERED 
	(
		[Username],
		[Password]
	)  ON [PRIMARY] ,
	CONSTRAINT [IX_Email] UNIQUE  NONCLUSTERED 
	(
		[Email]
	)  ON [PRIMARY] 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.DeleteUser
(
	@Original_Password varchar(50),
	@Original_Username varchar(50),
	@Original_Eformat smallint,
	@Original_Email varchar(50),
	@Original_Frequency smallint,
	@Original_Keywords varchar(500),
	@Original_LastVisit datetime,
	@Original_WhenRegistered datetime
)
AS
	SET NOCOUNT OFF;
DELETE FROM [User] WHERE (Password = @Original_Password) AND (Username = @Original_Username) AND (Eformat = @Original_Eformat) AND (Email = @Original_Email) AND (Frequency = @Original_Frequency) AND (Keywords = @Original_Keywords OR @Original_Keywords IS NULL AND Keywords IS NULL) AND (LastVisit = @Original_LastVisit OR @Original_LastVisit IS NULL AND LastVisit IS NULL) AND (WhenRegistered = @Original_WhenRegistered)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.InsertUser
(
	@Username varchar(50),
	@Password varchar(50),
	@Email varchar(50),
	@Eformat smallint,
	@Frequency smallint,
	@Keywords varchar(500),
	@WhenRegistered datetime,
	@LastVisit datetime
)
AS
	SET NOCOUNT OFF;
INSERT INTO [User] (Username, Password, Email, Eformat, Frequency, Keywords, WhenRegistered, LastVisit) VALUES (@Username, @Password, @Email, @Eformat, @Frequency, @Keywords, @WhenRegistered, @LastVisit);
	SELECT Username, Password, Email, Eformat, Frequency, Keywords, WhenRegistered, LastVisit FROM [User] WHERE (Password = @Password) AND (Username = @Username)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectUserByEmail
(
	@Email varchar(50)
)
AS
	SET NOCOUNT ON;
SELECT Username, Password, Email, Eformat, Frequency, Keywords, WhenRegistered, LastVisit FROM [User] WHERE (Email = @Email)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.SelectUserByPrimaryKey
(
	@Username varchar(50),
	@Password varchar(50)
)
AS
	SET NOCOUNT ON;
SELECT Username, Password, Email, Eformat, Frequency, Keywords, WhenRegistered, LastVisit FROM [User] WHERE (Username = @Username) AND (Password = @Password)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.UpdateUser
(
	@Param1 varchar(50),
	@Param2 varchar(50),
	@Email varchar(50),
	@Eformat smallint,
	@Frequency smallint,
	@Keywords varchar(500),
	@WhenRegistered datetime,
	@LastVisit datetime,
	@Original_Password varchar(50),
	@Original_Username varchar(50),
	@Original_Eformat smallint,
	@Original_Email varchar(50),
	@Original_Frequency smallint,
	@Original_Keywords varchar(500),
	@Original_LastVisit datetime,
	@Original_WhenRegistered datetime,
	@Password varchar(50),
	@Username varchar(50)
)
AS
	SET NOCOUNT OFF;
UPDATE [User] SET Username = @Param1, Password = @Param2, Email = @Email, Eformat = @Eformat, Frequency = @Frequency, Keywords = @Keywords, WhenRegistered = @WhenRegistered, LastVisit = @LastVisit WHERE (Password = @Original_Password) AND (Username = @Original_Username) AND (Eformat = @Original_Eformat) AND (Email = @Original_Email) AND (Frequency = @Original_Frequency) AND (Keywords = @Original_Keywords OR @Original_Keywords IS NULL AND Keywords IS NULL) AND (LastVisit = @Original_LastVisit OR @Original_LastVisit IS NULL AND LastVisit IS NULL) AND (WhenRegistered = @Original_WhenRegistered);
	SELECT Username, Password, Email, Eformat, Frequency, Keywords, WhenRegistered, LastVisit FROM [User] WHERE (Password = @Password) AND (Username = @Username)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

