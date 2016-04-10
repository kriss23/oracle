# -*- coding: utf-8 -*-
#sys.setdefaultencoding('utf-8')

#returns twitter Rest API Tweets for given hashtags, for now simply sorted by 
#retweets+favorites as an early "runninv version"

import ConfigParser
import os
import sys
from flask import Flask
import tweepy
import json


##read API access tokens
configParser = ConfigParser.RawConfigParser()   
configFilePath = os.path.abspath(os.path.dirname(sys.argv[0])) + '/auth.cfg'
configParser.read(configFilePath)

CONSUMER_KEY = configParser.get('Twitter', 'CONSUMER_KEY')
CONSUMER_SECRET = configParser.get('Twitter', 'CONSUMER_SECRET')
ACCESS_KEY = configParser.get('Twitter', 'ACCESS_KEY')
ACCESS_SECRET = configParser.get('Twitter', 'ACCESS_SECRET')

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)

api = tweepy.API(auth)


app = Flask(__name__)


def list_of_srobjects_to_dictionary(list_of_srobjects):
    dictionary = {}
    for sr_object in list_of_srobjects:
        dictionary[sr_object.id] = {
            'created_at': str(sr_object.created_at),
            'retweet_count': sr_object.retweet_count,
            'favorite_count': sr_object.favorite_count,
            'author_screen_name': sr_object.author.screen_name,
            'author_followers_count': sr_object.author.followers_count,
            'author_friends_count': sr_object.author.friends_count,
            'text': sr_object.text,
            'score': sr_object.retweet_count + sr_object.favorite_count,
            'score_divided': (float(sr_object.retweet_count) + float(sr_object.favorite_count) + 1) / float(sr_object.author.followers_count)
        }
    return dictionary
    
    
@app.route('/')
@app.route('/index')
def index():
    return """
    <html><header></header><body>
    <h1><a href="/upload">Placeholder</a></h1>
    </body></html>
    """


@app.route('/get_tweets_from_hashtag/<string:hashtag>', methods=['GET', 'POST'])
def get_tweets_from_hashtag(hashtag):
    #turn pepe+football query into #pepe #football
    hashtag = "#" + hashtag.replace("+"," #")
    query = hashtag #space separate for AND
    max_tweets = 500 #very few ..

    print "started query..."
    #, sort_by="retweet_count-asc"
    results = [status for status in tweepy.Cursor(api.search, q=query, languages=["german"]).items(max_tweets)]
    print "query done..."
    
    dictionary = list_of_srobjects_to_dictionary(results)
    sorted_list = sorted(dictionary.iteritems(), key=lambda (x, y): y['score'], reverse=True) #
    jayson = json.dumps(sorted_list)
    
    return jayson
    




#LIVE SCRAPER

app.run(debug=True, host='0.0.0.0', port=8006)