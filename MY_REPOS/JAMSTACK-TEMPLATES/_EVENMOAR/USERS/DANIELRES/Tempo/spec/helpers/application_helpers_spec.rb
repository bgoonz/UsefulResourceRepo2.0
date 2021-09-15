require 'application_helpers'
require 'timesheet_exhibit'
require 'fact_exhibit'

include ApplicationHelpers

describe ApplicationHelpers do
  describe 'exhibit helper' do
    context 'when given a context and a format' do
      let( :context          ){ double( 'context', settings: context_settings ).as_null_object }
      let( :context_settings ){ double( 'settings', root: '.' )     }
      context 'with a Timesheet object' do
        let( :timesheet ){ stub_const( 'Timesheet', double.as_null_object) }
        it 'returns a TimesheetExhibit object' do
          exhibit( timesheet, format: 'default', context: context ).to be_kind_of TimesheetExhibit
        end
      end
      context 'with a Fact object' do
        let( :fact ){ stub_const( 'Fact', double.as_null_object) }
        it 'returns a FactExhibit object' do
          exhibit( fact     , format: 'default', context: context ).to be_kind_of FactExhibit
        end
      end
    end
  end
end
