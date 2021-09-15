class ErrorPayload
  attr_reader :identifier, :status

  def initialize(identifier, status)
    @identifier = identifier
    @status = status
  end

  def as_json(*)
    {errors: [{
      status: Rack::Utils.status_code(status),
      code: identifier,
      name: translated_payload[:name],
      detail: translated_payload[:detail],
    }]}
  end

  def self.serialize_errors errors
    formated_errors = []

    errors.each do |title, value|
      formated_errors << {name: title, detail: value}
    end

    {errors: formated_errors}
  end

  def translated_payload
    I18n.translate("errors.#{identifier}")
  end
end
