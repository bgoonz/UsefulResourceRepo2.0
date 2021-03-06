if exists (select * from sysobjects where id = object_id(N'[dbo].[CowDeleteCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[CowDeleteCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[CowInsertCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[CowInsertCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[CowSelectCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[CowSelectCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[CowUpdateCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[CowUpdateCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[MIlkDeleteCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[MIlkDeleteCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[MilkInsertCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[MilkInsertCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[MilkSelectCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[MilkSelectCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[MIlkUpdateCommand]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[MIlkUpdateCommand]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Cow]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Cow]
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[Milk]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[Milk]
GO

CREATE TABLE [dbo].[Cow] (
	[CowID] [int] IDENTITY (1, 1) NOT NULL ,
	[CowName] [varchar] (30) NOT NULL ,
	[CowBirthDate] [datetime] NOT NULL ,
	[CowControlCode] [char] (15) NULL ,
	[CowWeight] [decimal](6, 0) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Milk] (
	[CowID] [int] NOT NULL ,
	[MilkDateTime] [datetime] NOT NULL ,
	[MilkPounds] [decimal](6, 2) NOT NULL 
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Cow] WITH NOCHECK ADD 
	CONSTRAINT [DF_Cow_CowWeight] DEFAULT (0) FOR [CowWeight],
	CONSTRAINT [PK_Cow] PRIMARY KEY  NONCLUSTERED 
	(
		[CowID]
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Milk] WITH NOCHECK ADD 
	CONSTRAINT [DF_Milk_MilkPounds] DEFAULT (0) FOR [MilkPounds],
	CONSTRAINT [PK_Milk] PRIMARY KEY  NONCLUSTERED 
	(
		[CowID],
		[MilkDateTime]
	)  ON [PRIMARY] 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.CowDeleteCommand
(
	@Original_CowID int,
	@Original_CowBirthDate datetime,
	@Original_CowControlCode char(15),
	@Original_CowName varchar(30),
	@Original_CowWeight decimal(6)
)
AS
	SET NOCOUNT OFF;
DELETE FROM Cow WHERE (CowID = @Original_CowID) AND (CowBirthDate = @Original_CowBirthDate) AND (CowControlCode = @Original_CowControlCode OR @Original_CowControlCode IS NULL AND CowControlCode IS NULL) AND (CowName = @Original_CowName) AND (CowWeight = @Original_CowWeight)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.CowInsertCommand
(
	@CowName varchar(30),
	@CowBirthDate datetime,
	@CowControlCode char(15),
	@CowWeight decimal(6)
)
AS
	SET NOCOUNT OFF;
INSERT INTO Cow(CowName, CowBirthDate, CowControlCode, CowWeight) VALUES (@CowName, @CowBirthDate, @CowControlCode, @CowWeight);
	SELECT CowID, CowName, CowBirthDate, CowControlCode, CowWeight FROM Cow WHERE (CowID = @@IDENTITY)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.CowSelectCommand
AS
	SET NOCOUNT ON;
SELECT CowID, CowName, CowBirthDate, CowControlCode, CowWeight FROM Cow
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.CowUpdateCommand
(
	@CowName varchar(30),
	@CowBirthDate datetime,
	@CowControlCode char(15),
	@CowWeight decimal(6),
	@Original_CowID int,
	@Original_CowBirthDate datetime,
	@Original_CowControlCode char(15),
	@Original_CowName varchar(30),
	@Original_CowWeight decimal(6),
	@CowID int
)
AS
	SET NOCOUNT OFF;
UPDATE Cow SET CowName = @CowName, CowBirthDate = @CowBirthDate, CowControlCode = @CowControlCode, CowWeight = @CowWeight WHERE (CowID = @Original_CowID) AND (CowBirthDate = @Original_CowBirthDate) AND (CowControlCode = @Original_CowControlCode OR @Original_CowControlCode IS NULL AND CowControlCode IS NULL) AND (CowName = @Original_CowName) AND (CowWeight = @Original_CowWeight);
	SELECT CowID, CowName, CowBirthDate, CowControlCode, CowWeight FROM Cow WHERE (CowID = @CowID)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.MIlkDeleteCommand
(
	@Original_CowID int,
	@Original_MilkDateTime datetime,
	@Original_MilkPounds decimal(6,2)
)
AS
	SET NOCOUNT OFF;
DELETE FROM Milk WHERE (CowID = @Original_CowID) AND (MilkDateTime = @Original_MilkDateTime) AND (MilkPounds = @Original_MilkPounds)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.MilkInsertCommand
(
	@CowID int,
	@MilkDateTime datetime,
	@MilkPounds decimal(6,2)
)
AS
	SET NOCOUNT OFF;
INSERT INTO Milk(CowID, MilkDateTime, MilkPounds) VALUES (@CowID, @MilkDateTime, @MilkPounds);
	SELECT CowID, MilkDateTime, MilkPounds FROM Milk WHERE (CowID = @CowID) AND (MilkDateTime = @MilkDateTime)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.MilkSelectCommand
AS
	SET NOCOUNT ON;
SELECT CowID, MilkDateTime, MilkPounds FROM Milk
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

SET QUOTED_IDENTIFIER  ON    SET ANSI_NULLS  ON 
GO

CREATE PROCEDURE dbo.MIlkUpdateCommand
(
	@CowID int,
	@MilkDateTime datetime,
	@MilkPounds decimal(6,2),
	@Original_CowID int,
	@Original_MilkDateTime datetime,
	@Original_MilkPounds decimal(6,2)
)
AS
	SET NOCOUNT OFF;
UPDATE Milk SET CowID = @CowID, MilkDateTime = @MilkDateTime, MilkPounds = @MilkPounds WHERE (CowID = @Original_CowID) AND (MilkDateTime = @Original_MilkDateTime) AND (MilkPounds = @Original_MilkPounds);
	SELECT CowID, MilkDateTime, MilkPounds FROM Milk WHERE (CowID = @CowID) AND (MilkDateTime = @MilkDateTime)
GO
SET QUOTED_IDENTIFIER  OFF    SET ANSI_NULLS  ON 
GO

