require 'fact_exhibit'
describe FactExhibit do
  context 'given a Fact object, a context and a format' do
    let( :fact    ){ double 'fact'    }
    let( :context ){ double 'context' }
    let( :format  ){ 'format'         }
    it 'returns a FactExhibit object' do
      expect( FactExhibit.new fact, context, format ).to be_kind_of FactExhibit
    end
  end
end