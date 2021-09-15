class MdLinker

  LINK_REGEX =  /\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s<]|\/)))/u

  def initialize(string, link_text = nil)
    @original  = string
    @link_text = link_text
  end

  def call
    @original.gsub(LINK_REGEX) do |match|
      prefix = if (match =~/\Awww\./)
        prefix = 'http://'
      end
      text = @link_text || "#{prefix}#{match}"
      "[#{ text }](#{ match })"
    end
  end

end
