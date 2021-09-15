require 'spec_helper'
require 'timesheet'

describe Timesheet do

  describe 'new timesheet' do
    context 'for a given activity and year-month' do
      let( :activity  ){ double 'activity'             }
      let( :month     ){ DateTime.new 2013, 01         }
      let( :timesheet ){ Timesheet.new activity, month }
      it 'has its activity correctly set' do
        expect( timesheet.activity ).to be activity
      end
      it 'has its year correctly set' do
        expect( timesheet.year ).to eq 2013
      end
      it 'has its month correctly set' do
        expect( timesheet.month ).to be 1
      end

    end
  end

  describe 'handling an activity with facts for a given month' do
    let( :timesheet      ){ Timesheet.new activity_with_facts, month                }
    let( :month          ){ DateTime.new 2013, 01                                   }
    let( :fact1          ){ double( 'fact1'       , start_time: month            )  }
    let( :fact2          ){ double( 'fact2'       , start_time: month.next_day   )  }
    let( :activity_with_facts ){ double facts: facts                                }
    let( :facts          ){ [ earlyer_fact, fact1, fact2, later_fact ]              }
    let( :earlyer_fact   ){ double( 'earlyer_fact', start_time: month.prev_month )  }
    let( :later_fact     ){ double( 'later_fact'  , start_time: month.next_month )  }

    context 'with facts that happened before and after the given month' do

      it "considers only the facts that happened during the given month" do
        expect( timesheet.facts ).to match_array [ fact1, fact2 ]
      end
      context 'when facts are entered afterwards' do
        let( :facts ){ [ fact2, fact1 ] }
        it "orders the facts cronologically" do
          expect( timesheet.facts ).to eq [ fact1, fact2 ]
        end
      end

      describe 'displaying the total time spent' do
        describe 'as minutes' do
          before { fact1.stub        duration: 10  }
          before { fact2.stub        duration: 20  }
          before { earlyer_fact.stub duration: 200 }
          before { later_fact.stub   duration: 300 }
          it 'returns the total minutes spent for the given activity and month ' do
            expect( timesheet.total_minutes_count ).to eq 30
          end
        end

        describe 'as hours' do
          let( :timesheet      ) do
            timesheet = Timesheet.new double, double
            timesheet.stub total_minutes_count: 332
            timesheet
          end
          it 'returns the total hours spent, rounded to the decimal' do
            expect( timesheet.total_hours_count ).to eq 5.5 # 322 minutes is 5.5 hours rounded to the decimal
          end
        end

      end
    end

  end


end