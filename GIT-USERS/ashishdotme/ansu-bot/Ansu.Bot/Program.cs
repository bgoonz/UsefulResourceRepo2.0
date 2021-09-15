using Ansu.Bot.Config.Models;
using Ansu.Bot.EventHandlers;
using Ansu.Modules;
using Ansu.Redis.Client.Impl;
using Ansu.Redis.Client.Interfaces;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System;
using Ansu.Repository;
using Ansu.Repository.Interfaces;
using Ansu.Service.Interfaces;
using Ansu.Bot.Service;
using Ansu.MongoDB.Client.Interfaces;
using Ansu.MongoDB.Client;
using Ansu.Bot;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using ILogger = Serilog.ILogger;
using Serilog.Exceptions;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using Ansu.Cache.Interfaces;
using Ansu.Cache.Impl;
using DSharpPlus.Interactivity.Extensions;
using DSharpPlus.Interactivity.Enums;
using DSharpPlus.Interactivity;
using DSharpPlus.VoiceNext;
using System.Reflection;
using Ansu.Bot.Modules.Utility;
using Ansu.Bot.Setup;
using Ansu.Bot.Modules.Administration;

namespace Ansu
{
    public class Program
    {
        public static ConfigJson cfgjson { get; private set; }
        public static ConnectionMultiplexer redis;
        public static InteractivityExtension interactivityService { get; private set; }
        public static IDatabase db;

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    var ansuSettings = hostContext.Configuration.GetSection("Bot").Get<ConfigJson>();
                    cfgjson = ansuSettings;

                    services.AddSingleton<IRedisSettings>(config => new RedisSettings()
                    {
                        Host = ansuSettings.Redis.Host,
                        Port = ansuSettings.Redis.Port,
                        Password = ansuSettings.Redis.Password,
                        Database = "1",
                        Timeout = "0"
                    })
                    .AddSingleton<IMongoSettings>(config => new MongoSettings()
                    {
                        ConnectionString = ansuSettings.MongoDB.ConnectionString,
                        Database = ansuSettings.MongoDB.Database,
                        Collection = ansuSettings.MongoDB.Collection
                    })
                    .AddTransient<ModCmds>()
                    .AddTransient<MuteCmds>()
                    .AddTransient<UserRoleCmds>()
                    .AddTransient<Warnings>()
                    .AddTransient<BotEventHandler>()
                    .AddTransient<SetupSettings>()
                    .AddTransient<IRedisClient, RedisClient>()
                    .AddTransient<IGuildRepository, GuildRepository>()
                    .AddTransient<IGuildService, GuildService>()
                    .AddTransient<IGuildCacheManager, GuildCacheManager>()
                    .AddTransient<IGuildUpdateDefinitionCreator, GuildUpdateDefinitionCreator>()
                    .AddMongoCustomClient()
                    .AddLogging()
                    .AddTransient<IMongoFilter, MongoFilter>();

                    var logger = new LoggerConfiguration()
                        .MinimumLevel.Information()
                        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                        .MinimumLevel.Override("System", LogEventLevel.Warning)
                        .Enrich.WithExceptionDetails()
                        .WriteTo.Console(theme: ConsoleTheme.None, outputTemplate: String.Concat(@"{Timestamp:yyyy-MM-dd HH:mm:ss} ", @"{Level:u4} {Message:lj}{NewLine}{Exception}"))
                        .WriteTo.File("Logs/ansu-.log", rollingInterval: RollingInterval.Day, outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz}] [{Level:u4}] {Message:lj}{NewLine}{Exception}")
                        .CreateLogger();

                    var discord = new DiscordClient(new DiscordConfiguration()
                    {
                        Token = ansuSettings.Core.Token,
                        TokenType = TokenType.Bot,
                        ReconnectIndefinitely = true,
                        GatewayCompressionLevel = GatewayCompressionLevel.Stream,
                        AutoReconnect = true,
                        Intents = DiscordIntents.All,
                        MinimumLogLevel = LogLevel.Information,
                    });

                    services.AddSingleton<ILogger>(logger);
                    services.AddSingleton(discord);

                    var commands = discord.UseCommandsNext(new CommandsNextConfiguration()
                    {
                        StringPrefixes = ansuSettings.Core.Prefixes,
                        EnableDms = false,
                        CaseSensitive = false,
                        EnableMentionPrefix = true,
                        IgnoreExtraArguments = true,
                        Services = services.BuildServiceProvider()
                    });


                    var interactivityService = discord.UseInteractivity(new InteractivityConfiguration
                    {
                        PaginationBehaviour = PaginationBehaviour.WrapAround,
                        PaginationDeletion = PaginationDeletion.DeleteMessage,
                        Timeout = TimeSpan.FromMinutes(2),
                        PollBehaviour = PollBehaviour.KeepEmojis,
                    });

                    var voiceService = discord.UseVoiceNext(new VoiceNextConfiguration
                    {
                        AudioFormat = AudioFormat.Default,
                        EnableIncoming = false
                    });

                    commands.RegisterCommands<Warnings>();
                    commands.RegisterCommands<MuteCmds>();
                    commands.RegisterCommands<UserRoleCmds>();
                    commands.RegisterCommands<ModCmds>();
                    commands.RegisterCommands<CommonUtilities>();
                    commands.RegisterCommands<SetupSettings>();
                    services.AddHostedService<AnsuBot>();
                });


    }

}
