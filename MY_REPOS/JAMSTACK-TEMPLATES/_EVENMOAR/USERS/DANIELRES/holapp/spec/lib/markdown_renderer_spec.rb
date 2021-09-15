describe MarkdownRenderer do
  it "renders markdown strings to html" do
    expect( described_class.new.call "**aaa**" ).to eq '<p><strong>aaa</strong></p>'
  end
  it "renders nil into an empty string" do
    expect( described_class.new.call nil ).to eq ''
  end
  it "generates html_safe html" do
    expect( described_class.new.call('safe').html_safe? ).to be_true
  end
end
