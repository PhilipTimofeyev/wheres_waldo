class Api::ScoresController < ApplicationController
  before_action :set_score, only: %i[ show update destroy ]

  # GET /scores
  def index
    @scores = Score.all

    render json: @scores
  end

  # GET /scores/1
  def show
    render json: @score
  end

  # POST /scores
  def create
    @score = Score.new(score_params)

    if @score.save
      render json: @score, status: :created
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scores/1
  def update
    if @score.update(score_params)
      seconds_to_solve = (Time.now - @score.created_at).seconds.round(2)
      render json: { score: @score, duration: seconds_to_solve }
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scores/1
  def destroy
    @score.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_score
      @score = Score.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def score_params
      params.require(:score).permit(:username, :score, :picture_id)
    end
end