module Forecasts

  class ForecastsController < ApplicationController

    before_filter :authenticate_user!

    def index
      start_date = Date.new(params[:start_year].to_i, params[:start_month].to_i)
      @forecast  = Forecast.new(
                      starting_from_month: start_date,
                                   months: params[:months_duration].to_i,
                              periodicity: params[:periodicity]
                   )
      @people    = User.listable

      respond_to do |format|
        format.html
        format.xls { xls_export(@forecast, @people) }
        format.json
      end

    end


    private

      def xls_export(forecast, people)
        book        = Spreadsheet::Workbook.new
        sheet1      = book.create_worksheet
        sheet1.name = 'Forecasts'

        sheet1.default_format = Spreadsheet::Format.new(vertical_align: :top)
        sheet1.row(0).default_format = Spreadsheet::Format.new(weight: :bold)
        sheet1.column(0).width = 12
        sheet1.column(1).width = 30

        sheet1.row(0).concat( %w{Person Project} )
        sheet1.row(0).concat( forecast.periods.map{|p| p.starts_at } )

        i = 1
        people.each do |p|
          if p.memberships.none?
            sheet1.row(i).height = 26
            sheet1.row(i).concat [ Spreadsheet::Link.new(url_for(p), p.trigram || p.name)]
            i += 1
          end
          p.memberships.each do |m|
            sheet1.row(i).height = 26
            sheet1.row(i).concat [ Spreadsheet::Link.new(url_for(p), p.trigram || p.name)]
            sheet1.row(i).concat [ Spreadsheet::Link.new(url_for(m.project), m.project.name)]
            forecast.periods.each do |period|
              sheet1.row(i).concat [ period.membership_occupations(m).map{|o| o}.compact.join("\n") ]
            end
            i += 1
          end
        end

        require 'stringio'
        data = StringIO.new ''
        book.write data

        send_data data.string
                      .bytes
                      .to_a
                      .pack("C*"),
                               type: "application/excel",
                        disposition: 'attachment',
                           filename: "forecasts-export.xls"
      end

    end
end
