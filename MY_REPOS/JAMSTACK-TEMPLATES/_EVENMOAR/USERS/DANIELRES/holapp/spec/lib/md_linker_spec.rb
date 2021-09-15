describe MdLinker do
  it 'turns string urls into markdown links' do
    expect( described_class.new('text www.foo.com text').call).to eq 'text [http://www.foo.com](www.foo.com) text'
    expect( described_class.new('https://foo.com'      ).call).to eq '[https://foo.com](https://foo.com)'
    expect( described_class.new('ftp://foo.com'        ).call).to eq '[ftp://foo.com](ftp://foo.com)'
    expect( described_class.new('mailto://foo.com'     ).call).to eq '[mailto://foo.com](mailto://foo.com)'
    expect( described_class.new('http://e.com?a=a&b=b' ).call).to eq '[http://e.com?a=a&b=b](http://e.com?a=a&b=b)'
  end
  it 'supports custom link text' do
    expect( described_class.new('www.a.com', 'read more').call).to eq '[read more](www.a.com)'
  end

end
