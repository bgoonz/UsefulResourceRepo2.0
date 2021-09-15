# encoding: utf-8
class String
  def upcase_international
    self.upcase.tr('àéèêùç','ÀÉÈÊÙÇ')
  end
end
