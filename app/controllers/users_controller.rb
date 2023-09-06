class UsersController < ApplicationController
  before_action :set_user, only: %i[edit update]

  def index
    @q = User.ransack(params[:q])
    @users = @q.result(distinct: true)
  end

  def edit
    @albums = fetch_albums
    @picsum_url = "https://picsum.photos/id/#{@user.id}/250/166"
  end

  def update
    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :username, :email, :address, :phone)
  end

  def fetch_albums
    url = "https://jsonplaceholder.typicode.com/albums?userId=#{params[:id]}"
    JSON.parse(Net::HTTP.get_response(URI.parse(url)).body)
  end
end