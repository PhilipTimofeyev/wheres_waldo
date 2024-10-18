class Api::ScoresController < ApplicationController
  before_action :set_score, only: %i[ show update destroy ]

  # GET /scores
  def index
    not_nil = Score.all.where.not(score: nil)
    @scores = not_nil.all.where(picture_id: params[:picture_id])

    # Sort scores by score (fastest to slowest)
    sorted_scores = @scores.sort_by { |score| score.score }
    render json: sorted_scores
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
    seconds_to_solve = (Time.now - @score.created_at).round(2)

    if @score.score
      new_score = score_params
    else
      new_score = score_params.merge(score: seconds_to_solve) unless @score.score
    end

    if @score.update(new_score)
      render json: @score
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
