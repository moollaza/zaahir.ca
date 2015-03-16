require 'bundler/setup'
require 'rubygems'
require 'sinatra'
require 'newrelic_rpm'
require 'sinatra/partial'
require 'haml'
require './config'

before do

	# Create request object and get user agent
	req = Rack::Request.new(env)
	user_agent = req.user_agent()

	# Set social icon size based on user agent
	@image_size = 64
	case
		when user_agent.match(/ipad|playbook|nexus 7|nexus 10|tablet/i)
				@image_size = 48
		when user_agent.match(/iphone|android|blackberry/i)
				@image_size = 32
	end
end

get '/' do
  @title = "Zaahir.ca - Personal Website of Zaahir Moolla {Hacker, Nerd &amp; Musician}  - Home"
  haml :index
end

get '/portfolio' do
	@title = "Zaahir.ca - Personal Website of Zaahir Moolla {Hacker, Nerd &amp; Musician} - Portfolio"
	haml :portfolio
end

get '/resume' do
	@title = "Zaahir.ca - Personal Website of Zaahir Moolla {Hacker, Nerd &amp; Musician} - Resume"
	haml :resume
end

get '/blog' do
	redirect "http://blog.zaahir.ca"
end

not_found do
	@title = "Zaahir.ca - Personal Website of Zaahir Moolla {Hacker, Nerd &amp; Musician} - Page Not Found!"
	haml :not_found
end
