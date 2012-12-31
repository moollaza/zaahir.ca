require 'rubygems'
require 'bundler'

Bundler.require(:default, ENV['RACK_ENV']) if defined?(Bundler)

require 'rack/google-analytics'
use Rack::GoogleAnalytics, :tracker => "UA-27611834-1"

require './app'
run Sinatra::Application
