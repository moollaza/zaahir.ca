require 'rubygems'
require 'sinatra'
require 'sinatra/partial'
require 'haml'
require './config'

get '/' do
  @title = "Zaahir.ca -- Personal Website of Zaahir Moolla - Undergrad.Nerd.Musician  -- Home"
  haml :index
end

get '/portfolio' do
	@title = "Zaahir.ca -- Personal Website of Zaahir Moolla - Undergrad.Nerd.Musician -- Portfolio"
	haml :portfolio
end

get '/resume' do
	@title = "Zaahir.ca -- Personal Website of Zaahir Moolla - Undergrad.Nerd.Musician -- Resume"
	haml :resume
end

not_found do
	haml :index
end
