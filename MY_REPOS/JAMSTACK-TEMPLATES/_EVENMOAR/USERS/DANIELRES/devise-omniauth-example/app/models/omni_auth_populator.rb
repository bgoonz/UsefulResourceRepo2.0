module OmniAuthPopulator
  def omniauth=(omni)
    if omni['provider'] && respond_to?('populate_from_' + omni['provider'])
      send(('populate_from_' + omni['provider']).to_sym, omni)
    end
  end
end