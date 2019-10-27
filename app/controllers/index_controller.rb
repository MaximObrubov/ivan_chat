class IndexController < ApplicationController
  
  def index
    
  end
  
  def receive_message
    
    respond_to do |format|
      format.json { render json: {message: Bot::random_message}, status: :created }
    end
  end
  
end
