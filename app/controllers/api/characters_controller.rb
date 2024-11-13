class Api::CharactersController < ApplicationController
  def show
    @level = Picture.find(params[:id])

    characters_with_image = @level.characters.map do |character|
      character.as_json.merge(image: url_for(character.image))
    end

    render json: characters_with_image
  end
end
