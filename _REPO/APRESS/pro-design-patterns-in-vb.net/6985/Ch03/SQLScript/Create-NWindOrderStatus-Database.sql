IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'NWindOrderStatus')
	DROP DATABASE [NWindOrderStatus]
GO

CREATE DATABASE [NWindOrderStatus] 
ON (
    NAME = N'NWindOrderStatus_Data', 
    FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL\data\NWindOrderStatus_Data.MDF', 
    SIZE = 1, FILEGROWTH = 10%) 
LOG 
ON (
    NAME = N'NWindOrderStatus_Log', 
    FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL\data\NWindOrderStatus_Log.LDF', 
    SIZE = 1, FILEGROWTH = 10%)

COLLATE SQL_Latin1_General_CP1_CI_AS

GO

exec sp_dboption N'NWindOrderStatus', N'autoclose', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'bulkcopy', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'trunc. log', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'torn page detection', N'true'
GO

exec sp_dboption N'NWindOrderStatus', N'read only', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'dbo use', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'single', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'autoshrink', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'ANSI null default', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'recursive triggers', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'ANSI nulls', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'concat null yields null', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'cursor close on commit', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'default to local cursor', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'quoted identifier', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'ANSI warnings', N'false'
GO

exec sp_dboption N'NWindOrderStatus', N'auto create statistics', N'true'
GO

exec sp_dboption N'NWindOrderStatus', N'auto update statistics', N'true'
GO

use [NWindOrderStatus]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[DocumentStatus]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[DocumentStatus]
GO

if not exists (select * from master.dbo.syslogins where loginname = N'DocWrox')
BEGIN
	declare @logindb nvarchar(132), @loginlang nvarchar(132) select @logindb = N'master', @loginlang = N'us_english'
	if @logindb is null or not exists (select * from master.dbo.sysdatabases where name = @logindb)
		select @logindb = N'master'
	if @loginlang is null or (not exists (select * from master.dbo.syslanguages where name = @loginlang) and @loginlang <> N'us_english')
		select @loginlang = @@language
	exec sp_addlogin N'DocWrox', null, @logindb, @loginlang
END
GO

if not exists (select * from dbo.sysusers where name = N'DocWrox' and uid < 16382)
	EXEC sp_grantdbaccess N'DocWrox', N'DocWrox'
GO

exec sp_addrolemember N'db_datareader', N'DocWrox'
GO

exec sp_addrolemember N'db_datawriter', N'DocWrox'
GO

CREATE TABLE [dbo].[DocumentStatus] (
	[StatusID] [int] IDENTITY (1, 1) NOT NULL ,
	[DocumentID] [varchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL ,
	[Status] [varchar] (5000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
) ON [PRIMARY]
GO

