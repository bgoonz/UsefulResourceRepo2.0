describe Support::PresenterHelpers do

  include Support::PresenterHelpers

  describe '#domain_language' do
    it 'translates technical terms to friendly domain terms' do
      expect( domain_language('User') ).to eq 'Person'
    end
  end
  describe '#pretty_quantifier' do
    it 'transforms a value from 0 to 5 to its graphical representation' do
      expect( pretty_quantifier(0) ).to eq '—'
      expect( pretty_quantifier(1) ).to eq '▮▯▯▯▯'
      expect( pretty_quantifier(2) ).to eq '▮▮▯▯▯'
      expect( pretty_quantifier(3) ).to eq '▮▮▮▯▯'
      expect( pretty_quantifier(4) ).to eq '▮▮▮▮▯'
      expect( pretty_quantifier(5) ).to eq '▮▮▮▮▮'
    end
  end
  describe '#render_description' do
    it 'transforms description as markdown into html' do
      expect( render_description('hello **bold**') ).to eq '<p>hello <strong>bold</strong></p>'
    end
  end
  describe '#render_excerpt' do
    it 'transforms description as markdown into truncated html' do
      long_description = "hello **#{ 'verylongstring' * 100 }**"
      expect( render_description( long_description) ).to start_with '<p>hello <strong>verylongstring'
      expect( render_description( long_description) ).to end_with '</strong></p>'
    end
  end

end

