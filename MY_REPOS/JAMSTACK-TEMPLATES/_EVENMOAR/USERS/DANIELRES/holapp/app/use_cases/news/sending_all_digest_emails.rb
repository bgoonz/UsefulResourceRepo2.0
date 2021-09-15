module News
  class SendingAllDigestEmails

    include IsAnAdvancedCallable

    def initialize(user, dry_run: false)
      @user    = user
      @dry_run = dry_run
    end

    private

      def execution
        @result = []
        User.all.each do |user|
         @result << News::ReceivingADigestEmail.new(user, dry_run: @dry_run).call
        end
        @result = @result.join("\n")
      end

      def authorized?
        Ability.new(@user).can? :send, :news_digests
      end

      def journal_event
        return {} if @dry_run
        {
             user: @user,
           action: :sent_news_digests,
           object: nil,
          details: { log_output: @result },
        }
      end

  end
end
