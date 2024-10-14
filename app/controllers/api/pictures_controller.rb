class Api::PicturesController < ApplicationController
  before_action :set_picture, only: %i[ show update destroy ]

  # GET /pictures
  def index
    @pictures = Picture.all

    all_pictures = @pictures.map do |picture|
      picture.as_json.merge(image: url_for(picture.image))
    end

    render json: all_pictures
  end

  # GET /pictures/1
  def show
    picture_with_image = @picture.as_json.merge(image: url_for(@picture.image))
    p picture_with_image
    p @picture.characters
    render json: { picture: picture_with_image, characters: @picture.characters }
  end

  # POST /pictures
  def create
    @picture = Picture.new(picture_params)

    if @picture.save
      render json: @picture, status: :created, location: @picture
    else
      render json: @picture.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pictures/1
  def update
    if @picture.update(picture_params)
      render json: @picture
    else
      render json: @picture.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pictures/1
  def destroy
    @picture.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_picture
      @picture = Picture.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def picture_params
      params.require(:picture).permit(:title, :alt, :image)
    end
end
