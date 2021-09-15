module NavigationHelpers
  module Refinery
    module Speakers
      def path_to(page_name)
        case page_name
        when /the list of speakers/
          admin_speakers_path

         when /the new speaker form/
          new_admin_speaker_path
        else
          nil
        end
      end
    end
  end
end
