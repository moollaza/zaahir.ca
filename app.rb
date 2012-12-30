require 'rubygems'
require 'sinatra'
require 'sinatra/partial'
require 'haml'
require './config'

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

not_found do
	@title = "Zaahir.ca - Personal Website of Zaahir Moolla {Hacker, Nerd &amp; Musician} - Page Not Found!"
	haml :not_found
end
