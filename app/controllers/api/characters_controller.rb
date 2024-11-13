class Api::CharactersController < ApplicationController
  def show
    @character = Character.find(params[:id])

    character_with_image = @character.as_json.merge(image: url_for(@character.image))
    render json: character_with_image
  end
end
