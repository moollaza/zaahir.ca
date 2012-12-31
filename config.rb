# Set Rack Env if not set
ENV['RACK_ENV'] ||= "development"
puts "RACK_ENV: " + ENV['RACK_ENV']

# Setup Sinatra-Reloader
configure :development do
  require 'sinatra/reloader'
  puts "Alright. We're Reloaded. Bitches!"
end

# Setup Templates
configure do  
  
  set :partial_template_engine, :haml
  enable :partial_underscores
  
end