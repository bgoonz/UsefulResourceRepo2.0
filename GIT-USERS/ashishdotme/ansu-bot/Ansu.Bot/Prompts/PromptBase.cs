using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ansu.Bot.Exceptions;
using Ansu.Bot.Modules;
using Ansu.Bot.Utils;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using DSharpPlus.Entities;
using DSharpPlus.Interactivity;
using DSharpPlus.Interactivity.Extensions;
using Serilog;

namespace Ansu.Bot.Setup
{
    public abstract class PromptBase : AnsuCommandModule
    {
        protected List<DiscordMessage> _previousSteps = new List<DiscordMessage>();
        protected DiscordChannel _channel;
        protected DiscordMessage _currentStep;
        protected ILogger _logger;
        protected CommandContext _ctx;
        protected InteractivityExtension _interactivity;

        public PromptBase(CommandContext ctx, ILogger logger, InteractivityExtension interactivity)
        {
            _ctx = ctx;
            _channel = ctx.Channel;
            _logger = logger;
            _interactivity = interactivity;
            _previousSteps.Add(ctx.Message);
        }


        public async Task StartPromptAsync()
        {
            try
            {
                await Steps();
            }
            catch (Exception ex)
            {
                _logger.Error($"Prompt Exception : {ex.Message}");
                Error(_ctx, "k", $"Invalid input! Run prompt again");
                throw new AnsuBotException("Prompt timed out");
            }
            finally
            {
                await EndPrompt();
            }
        }

        protected abstract Task Steps();

        protected void onReply(InteractivityResult<DiscordMessage> context, ref string reply)
        {
            if (context.TimedOut)
            {
                throw new AnsuBotException("Prompt timed out");
            }

            reply = context.Result.Content;
        }

        protected virtual bool Predicate(DiscordMessage message)
        {
            if (message.Author.IsBot)
            {
                return false;
            }
            _previousSteps.Add(message);
            if (message.Content.ToLower().Trim() == "end")
            {
                return false;
            }
            return true;
        }

        public async Task EndPrompt()
        {
            if (_previousSteps.Count > 0)
            {
                await _channel.DeleteMessagesAsync(_previousSteps.Where(x => x != null));
            }
        }

        public async Task<DiscordMessage> confirm(string text, string description)
        {
            DiscordEmbedBuilder builder = EmbedWithTitle(text)
                .WithDescription(description);
            _currentStep = await _ctx.RespondAsync(embed: builder.Build());
            _previousSteps.Add(_currentStep);
            return _currentStep;
        }


        public async Task<DiscordMessage> FirstStep(string title, string description,
                                                    Action<InteractivityResult<DiscordMessage>> replyHandler)
        {
            _currentStep = await confirm(title, description);
            var result = await _interactivity.WaitForMessageAsync(Predicate);
            replyHandler.Invoke(result);
            await result.Result.DeleteAsync();
            return _currentStep;
        }

        public async Task<DiscordMessage> NextStep(DiscordMessage message, DiscordEmbed embed)
        {
            return await message.ModifyAsync(embed: embed);
        }
    }
}
