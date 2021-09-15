module BestInPlace
  module TestHelpers
    module Custom
      def edit_in_place_text *args
        bip_text *args
        sleep 0.1
      end
      def edit_in_place_text_with_activator(resource, field, content, activator)
        page.execute_script <<-JS
          $('[data-purpose=#{ activator }]').click()
        JS
        edit_in_place_text(resource, field, content)
      end
      def edit_in_place_textarea *args
        bip_area *args
        sleep 0.1
      end
      def edit_in_place_textarea_with_activator(resource, field, content, activator)
        page.execute_script <<-JS
          $('[data-purpose=#{ activator }]').click()
        JS
        edit_in_place_textarea(resource, field, content)
      end
      def edit_in_place_select *args
        bip_select *args
        sleep 0.1
      end
      def edit_in_place_boolean *args
        bip_bool *args
        sleep 0.2
      end
      def edit_in_place_date *args
        expect( page.evaluate_script("$('.ui-datepicker-calendar').is(':visible')") ).to be_false
        bip_text *args
        sleep 0.1
        expect( page.evaluate_script("$('.ui-datepicker-calendar').is(':visible')") ).to be_true
      end
    end
  end
end

RSpec.configure do |config|
  config.include BestInPlace::TestHelpers
  config.include BestInPlace::TestHelpers::Custom
end
