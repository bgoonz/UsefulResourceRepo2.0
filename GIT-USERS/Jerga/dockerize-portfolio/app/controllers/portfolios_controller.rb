class PortfoliosController < ApplicationController
  access all: [:show, :index, :angular], user: {except: [:destroy, :new, :create, :update, :edit, :sort]}, site_admin: :all
  layout "portfolio"

  def index
    @portfolio_items = Portfolio.byPosition
  end

  def show
    @portfolio = Portfolio.find(params[:id])
  end

  def angular
    @angular_portfolio_items = Portfolio.angular
  end

  def new
    @portfolio = Portfolio.new
  end

  def create
    @portfolio = Portfolio.new(portfolio_params)

    respond_to do |format|
      if @portfolio.save
        format.html { redirect_to portfolio_show_path(@portfolio), notice: 'Blog was created'}
      else
        format.html { render :new}
      end
    end
  end

  def update
    @portfolio = Portfolio.find(params[:id])

    respond_to do |format|
      if @portfolio.update(portfolio_params)
        format.html { redirect_to portfolio_show_path(@portfolio), notice: 'Blog was destroyed'}
      else
        format.html { render :update}
      end
    end
  end

  def edit
    @portfolio = Portfolio.find(params[:id])
  end

  def sort
    params[:order].each do |key, value|
      Portfolio.find(value[:id]).update(position: value[:position])
    end

    render nothing: true
  end

  def destroy
    @portfolio = Portfolio.find(params[:id])
    @portfolio.destroy

    respond_to do |format|
      format.html { redirect_to portfolios_path, notice: 'Portfolio was destroyed'}
    end
  end

  private
  def portfolio_params
    params.require(:portfolio).permit(:title,
                                      :subtitle,
                                      :main_image,
                                      :thumb_image,
                                      :body,
                                      technologies_attributes: [:id, :name, :_destroy])
  end
end
