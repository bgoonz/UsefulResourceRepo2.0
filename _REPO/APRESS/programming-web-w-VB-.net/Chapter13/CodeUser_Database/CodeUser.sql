if exists (select * from sysobjects where id = object_id(N'[dbo].[NewDeleteCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[NewDeleteCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[NewInsertCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[NewInsertCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[NewSelectCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[NewSelectCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[NewUpdateCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[NewUpdateCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Visitor]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Visitor]
GO

CREATE TABLE [dbo].[Visitor] (
	[Password] [char] (6) NOT NULL ,
	[Username] [varchar] (50) NOT NULL ,
	[Email] [varchar] (50) NOT NULL 
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Visitor] WITH NOCHECK ADD 
	CONSTRAINT [PK_Visitor] PRIMARY KEY  NONCLUSTERED 
	(
		[Password]
	)  ON [PRIMARY] 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.NewDeleteCommand
(
	@Original_Password char(6),
	@Original_Email varchar(50),
	@Original_Username varchar(50)
)
AS
	SET NOCOUNT OFF;
DELETE FROM Visitor WHERE (Password = @Original_Password) AND (Email = @Original_Email) AND (Username = @Original_Username)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.NewInsertCommand
(
	@Password char(6),
	@Username varchar(50),
	@Email varchar(50)
)
AS
	SET NOCOUNT OFF;
INSERT INTO Visitor(Password, Username, Email) VALUES (@Password, @Username, @Email);
	SELECT Password, Username, Email FROM Visitor WHERE (Password = @Password)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.NewSelectCommand
(
	@Password char(6)
)
AS
	SET NOCOUNT ON;
SELECT Password, Username, Email FROM Visitor WHERE (Password = @Password)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.NewUpdateCommand
(
	@Param1 char(6),
	@Username varchar(50),
	@Email varchar(50),
	@Original_Password char(6),
	@Original_Email varchar(50),
	@Original_Username varchar(50),
	@Password char(6)
)
AS
	SET NOCOUNT OFF;
UPDATE Visitor SET Password = @Param1, Username = @Username, Email = @Email WHERE (Password = @Original_Password) AND (Email = @Original_Email) AND (Username = @Original_Username);
	SELECT Password, Username, Email FROM Visitor WHERE (Password = @Password)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

