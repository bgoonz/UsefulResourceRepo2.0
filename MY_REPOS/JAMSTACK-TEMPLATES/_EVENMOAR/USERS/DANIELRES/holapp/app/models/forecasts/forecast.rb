class Forecasts::Forecast

  def initialize(starting_from_month: DateTime.now, months: 5, periodicity: 'half-monthly')
    @starting_from_month = starting_from_month
    @months              = months
    @periodicity         = periodicity
  end

  def periods
    Period.starting_from_month(@starting_from_month, @months, @periodicity)
  end

  def self.periods
    Period.starting_from_month(DateTime.now)
  end


  private

    class Period
      attr_reader :starts_at
      attr_reader :ends_at

      def self.starting_from_month(date, months = 6, periodicity = 'half-monthly' )
        first_month_start = Date.parse(Time.new(date.year, date.month).to_s)
        periods = []
        months.times do |i|
          month_start  = first_month_start >> i
          month_end    = ((month_start >> 1) - 1)
          case periodicity
          when 'half-monthly'
            month_middle = month_start + 15
            periods << Period.new(month_start, (month_middle - 1))
            periods << Period.new(month_middle, month_end )
          when 'monthly'
            periods << Period.new(month_start, month_end)
          end
        end
        periods
      end

      def initialize start_date, end_date
        @starts_at = start_date
        @ends_at   = end_date
      end


      def membership_occupations(membership)
        membership.durations.map do |d|
          occupation(d)
        end
      end

      private

        def occupation(duration)
          return "" unless duration.starts_at || duration.ends_at
          return "" if duration.ends_at   && duration.ends_at.to_date   < starts_at
          return "" if duration.starts_at && duration.starts_at.to_date > ends_at
          return '—' unless duration.quantifier.present?
          pretty_display_quantifier(extrapolated_quantifier(duration))
        end

        def period_length_in_days
          (ends_at - starts_at).round
        end

        def non_active_days(duration)
          amount = 0
          if duration.starts_at
            days = (duration.starts_at.to_date - starts_at.to_date).round
            amount += days if days > 0
          end
          if duration.ends_at
            days = (ends_at.to_date - duration.ends_at.to_date).round
            amount += days if days > 0
          end
          amount
        end

        def active_days(duration)
          period_length_in_days - non_active_days(duration)
        end

        def extrapolated_quantifier(duration)
          duration.quantifier.to_f / period_length_in_days * active_days(duration)
        end

        def pretty_display_quantifier(quantifier)
          quantifier == quantifier.to_i ? quantifier.to_i : quantifier.round(1)
        end

    end


end
