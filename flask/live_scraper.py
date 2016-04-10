# -*- coding: utf-8 -*-
#sys.setdefaultencoding('utf-8')


##Scrapes Twitter Livestream to a file, periodically [~15 Minutes]
##runs word2vec via Gensim for Hashtag Prediction from Raw Tweet Text.

import ConfigParser
import os
import sys
from flask import Flask
import tweepy
import json
import re
from threading import Thread
from tweepy.streaming import StreamListener
import traceback
import time
import sys
import datetime as dt
from tweepy import Stream
import codecs
import gensim
#import logging
#logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

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



hashtag_finder = re.compile('(?:(?<=\s)|^)#(\w*[A-Za-z_]+\w*)')

filer = codecs.open("scrape1.txt", 'wb', "utf-8")      


class listener(StreamListener):

    def __init__(self):
        super(StreamListener, self).__init__()
        data = []
          
        
        pass

    def get_user_data(self, data):
        user = {}
        user['followers'] = data['user']['followers_count']
        user['friends'] = data['user']['friends_count']
        user['img'] = data['user']['profile_image_url_https']
        user['name'] = data['user']['name']
        user['screenname'] = data['user']['screen_name']
        user['bio'] = data['user']['description']
        return user
        
    def on_data(self, data):
        
        try:        
            if data:
                data = json.loads(data)
            #t0 = time.time()    
            
            if 'user' in data:
                
                if data['user']['followers_count'] > 0:
                    #print data['text']
                    matches = hashtag_finder.findall(data['text'])
                    if len(matches) > 0: 
                        print  matches
                        
            filer.write(data['text'].replace("\n"," ") + "\n")
            #print time.time() - t0db.create
        except: 
            print traceback.format_exc()
            #db.log(traceback.format_exc(),'stream')
            #db.log(sys.exc_info()[0],'stream')
            #c.shutdown()           
        
        return True


    def on_error(self, status):
        print status
                        
class StreamingScraper(Thread):
    def __init__(self):
        super(StreamingScraper, self).__init__()
        self.daemon = True
        self.cancelled = False
        
    def run(self):      
        while True:
            try: 
                twitterStream = Stream(auth, listener())
                twitterStream.filter(locations=[-180,-90,180,90],languages=['en']) 
                #twitterStream.filter(languages=['en'])    
            except:
                #c.shutdown()           
                print traceback 
                print traceback.format_exc()
                print sys.exc_info()[0]     
                print 'sleeping......'
                time.sleep(1)
                pass   
                #log(traceback.format_exc())
                #log(sys.exc_info()[0])
    
    
s = StreamingScraper()
s.start()

s.join()



#every 15 minutes
#close file
#use new file
#fit gensim word2vec

#flask server method that returns matching hashtags for a query of words


#time us up!