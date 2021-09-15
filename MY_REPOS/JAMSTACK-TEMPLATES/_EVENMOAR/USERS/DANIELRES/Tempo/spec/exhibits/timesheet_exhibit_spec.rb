require 'timesheet_exhibit'
describe TimesheetExhibit do
  context 'given a Timesheet object, a context and a format' do
    let( :timesheet ){ double 'timesheet' }
    let( :context   ){ double 'context'   }
    let( :format    ){ 'format'           }
    it 'returns a TimesheetExhibit object' do
      expect( TimesheetExhibit.new timesheet, context, format ).to be_kind_of TimesheetExhibit
    end
  end
end