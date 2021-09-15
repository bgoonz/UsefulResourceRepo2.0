json.forecast do
  json.description @forecast
  json.occupations @people do |person|
    json.set! (person.trigram || person.name) do
      memberships_with_defined_occupations = person.memberships.reject do |m|
        @forecast.periods
                 .map{ |p| p.membership_occupations(m) }
                 .flatten.reject(&:blank?).empty?
      end
      json.array! memberships_with_defined_occupations do |m|
        result = @forecast.periods.map{ |p|
          sum = p.membership_occupations(m).map(&:to_f).inject(:+)
          # convert sum from float to int if equivalent
          (sum == sum.floor) ? sum.to_i : sum
        }
        json.set! m.project.name, result
      end
    end
  end
end
