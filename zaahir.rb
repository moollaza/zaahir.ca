require 'rubygems'
require 'sinatra'

get '/' do
 redirect '/index.html'
end

get '/portfolio/?' do
 redirect '/portfolio.html'
end

get '/resume/?' do
 redirect '/resume.html'
end

not_found do
 redirect '/index.html'
end
