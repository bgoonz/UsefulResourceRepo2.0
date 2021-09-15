
require 'right_aws'

module RightAws
  class S3
    class Bucket
      def common_prefixes(prefix, delimiter = '/')
        common_prefixes = []
        @s3.interface.incrementally_list_bucket(@name, { 'prefix' => prefix, 'delimiter' => delimiter }) do |thislist|
          common_prefixes += thislist[:common_prefixes]
        end
        common_prefixes
      end

      def contents(prefix, delimiter = '/')
        list = []
        @s3.interface.incrementally_list_bucket(@name, {'prefix' => prefix, 'delimiter' => delimiter}) do |item|
          if item[:contents].empty?
            list << item[:common_prefixes]
          else
            list << item[:contents].map{|n| n[:key]}
          end
        end
        list.flatten
      end



    end
  end
end
