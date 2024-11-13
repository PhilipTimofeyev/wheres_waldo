class Api::CharactersController < ApplicationController
  def show
    @character = Character.find(params[:id])

    render json: @character
  end
end
